import { GoogleGenerativeAI } from "@google/generative-ai";
import { TalentProfile, Job, CandidateScore, ScreeningResult } from "../types";

const MODEL = "gemini-2.0-flash";

function getModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set in environment variables");
  return new GoogleGenerativeAI(apiKey).getGenerativeModel({ model: MODEL });
}

// Strip markdown code fences Gemini sometimes adds despite instructions
function extractJSON(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  return fenced ? fenced[1].trim() : text.trim();
}

// ─── Build the screening prompt ──────────────────────────────────────────────

function buildScreeningPrompt(job: Job, candidates: TalentProfile[], shortlistSize: number): string {
  const jobContext = `
JOB DETAILS:
- Title: ${job.title}
- Description: ${job.description}
- Type: ${job.type}
- Experience Level: ${job.experienceLevel}
- Location: ${job.location}
- Required Skills: ${job.requirements.filter(r => r.required).map(r => `${r.skill}${r.level ? ` (${r.level})` : ""}${r.yearsRequired ? `, ${r.yearsRequired}+ years` : ""}`).join(", ")}
- Nice to Have: ${job.niceToHave?.join(", ") || "N/A"}
- Key Responsibilities: ${job.responsibilities.join("; ")}
`;

  const candidateProfiles = candidates.map((c, i) => {
    const totalExp = c.experience.reduce((acc, exp) => {
      if (!exp.startDate) return acc;
      const start = new Date(exp.startDate + "-01");
      const end = exp.isCurrent ? new Date() : new Date((exp.endDate || "2024-01") + "-01");
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      return acc + Math.max(0, months);
    }, 0);
    const yearsExp = Math.round(totalExp / 12 * 10) / 10;

    return `
CANDIDATE ${i + 1}:
ID: ${c._id || c.email}
Name: ${c.firstName} ${c.lastName}
Email: ${c.email}
Headline: ${c.headline}
Location: ${c.location}
Total Experience: ~${yearsExp} years
Availability: ${c.availability.status} (${c.availability.type})
Skills: ${c.skills.map(s => `${s.name} [${s.level}, ${s.yearsOfExperience}yr]`).join(", ")}
Experience: ${c.experience.map(e => `${e.role} at ${e.company} (${e.startDate}–${e.endDate}): ${e.description.substring(0, 150)}... Stack: ${e.technologies.join(", ")}`).join(" | ")}
Education: ${c.education.map(e => `${e.degree} in ${e.fieldOfStudy} from ${e.institution}`).join(", ")}
Projects: ${c.projects.map(p => `${p.name}: ${p.description.substring(0, 100)}... Tech: ${p.technologies.join(", ")}`).join(" | ")}
Certifications: ${c.certifications?.map(cert => cert.name).join(", ") || "None"}
Bio: ${c.bio?.substring(0, 200) || "N/A"}
`;
  }).join("\n---\n");

  return `You are an expert AI recruiter for Umurava, a tech talent platform. Your task is to screen and rank candidates for a job opening.

${jobContext}

CANDIDATES TO EVALUATE (${candidates.length} total):
${candidateProfiles}

INSTRUCTIONS:
1. Evaluate EVERY candidate against the job requirements
2. Produce a ranked shortlist of the TOP ${shortlistSize} candidates
3. Use weighted scoring:
   - Skills match: 35%
   - Relevant experience: 30%
   - Education & certifications: 15%
   - Projects portfolio: 15%
   - Availability alignment: 5%
4. For each shortlisted candidate, provide:
   - Detailed strengths (3-5 bullet points)
   - Gaps or risks (1-3 bullet points)
   - 3 tailored interview questions
   - Skill gap analysis (matched skills, missing skills, bonus skills)
5. Be objective, fair, and specific — reference actual data from the profiles
6. Score gaps honestly — don't over-inflate scores

Respond ONLY with valid JSON in this exact structure (no markdown, no extra text):

{
  "shortlist": [
    {
      "candidateId": "email or id of candidate",
      "candidateName": "Full Name",
      "email": "email",
      "rank": 1,
      "matchScore": 87,
      "breakdown": {
        "skillsScore": 90,
        "experienceScore": 85,
        "educationScore": 80,
        "projectsScore": 88,
        "availabilityScore": 100
      },
      "strengths": ["strength 1", "strength 2", "strength 3"],
      "gaps": ["gap 1", "gap 2"],
      "recommendation": "Strongly Recommended",
      "summary": "2-3 sentence recruiter-ready summary explaining why this candidate stands out",
      "interviewQuestions": ["Question 1?", "Question 2?", "Question 3?"],
      "skillGapAnalysis": {
        "matched": ["skill1", "skill2"],
        "missing": ["skill3"],
        "bonus": ["extra skill not required but valuable"]
      }
    }
  ]
}`;
}

