"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchCandidates, deleteCandidate } from "@/store/candidatesSlice";
import Link from "next/link";
import { Users, Plus, MapPin, Briefcase, Trash2, Search, Upload } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const levelColor: Record<string, string> = {
  Expert: "text-amber-400",
  Advanced: "text-violet-400",
  Intermediate: "text-blue-400",
  Beginner: "text-green-400",
};

const availabilityColor: Record<string, string> = {
  Available: "text-green-400 bg-green-400/10",
  "Open to Opportunities": "text-blue-400 bg-blue-400/10",
  "Not Available": "text-gray-500 bg-gray-500/10",
};

export default function CandidatesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: candidates, loading } = useSelector((s: RootState) => s.candidates);
  const [search, setSearch] = useState("");

  useEffect(() => { dispatch(fetchCandidates()); }, [dispatch]);

  const filtered = candidates.filter(c =>
    `${c.firstName} ${c.lastName} ${c.headline} ${c.location}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove ${name}?`)) return;
    await dispatch(deleteCandidate(id));
    toast.success("Candidate removed");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Candidates</h1>
          <p className="text-gray-400 text-sm mt-1">{candidates.length} candidate{candidates.length !== 1 ? "s" : ""} in pool</p>
        </div>
        <div className="flex gap-2">
          <Link href="/candidates/upload" className="flex items-center gap-2 px-4 py-2 border border-gray-700 hover:bg-gray-800 text-gray-300 text-sm font-medium rounded-lg transition-colors">
            <Upload className="w-4 h-4" /> Upload
          </Link>
          <Link href="/candidates/new" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Add Candidate
          </Link>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
          placeholder="Search by name, headline, or location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-24 rounded-xl bg-gray-800 animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900/50 p-16 text-center">
          <Users className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-1">{search ? "No matches" : "No candidates yet"}</h3>
          <p className="text-gray-500 text-sm mb-4">
            {search ? "Try a different search term." : "Upload resumes or add candidates manually."}
          </p>
          {!search && (
            <Link href="/candidates/upload" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
              <Upload className="w-4 h-4" /> Upload Candidates
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c, i) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">
                    {c.firstName[0]}{c.lastName[0]}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white">{c.firstName} {c.lastName}</h3>
                    <p className="text-sm text-gray-400 truncate">{c.headline}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />{c.location}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Briefcase className="w-3 h-3" />{c.experience.length} role{c.experience.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${availabilityColor[c.availability.status]}`}>
                    {c.availability.status}
                  </span>
                  <button
                    onClick={() => handleDelete(c._id, `${c.firstName} ${c.lastName}`)}
                    className="p-1.5 hover:bg-red-900/30 rounded-lg transition-colors text-gray-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {c.skills.slice(0, 6).map(s => (
                  <span key={s.name} className={`text-xs px-2 py-0.5 rounded-full bg-gray-800 border border-gray-700 ${levelColor[s.level] || "text-gray-400"}`}>
                    {s.name}
                  </span>
                ))}
                {c.skills.length > 6 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 border border-gray-700 text-gray-500">
                    +{c.skills.length - 6}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
