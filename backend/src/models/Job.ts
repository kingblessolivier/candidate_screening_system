import mongoose, { Schema, Document } from "mongoose";
import { Job as JobType } from "../types";

export interface JobDocument extends Omit<JobType, "_id">, Document {}

const JobSchema = new Schema<JobDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    department: { type: String },
    location: { type: String, required: true },
    type: { type: String, enum: ["Full-time", "Part-time", "Contract"], required: true },
    experienceLevel: { type: String, enum: ["Junior", "Mid-level", "Senior", "Lead"], required: true },
    requirements: [
      {
        skill: { type: String, required: true },
        level: { type: String },
        yearsRequired: { type: Number },
        required: { type: Boolean, default: true },
      },
    ],
    niceToHave: [{ type: String }],
    responsibilities: [{ type: String, required: true }],
    salaryRange: {
      min: Number,
      max: Number,
      currency: { type: String, default: "USD" },
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model<JobDocument>("Job", JobSchema);
