"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchJobs } from "@/store/jobsSlice";
import { fetchCandidates } from "@/store/candidatesSlice";
import { fetchScreeningResults } from "@/store/screeningSlice";
import { Briefcase, Users, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const jobs = useSelector((s: RootState) => s.jobs.items);
  const candidates = useSelector((s: RootState) => s.candidates.items);
  const screenings = useSelector((s: RootState) => s.screening.results);

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchCandidates());
    dispatch(fetchScreeningResults());
  }, [dispatch]);

  const allScores = screenings.flatMap((s) => s.shortlist.map((c) => c.matchScore));
  const avgScore = allScores.length ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0;

  const stats = [
    { label: "Active Jobs", value: jobs.length, icon: Briefcase, color: "blue", href: "/jobs" },
    { label: "Total Candidates", value: candidates.length, icon: Users, color: "violet", href: "/candidates" },
    { label: "Screenings Run", value: screenings.length, icon: Zap, color: "amber", href: "/screening" },
    { label: "Avg Match Score", value: `${avgScore}%`, icon: TrendingUp, color: "green", href: "/results" },
  ];

  const colorMap: Record<string, string> = {
    blue: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400",
    violet: "from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-400",
    amber: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400",
    green: "from-green-500/20 to-green-600/10 border-green-500/30 text-green-400",
  };

  return (
    <div className="space-y-8">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white"
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            TalentAI
          </span>
        </motion.h1>
        <p className="text-gray-400 mt-1">AI-powered candidate screening and ranking platform</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={stat.href}>
              <div
                className={`rounded-xl border bg-gradient-to-br p-5 ${colorMap[stat.color]} cursor-pointer hover:scale-105 transition-transform duration-150`}
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="w-5 h-5" />
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4">
          <Link href="/jobs/new">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-blue-500/50 hover:bg-gray-800 transition-all duration-150 cursor-pointer group">
              <Briefcase className="w-6 h-6 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-white">Post a Job</h3>
              <p className="text-sm text-gray-500 mt-1">Create a new job opening and define requirements</p>
            </div>
          </Link>
          <Link href="/candidates/upload">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-violet-500/50 hover:bg-gray-800 transition-all duration-150 cursor-pointer group">
              <Users className="w-6 h-6 text-violet-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-white">Add Candidates</h3>
              <p className="text-sm text-gray-500 mt-1">Upload profiles, PDFs, or CSV files</p>
            </div>
          </Link>
          <Link href="/screening">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-amber-500/50 hover:bg-gray-800 transition-all duration-150 cursor-pointer group">
              <Zap className="w-6 h-6 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-white">Run AI Screening</h3>
              <p className="text-sm text-gray-500 mt-1">Let Gemini AI rank your best candidates</p>
            </div>
          </Link>
        </div>
      </div>

      {screenings.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Recent Screenings</h2>
          <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 text-left">
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Shortlisted</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Top Score</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {screenings.slice(0, 5).map((s) => (
                  <tr key={s._id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-white">{s.jobTitle}</td>
                    <td className="px-5 py-4 text-sm text-gray-400">{s.totalApplicants}</td>
                    <td className="px-5 py-4 text-sm text-gray-400">{s.shortlistSize}</td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold text-green-400">
                        {s.shortlist[0]?.matchScore ?? "—"}%
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {new Date(s.screeningDate).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <Link href={`/results/${s._id}`} className="text-xs text-blue-400 hover:text-blue-300">
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900/50 p-12 text-center">
          <Zap className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-1">No screenings yet</h3>
          <p className="text-gray-500 text-sm mb-4">
            Post a job, add candidates, then run AI screening to see results here.
          </p>
          <Link
            href="/screening"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Zap className="w-4 h-4" />
            Start Screening
          </Link>
        </div>
      )}
    </div>
  );
}
