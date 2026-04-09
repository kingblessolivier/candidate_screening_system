"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchScreeningResult } from "@/store/screeningSlice";
import { useParams } from "next/navigation";
import { ArrowLeft, Trophy, Users, Clock, Zap, ChevronDown, ChevronUp, MessageSquare, CheckCircle, XCircle, Star } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { CandidateScore } from "@/types";

const recColor: Record<string, string> = {
  "Strongly Recommended": "from-green-500/20 to-green-600/5 border-green-500/30",
  "Recommended": "from-blue-500/20 to-blue-600/5 border-blue-500/30",
  "Consider": "from-amber-500/20 to-amber-600/5 border-amber-500/30",
  "Not Recommended": "from-red-500/20 to-red-600/5 border-red-500/30",
};

const recBadge: Record<string, string> = {
  "Strongly Recommended": "text-green-400 bg-green-400/10 border-green-400/30",
  "Recommended": "text-blue-400 bg-blue-400/10 border-blue-400/30",
  "Consider": "text-amber-400 bg-amber-400/10 border-amber-400/30",
  "Not Recommended": "text-red-400 bg-red-400/10 border-red-400/30",
};

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-medium">{value}%</span>
      </div>
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function CandidateCard({ candidate, rank }: { candidate: CandidateScore; rank: number }) {
  const [expanded, setExpanded] = useState(false);

  const radarData = [
    { subject: "Skills", value: candidate.breakdown.skillsScore },
    { subject: "Experience", value: candidate.breakdown.experienceScore },
    { subject: "Education", value: candidate.breakdown.educationScore },
    { subject: "Projects", value: candidate.breakdown.projectsScore },
    { subject: "Availability", value: candidate.breakdown.availabilityScore },
  ];

  const scoreColor =
    candidate.matchScore >= 80 ? "text-green-400" :
    candidate.matchScore >= 60 ? "text-blue-400" :
    candidate.matchScore >= 40 ? "text-amber-400" : "text-red-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.06 }}
      className={`rounded-xl border bg-gradient-to-br ${recColor[candidate.recommendation] || "border-gray-800 bg-gray-900"} overflow-hidden`}
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${rank === 1 ? "bg-amber-500 text-black" : rank === 2 ? "bg-gray-400 text-black" : rank === 3 ? "bg-amber-700 text-white" : "bg-gray-700 text-gray-300"}`}>
              {rank <= 3 ? "🏆" : rank}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{candidate.candidateName}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${recBadge[candidate.recommendation]}`}>
                  {candidate.recommendation}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{candidate.email}</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className={`text-3xl font-bold ${scoreColor}`}>{candidate.matchScore}</p>
            <p className="text-xs text-gray-500">/ 100</p>
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-3 leading-relaxed">{candidate.summary}</p>

        {/* Score bars */}
        <div className="mt-4 space-y-2">
          <ScoreBar label="Skills" value={candidate.breakdown.skillsScore} />
          <ScoreBar label="Experience" value={candidate.breakdown.experienceScore} />
          <ScoreBar label="Education" value={candidate.breakdown.educationScore} />
          <ScoreBar label="Projects" value={candidate.breakdown.projectsScore} />
        </div>

        <button
          onClick={() => setExpanded(e => !e)}
          className="mt-4 w-full flex items-center justify-center gap-1 text-xs text-gray-400 hover:text-gray-200 transition-colors py-1"
        >
          {expanded ? <><ChevronUp className="w-3 h-3" /> Show less</> : <><ChevronDown className="w-3 h-3" /> View full analysis</>}
        </button>
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gray-800/50"
          >
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                {/* Strengths */}
                <div>
                  <h4 className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Strengths
                  </h4>
                  <ul className="space-y-1.5">
                    {candidate.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <Star className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gaps */}
                <div>
                  <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> Gaps / Risks
                  </h4>
                  <ul className="space-y-1.5">
                    {candidate.gaps.map((g, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <XCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Skill Gap Analysis */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Skill Gap Analysis</h4>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.skillGapAnalysis.matched.map(s => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">✓ {s}</span>
                  ))}
                  {candidate.skillGapAnalysis.missing.map(s => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400">✗ {s}</span>
                  ))}
                  {candidate.skillGapAnalysis.bonus.map(s => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">+ {s}</span>
                  ))}
                </div>
              </div>

              {/* Radar Chart */}
              <div className="h-48">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Score Breakdown</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                    <Radar name="Score" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                    <Tooltip contentStyle={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Interview Questions */}
              <div>
                <h4 className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> Suggested Interview Questions
                </h4>
                <ol className="space-y-2">
                  {candidate.interviewQuestions.map((q, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-300">
                      <span className="text-violet-400 font-semibold flex-shrink-0">{i + 1}.</span>
                      {q}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ResultDetailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const id = params.id as string;
  const { current: result, loading } = useSelector((s: RootState) => s.screening);

  useEffect(() => { if (id) dispatch(fetchScreeningResult(id)); }, [id, dispatch]);

  if (loading || !result) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => <div key={i} className="h-40 rounded-xl bg-gray-800 animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Link href="/results" className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors text-gray-400">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{result.jobTitle}</h1>
            <div className="flex items-center gap-4 mt-1">
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Users className="w-3 h-3" />{result.totalApplicants} applicants screened
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Trophy className="w-3 h-3" />Top {result.shortlistSize} shortlisted
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />{(result.processingTimeMs / 1000).toFixed(1)}s
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Zap className="w-3 h-3" />{result.aiModel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Top Score", value: `${result.shortlist[0]?.matchScore ?? 0}%`, color: "text-green-400" },
          { label: "Avg Score", value: `${Math.round(result.shortlist.reduce((a, c) => a + c.matchScore, 0) / result.shortlist.length)}%`, color: "text-blue-400" },
          {
            label: "Strongly Rec.", value: result.shortlist.filter(c => c.recommendation === "Strongly Recommended").length,
            color: "text-green-400",
          },
          {
            label: "To Consider", value: result.shortlist.filter(c => c.recommendation === "Consider" || c.recommendation === "Not Recommended").length,
            color: "text-amber-400",
          },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl border border-gray-800 bg-gray-900 p-4 text-center">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Candidate cards */}
      <div className="space-y-3">
        {result.shortlist.map((candidate) => (
          <CandidateCard key={candidate.candidateId} candidate={candidate} rank={candidate.rank} />
        ))}
      </div>
    </div>
  );
}
