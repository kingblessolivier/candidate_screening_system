"use client";
import { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/store";
import { fetchJobs } from "@/store/jobsSlice";
import { fetchCandidates } from "@/store/candidatesSlice";
import { runScreening } from "@/store/screeningSlice";
import toast from "react-hot-toast";
import { Zap, Loader2, Users, Briefcase, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  "Analyzing job requirements...",
  "Loading candidate profiles...",
  "Evaluating skills alignment...",
  "Scoring work experience...",
  "Assessing education & certifications...",
  "Reviewing project portfolios...",
  "Generating reasoning & insights...",
  "Ranking top candidates...",
  "Finalizing shortlist...",
];

function ScreeningContent() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedJobId = searchParams.get("jobId");

  const jobs = useSelector((s: RootState) => s.jobs.items);
  const candidates = useSelector((s: RootState) => s.candidates.items);
  const { running } = useSelector((s: RootState) => s.screening);

  const [jobId, setJobId] = useState(preselectedJobId || "");
  const [shortlistSize, setShortlistSize] = useState(10);
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchCandidates());
  }, [dispatch]);

  useEffect(() => {
    if (preselectedJobId) setJobId(preselectedJobId);
  }, [preselectedJobId]);

  // Animate steps while running
  useEffect(() => {
    if (!running) { setStepIdx(0); return; }
    const interval = setInterval(() => {
      setStepIdx(prev => (prev + 1) % steps.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [running]);

  const handleRun = async () => {
    if (!jobId) return toast.error("Select a job first");
    if (candidates.length === 0) return toast.error("No candidates in pool. Upload some first.");
    try {
      const result = await dispatch(runScreening({ jobId, shortlistSize })).unwrap();
      toast.success(`Screening complete! ${result.shortlistSize} candidates shortlisted.`);
      router.push(`/results/${result._id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Screening failed");
    }
  };

  const selectedJob = jobs.find(j => j._id === jobId);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Screening</h1>
        <p className="text-gray-400 text-sm mt-1">Let Gemini AI analyze and rank your candidates</p>
      </div>

      {/* Config */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-5">
        <h2 className="font-semibold text-white">Screening Configuration</h2>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Select Job *</label>
          <select
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            value={jobId}
            onChange={e => setJobId(e.target.value)}
            disabled={running}
          >
            <option value="">Choose a job...</option>
            {jobs.map(j => (
              <option key={j._id} value={j._id}>{j.title} — {j.experienceLevel}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Shortlist Size: <span className="text-blue-400">Top {shortlistSize}</span>
          </label>
          <input
            type="range" min={5} max={20} step={5}
            value={shortlistSize}
            onChange={e => setShortlistSize(Number(e.target.value))}
            disabled={running}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Top 5</span><span>Top 10</span><span>Top 15</span><span>Top 20</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-gray-800 border border-gray-700 p-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-violet-400" />
            <div>
              <p className="text-xs text-gray-500">Candidates</p>
              <p className="text-sm font-semibold text-white">{candidates.length}</p>
            </div>
          </div>
          <div className="rounded-lg bg-gray-800 border border-gray-700 p-3 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-xs text-gray-500">Selected Job</p>
              <p className="text-sm font-semibold text-white truncate">
                {selectedJob ? selectedJob.title : "None"}
              </p>
            </div>
          </div>
        </div>

        {selectedJob && (
          <div className="rounded-lg bg-blue-900/20 border border-blue-800/30 p-3">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-300 space-y-1">
                <p><span className="text-blue-400 font-medium">Required skills:</span> {selectedJob.requirements.filter(r => r.required).map(r => r.skill).join(", ")}</p>
                <p><span className="text-blue-400 font-medium">Level:</span> {selectedJob.experienceLevel} · {selectedJob.type}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Run Button */}
      <button
        onClick={handleRun}
        disabled={running || !jobId || candidates.length === 0}
        className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-base shadow-lg shadow-blue-900/30"
      >
        {running ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Screening in progress...</>
        ) : (
          <><Zap className="w-5 h-5" /> Run AI Screening</>
        )}
      </button>

      {/* Live progress */}
      <AnimatePresence>
        {running && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl border border-blue-800/30 bg-blue-900/10 p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <p className="text-sm text-blue-300 font-medium">Gemini AI is working...</p>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={stepIdx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-sm text-gray-400"
              >
                {steps[stepIdx]}
              </motion.p>
            </AnimatePresence>
            <div className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Criteria info */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
        <h3 className="text-sm font-semibold text-white mb-3">How AI Scoring Works</h3>
        <div className="space-y-2">
          {[
            { label: "Skills Match", weight: "35%", color: "bg-blue-500" },
            { label: "Work Experience", weight: "30%", color: "bg-violet-500" },
            { label: "Education & Certs", weight: "15%", color: "bg-amber-500" },
            { label: "Project Portfolio", weight: "15%", color: "bg-green-500" },
            { label: "Availability", weight: "5%", color: "bg-pink-500" },
          ].map(({ label, weight, color }) => (
            <div key={label} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${color} flex-shrink-0`} />
              <span className="text-xs text-gray-400 flex-1">{label}</span>
              <span className="text-xs font-semibold text-gray-300">{weight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ScreeningPage() {
  return (
    <Suspense fallback={<div className="text-gray-400 text-sm">Loading...</div>}>
      <ScreeningContent />
    </Suspense>
  );
}