// ─── Main Screening Function ─────────────────────────────────────────────────

export async function screenCandidates(
  job: Job,
  candidates: TalentProfile[],
  shortlistSize: number = 10
): Promise<Omit<ScreeningResult, "_id" | "screeningDate">> {
  const startTime = Date.now();

  // Process in batches if many candidates (Gemini has token limits)
  const BATCH_SIZE = 30;
  let allScores: CandidateScore[] = [];

  if (candidates.length <= BATCH_SIZE) {
    const prompt = buildScreeningPrompt(job, candidates, shortlistSize);
    const result = await getModel().generateContent(prompt);
    const text = extractJSON(result.response.text());
    const parsed = JSON.parse(text);
    allScores = parsed.shortlist;
  } else {
    // Multi-batch: get top shortlistSize from each batch, then re-rank
    const batches: TalentProfile[][] = [];
    for (let i = 0; i < candidates.length; i += BATCH_SIZE) {
      batches.push(candidates.slice(i, i + BATCH_SIZE));
    }

    const batchResults = await Promise.all(
      batches.map(batch => {
        const prompt = buildScreeningPrompt(job, batch, Math.ceil(shortlistSize * 1.5));
        return getModel().generateContent(prompt).then(r => {
          const text = extractJSON(r.response.text());
          return JSON.parse(text).shortlist as CandidateScore[];
        });
      })
    );

    // Combine and re-rank the best from each batch
    const combined = batchResults.flat().sort((a, b) => b.matchScore - a.matchScore);
    const topCandidates = combined.slice(0, shortlistSize * 2);

    // Get actual profiles for top candidates
    const topProfiles = topCandidates
      .map(s => candidates.find(c => c.email === s.email || c._id === s.candidateId))
      .filter(Boolean) as TalentProfile[];

    const finalPrompt = buildScreeningPrompt(job, topProfiles, shortlistSize);
    const finalResult = await getModel().generateContent(finalPrompt);
    const finalText = extractJSON(finalResult.response.text());
    allScores = JSON.parse(finalText).shortlist;
  }

  // Re-assign ranks to ensure correct ordering
  allScores = allScores
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, shortlistSize)
    .map((s, i) => ({ ...s, rank: i + 1 }));

  return {
    jobId: job._id || "",
    jobTitle: job.title,
    totalApplicants: candidates.length,
    shortlistSize: allScores.length,
    shortlist: allScores,
    aiModel: MODEL,
    processingTimeMs: Date.now() - startTime,
  };
}

// ─── Resume Parser ────────────────────────────────────────────────────────────

export async function parseResumeToProfile(rawText: string, email?: string): Promise<Partial<TalentProfile>> {
  const model = getModel();

  const prompt = `You are an expert resume parser. Extract structured information from the following resume text and return it as JSON matching the Umurava Talent Profile Schema.

RESUME TEXT:
${rawText}

Return ONLY valid JSON (no markdown) with this structure:
{
  "firstName": "",
  "lastName": "",
  "email": "${email || ""}",
  "headline": "",
  "bio": "",
  "location": "",
  "skills": [{"name": "", "level": "Beginner|Intermediate|Advanced|Expert", "yearsOfExperience": 0}],
  "languages": [{"name": "", "proficiency": "Basic|Conversational|Fluent|Native"}],
  "experience": [{"company": "", "role": "", "startDate": "YYYY-MM", "endDate": "YYYY-MM or Present", "description": "", "technologies": [], "isCurrent": false}],
  "education": [{"institution": "", "degree": "", "fieldOfStudy": "", "startYear": 0, "endYear": 0}],
  "certifications": [{"name": "", "issuer": "", "issueDate": "YYYY-MM"}],
  "projects": [{"name": "", "description": "", "technologies": [], "role": "", "link": "", "startDate": "YYYY-MM", "endDate": "YYYY-MM"}],
  "availability": {"status": "Available", "type": "Full-time"},
  "socialLinks": {"linkedin": "", "github": "", "portfolio": ""}
}`;

  const result = await model.generateContent(prompt);
  const text = extractJSON(result.response.text());
  return JSON.parse(text);
}
