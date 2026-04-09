import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import routes from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(helmet());
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000").split(",").map(s => s.trim());
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) return cb(null, true);
    cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/api", routes);

app.get("/health", (_req, res) => res.json({ status: "ok", timestamp: new Date().toISOString() }));

// ─── Start ────────────────────────────────────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

export default app;
