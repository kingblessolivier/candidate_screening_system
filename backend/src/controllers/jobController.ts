import { Request, Response } from "express";
import { Job as JobModel } from "../models/Job";
// JobModel is the mongoose model (exported as Job from models/Job)
import { ApiResponse } from "../types";

export const createJob = async (req: Request, res: Response) => {
  try {
    const job = new JobModel(req.body);
    await job.save();
    const response: ApiResponse<typeof job> = { success: true, data: job };
    res.status(201).json(response);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create job";
    res.status(400).json({ success: false, error: message });
  }
};

export const getJobs = async (_req: Request, res: Response) => {
  try {
    const jobs = await JobModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch jobs";
    res.status(500).json({ success: false, error: message });
  }
};

export const getJob = async (req: Request, res: Response) => {
  try {
    const job = await JobModel.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, error: "Job not found" });
    res.json({ success: true, data: job });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch job";
    res.status(500).json({ success: false, error: message });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const job = await JobModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!job) return res.status(404).json({ success: false, error: "Job not found" });
    res.json({ success: true, data: job });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update job";
    res.status(400).json({ success: false, error: message });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const job = await JobModel.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ success: false, error: "Job not found" });
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete job";
    res.status(500).json({ success: false, error: message });
  }
};
