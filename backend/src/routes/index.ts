import { Router } from "express";
import multer from "multer";
import {
  createJob, getJobs, getJob, updateJob, deleteJob,
} from "../controllers/jobController";
import {
  getCandidates, createCandidate, getCandidate, deleteCandidate,
  uploadPDFResumes, uploadCSV, bulkCreateCandidates,
} from "../controllers/candidateController";
import {
  runScreening, getScreeningResults, getScreeningResult, getLatestScreeningForJob,
} from "../controllers/screeningController";
import { register, login, oauthSync, getMe } from "../controllers/authController";
import { requireAuth } from "../middleware/auth";

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

// ─── Auth ────────────────────────────────────────────────────────────────────
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/oauth", oauthSync);
router.get("/auth/me", requireAuth, getMe);

// ─── Jobs ────────────────────────────────────────────────────────────────────
router.post("/jobs", createJob);
router.get("/jobs", getJobs);
router.get("/jobs/:id", getJob);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);

// ─── Candidates ──────────────────────────────────────────────────────────────
router.get("/candidates", getCandidates);
router.post("/candidates", createCandidate);
router.post("/candidates/bulk", bulkCreateCandidates);
router.get("/candidates/:id", getCandidate);
router.delete("/candidates/:id", deleteCandidate);

// File uploads
router.post("/candidates/upload/pdf", upload.array("resumes", 50), uploadPDFResumes);
router.post("/candidates/upload/csv", upload.single("file"), uploadCSV);

// ─── Screening ───────────────────────────────────────────────────────────────
router.post("/screening/run", runScreening);
router.get("/screening", getScreeningResults);
router.get("/screening/job/:jobId/latest", getLatestScreeningForJob);
router.get("/screening/:id", getScreeningResult);

export default router;
