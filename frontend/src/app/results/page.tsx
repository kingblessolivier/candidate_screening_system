"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchScreeningResults } from "@/store/screeningSlice";
import Link from "next/link";
import { BarChart3, ChevronRight, Clock, Users, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const recColor: Record<string, string> = {
  "Strongly Recommended": "text-green-400 bg-green-400/10 border-green-400/20",
  "Recommended": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "Consider": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Not Recommended": "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function ResultsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { results, loading } = useSelector((s: RootState) => s.screening);

  useEffect(() => { dispatch(fetchScreeningResults()); }, [dispatch]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Screening Results</h1>
        <p className="text-gray-400 text-sm mt-1">{results.length} screening session{results.length !== 1 ? "s" : ""} completed</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <div key={i} className="h-32 rounded-xl bg-gray-800 animate-pulse" />)}
        </div>
      ) : results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900/50 p-16 text-center">
          <BarChart3 className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-1">No results yet</h3>
          <p className="text-gray-500 text-sm mb-4">Run your first AI screening to see shortlists here.</p>
          <Link href="/screening" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            Run Screening
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((r, i) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/results/${r._id}`}>
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-gray-700 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{r.jobTitle}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Users className="w-3 h-3" />{r.totalApplicants} applicants
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Trophy className="w-3 h-3" />{r.shortlistSize} shortlisted
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />{new Date(r.screeningDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                  </div>

                  {/* Top 3 preview */}
                  <div className="grid grid-cols-3 gap-2">
                    {r.shortlist.slice(0, 3).map((c) => (
                      <div key={c.candidateId} className="rounded-lg bg-gray-800 border border-gray-700 p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">#{c.rank}</span>
                          <span className="text-sm font-bold text-white">{c.matchScore}%</span>
                        </div>
                        <p className="text-xs text-gray-300 font-medium truncate">{c.candidateName}</p>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full border mt-1 inline-block ${recColor[c.recommendation] || ""}`}>
                          {c.recommendation.split(" ")[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
