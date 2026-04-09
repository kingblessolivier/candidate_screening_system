import { Request, Response } from "express";
import { Candidate } from "../models/Candidate";
import { parseResumeToProfile } from "../services/geminiService";
import pdfParse from "pdf-parse";
import csvParser from "csv-parser";
import { Readable } from "stream";
import { TalentProfile } from "../types";

export const getCandidates = async (_req: Request, res: Response) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.json({ success: true, data: candidates });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch candidates";
    res.status(500).json({ success: false, error: message });
  }
};

export const createCandidate = async (req: Request, res: Response) => {
  try {
    const candidate = new Candidate({ ...req.body, source: "platform" });
    await candidate.save();
    res.status(201).json({ success: true, data: candidate });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create candidate";
    res.status(400).json({ success: false, error: message });
  }
};

export const getCandidate = async (req: Request, res: Response) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ success: false, error: "Candidate not found" });
    res.json({ success: true, data: candidate });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch candidate";
    res.status(500).json({ success: false, error: message });
  }
};

export const deleteCandidate = async (req: Request, res: Response) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) return res.status(404).json({ success: false, error: "Candidate not found" });
    res.json({ success: true, message: "Candidate deleted" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete candidate";
    res.status(500).json({ success: false, error: message });
  }
};

// Upload PDF resumes
export const uploadPDFResumes = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, error: "No files uploaded" });
    }

    const results = await Promise.allSettled(
      files.map(async (file) => {
        const pdfData = await pdfParse(file.buffer);
        const rawText = pdfData.text;
        const profile = await parseResumeToProfile(rawText);

        const candidate = new Candidate({
          ...profile,
          source: "pdf",
          rawText,
          email: profile.email || `${file.originalname}-${Date.now()}@unknown.com`,
        });

        // Upsert by email
        return Candidate.findOneAndUpdate(
          { email: candidate.email },
          candidate.toObject(),
          { upsert: true, new: true, runValidators: false }
        );
      })
    );

    const successful = results.filter(r => r.status === "fulfilled").map(r => (r as PromiseFulfilledResult<unknown>).value);
    const failed = results.filter(r => r.status === "rejected").length;

    res.json({
      success: true,
      data: { imported: successful.length, failed },
      message: `${successful.length} resumes parsed and imported`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to parse PDFs";
    res.status(500).json({ success: false, error: message });
  }
};

// Upload CSV/Excel
export const uploadCSV = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ success: false, error: "No file uploaded" });

    const rows: Record<string, string>[] = [];
    const stream = Readable.from(file.buffer.toString());

    await new Promise<void>((resolve, reject) => {
      stream
        .pipe(csvParser())
        .on("data", (row: Record<string, string>) => rows.push(row))
        .on("end", resolve)
        .on("error", reject);
    });

    // Map CSV rows to TalentProfile (expects columns: firstName, lastName, email, headline, location, skills, etc.)
    const profiles: Partial<TalentProfile>[] = rows.map((row) => ({
      firstName: row["firstName"] || row["First Name"] || "",
      lastName: row["lastName"] || row["Last Name"] || "",
      email: row["email"] || row["Email"] || "",
      headline: row["headline"] || row["Headline"] || "",
      location: row["location"] || row["Location"] || "",
      bio: row["bio"] || row["Bio"] || "",
      skills: (row["skills"] || "").split(",").map(s => ({
        name: s.trim(),
        level: "Intermediate" as const,
        yearsOfExperience: 1,
      })),
      experience: [],
      education: [],
      projects: [],
      availability: { status: "Available" as const, type: "Full-time" as const },
      source: "csv" as const,
    }));

    const ops = profiles
      .filter(p => p.email)
      .map(p =>
        Candidate.findOneAndUpdate({ email: p.email }, p, { upsert: true, new: true, runValidators: false })
      );

    const saved = await Promise.all(ops);
    res.json({
      success: true,
      data: { imported: saved.length },
      message: `${saved.length} candidates imported from CSV`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to parse CSV";
    res.status(500).json({ success: false, error: message });
  }
};

// Bulk create from JSON (for demo data seeding)
export const bulkCreateCandidates = async (req: Request, res: Response) => {
  try {
    const { candidates } = req.body as { candidates: TalentProfile[] };
    if (!candidates || !Array.isArray(candidates)) {
      return res.status(400).json({ success: false, error: "candidates array required" });
    }

    const ops = candidates.map(c =>
      Candidate.findOneAndUpdate({ email: c.email }, c, { upsert: true, new: true, runValidators: false })
    );
    const saved = await Promise.all(ops);
    res.json({ success: true, data: { imported: saved.length }, message: `${saved.length} candidates saved` });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Bulk create failed";
    res.status(500).json({ success: false, error: message });
  }
};
