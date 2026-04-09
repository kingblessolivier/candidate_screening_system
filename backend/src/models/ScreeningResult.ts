import mongoose, { Schema, Document } from "mongoose";
import { ScreeningResult } from "../types";

export interface ScreeningResultDocument extends Omit<ScreeningResult, "_id">, Document {}

const CandidateScoreSchema = new Schema({
  candidateId: { type: String, required: true },
  candidateName: { type: String, required: true },
  email: { type: String, required: true },
  rank: { type: Number, required: true },
  matchScore: { type: Number, required: true, min: 0, max: 100 },
  breakdown: {
    skillsScore: Number,
    experienceScore: Number,
    educationScore: Number,
    projectsScore: Number,
    availabilityScore: Number,
  },
  strengths: [String],
  gaps: [String],
  recommendation: {
    type: String,
    enum: ["Strongly Recommended", "Recommended", "Consider", "Not Recommended"],
  },
  summary: String,
  interviewQuestions: [String],
  skillGapAnalysis: {
    matched: [String],
    missing: [String],
    bonus: [String],
  },
});

const ScreeningResultSchema = new Schema<ScreeningResultDocument>(
  {
    jobId: { type: String, required: true },
    jobTitle: { type: String, required: true },
    totalApplicants: { type: Number, required: true },
    shortlistSize: { type: Number, required: true },
    shortlist: [CandidateScoreSchema],
    screeningDate: { type: Date, default: Date.now },
    aiModel: { type: String, default: "gemini-1.5-pro" },
    processingTimeMs: { type: Number },
  },
  { timestamps: true }
);

export const ScreeningResultModel = mongoose.model<ScreeningResultDocument>(
  "ScreeningResult",
  ScreeningResultSchema
);
