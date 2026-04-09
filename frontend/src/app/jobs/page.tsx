"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchJobs, deleteJob } from "@/store/jobsSlice";
import Link from "next/link";
import { Briefcase, Plus, MapPin, Clock, Trash2, Eye, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const levelColors: Record<string, string> = {
  Junior: "text-green-400 bg-green-400/10 border-green-400/20",
  "Mid-level": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Senior: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  Lead: "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

export default function JobsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: jobs, loading } = useSelector((s: RootState) => s.jobs);

  useEffect(() => { dispatch(fetchJobs()); }, [dispatch]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    await dispatch(deleteJob(id));
    toast.success("Job deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Jobs</h1>
          <p className="text-gray-400 text-sm mt-1">{jobs.length} job opening{jobs.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/jobs/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Job
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-48 rounded-xl bg-gray-800 animate-pulse" />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900/50 p-16 text-center">
          <Briefcase className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-1">No jobs yet</h3>
          <p className="text-gray-500 text-sm mb-4">Create your first job opening to start screening candidates.</p>
          <Link href="/jobs/new" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Create Job
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {jobs.map((job, i) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-gray-700 transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{job.title}</h3>
                  {job.department && <p className="text-xs text-gray-500 mt-0.5">{job.department}</p>}
                </div>
                <span className={`ml-3 flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${levelColors[job.experienceLevel] || "text-gray-400 bg-gray-400/10 border-gray-400/20"}`}>
                  {job.experienceLevel}
                </span>
              </div>

              <p className="text-sm text-gray-400 line-clamp-2 mb-4">{job.description}</p>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {job.requirements.slice(0, 4).map((r) => (
                  <span key={r.skill} className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                    {r.skill}
                  </span>
                ))}
                {job.requirements.length > 4 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-500">
                    +{job.requirements.length - 4}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-gray-800">
                <Link
                  href={`/screening?jobId=${job._id}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium rounded-lg transition-colors border border-blue-500/20"
                >
                  Screen Candidates <ChevronRight className="w-3 h-3" />
                </Link>
                <Link
                  href={`/jobs/${job._id}`}
                  className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(job._id, job.title)}
                  className="p-1.5 hover:bg-red-900/30 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
