import { Request, Response } from "express";
import { Job as JobModel } from "../models/Job";
import { Candidate } from "../models/Candidate";
import { ScreeningResultModel } from "../models/ScreeningResult";
import { screenCandidates } from "../services/geminiService";
import { Job, TalentProfile } from "../types";

export const runScreening = async (req: Request, res: Response) => {
  try {
    const { jobId, candidateIds, shortlistSize = 10 } = req.body as {
      jobId: string;
      candidateIds?: string[];
      shortlistSize?: number;
    };

    if (!jobId) return res.status(400).json({ success: false, error: "jobId is required" });

    const jobDoc = await JobModel.findById(jobId);
    if (!jobDoc) return res.status(404).json({ success: false, error: "Job not found" });

    // Get candidates — either specified or all
    const query = candidateIds?.length ? { _id: { $in: candidateIds } } : {};
    const candidateDocs = await Candidate.find(query);

    if (candidateDocs.length === 0) {
      return res.status(400).json({ success: false, error: "No candidates found to screen" });
    }

    const job = { ...jobDoc.toObject(), _id: jobDoc._id.toString() } as unknown as Job;

    const candidates = candidateDocs.map(c => ({
      ...c.toObject(),
      _id: c._id.toString(),
    })) as unknown as TalentProfile[];

    const screeningData = await screenCandidates(job, candidates, Math.min(shortlistSize, 20));

    const result = new ScreeningResultModel({
      ...screeningData,
      jobId,
    });
    await result.save();

    res.json({ success: true, data: result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Screening failed";
    console.error("Screening error:", err);
    res.status(500).json({ success: false, error: message });
  }
};

export const getScreeningResults = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.query;
    const query = jobId ? { jobId } : {};
    const results = await ScreeningResultModel.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: results });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch results";
    res.status(500).json({ success: false, error: message });
  }
};

export const getScreeningResult = async (req: Request, res: Response) => {
  try {
    const result = await ScreeningResultModel.findById(req.params.id);
    if (!result) return res.status(404).json({ success: false, error: "Result not found" });
    res.json({ success: true, data: result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch result";
    res.status(500).json({ success: false, error: message });
  }
};

export const getLatestScreeningForJob = async (req: Request, res: Response) => {
  try {
    const result = await ScreeningResultModel.findOne({ jobId: req.params.jobId }).sort({ createdAt: -1 });
    if (!result) return res.status(404).json({ success: false, error: "No screening results for this job" });
    res.json({ success: true, data: result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch result";
    res.status(500).json({ success: false, error: message });
  }
};
