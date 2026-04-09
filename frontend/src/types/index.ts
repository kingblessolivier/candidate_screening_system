export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  yearsOfExperience: number;
}

export interface Language {
  name: string;
  proficiency: "Basic" | "Conversational" | "Fluent" | "Native";
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  isCurrent: boolean;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  role: string;
  link?: string;
  startDate: string;
  endDate: string;
}

export interface Availability {
  status: "Available" | "Open to Opportunities" | "Not Available";
  type: "Full-time" | "Part-time" | "Contract";
  startDate?: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface Candidate {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  headline: string;
  bio?: string;
  location: string;
  skills: Skill[];
  languages?: Language[];
  experience: Experience[];
  education: Education[];
  certifications?: Certification[];
  projects: Project[];
  availability: Availability;
  socialLinks?: SocialLinks;
  source?: "platform" | "csv" | "pdf";
  createdAt: string;
}

export interface JobRequirement {
  skill: string;
  level?: string;
  yearsRequired?: number;
  required: boolean;
}

export interface Job {
  _id: string;
  title: string;
  description: string;
  department?: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  experienceLevel: "Junior" | "Mid-level" | "Senior" | "Lead";
  requirements: JobRequirement[];
  niceToHave?: string[];
  responsibilities: string[];
  salaryRange?: { min: number; max: number; currency: string };
  createdAt: string;
}

export interface CandidateScore {
  candidateId: string;
  candidateName: string;
  email: string;
  rank: number;
  matchScore: number;
  breakdown: {
    skillsScore: number;
    experienceScore: number;
    educationScore: number;
    projectsScore: number;
    availabilityScore: number;
  };
  strengths: string[];
  gaps: string[];
  recommendation: "Strongly Recommended" | "Recommended" | "Consider" | "Not Recommended";
  summary: string;
  interviewQuestions: string[];
  skillGapAnalysis: {
    matched: string[];
    missing: string[];
    bonus: string[];
  };
}

export interface ScreeningResult {
  _id: string;
  jobId: string;
  jobTitle: string;
  totalApplicants: number;
  shortlistSize: number;
  shortlist: CandidateScore[];
  screeningDate: string;
  aiModel: string;
  processingTimeMs: number;
  createdAt: string;
}
