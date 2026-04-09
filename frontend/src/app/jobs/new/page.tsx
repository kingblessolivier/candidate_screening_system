"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { createJob } from "@/store/jobsSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Job } from "@/types";

interface Req { skill: string; level: string; yearsRequired: number; required: boolean; }

export default function NewJobPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    department: "",
    location: "",
    type: "Full-time" as Job["type"],
    experienceLevel: "Mid-level" as Job["experienceLevel"],
    responsibilities: [""],
    niceToHave: [""],
  });

  const [requirements, setRequirements] = useState<Req[]>([
    { skill: "", level: "Intermediate", yearsRequired: 2, required: true },
  ]);

  const addReq = () => setRequirements(prev => [...prev, { skill: "", level: "Intermediate", yearsRequired: 1, required: true }]);
  const removeReq = (i: number) => setRequirements(prev => prev.filter((_, idx) => idx !== i));
  const updateReq = (i: number, field: keyof Req, value: string | number | boolean) =>
    setRequirements(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r));

  const addListItem = (field: "responsibilities" | "niceToHave") =>
    setForm(prev => ({ ...prev, [field]: [...prev[field], ""] }));
  const updateListItem = (field: "responsibilities" | "niceToHave", i: number, val: string) =>
    setForm(prev => ({ ...prev, [field]: prev[field].map((v, idx) => idx === i ? val : v) }));
  const removeListItem = (field: "responsibilities" | "niceToHave", i: number) =>
    setForm(prev => ({ ...prev, [field]: prev[field].filter((_, idx) => idx !== i) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.location) {
      return toast.error("Title, description, and location are required");
    }
    setLoading(true);
    try {
      await dispatch(createJob({
        ...form,
        requirements: requirements.filter(r => r.skill),
        responsibilities: form.responsibilities.filter(Boolean),
        niceToHave: form.niceToHave.filter(Boolean),
      })).unwrap();
      toast.success("Job created!");
      router.push("/jobs");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors";
  const labelCls = "block text-sm font-medium text-gray-300 mb-1.5";

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/jobs" className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors text-gray-400">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Create Job</h1>
          <p className="text-gray-400 text-sm">Define the role and requirements for AI screening</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <section className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
          <h2 className="font-semibold text-white">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>Job Title *</label>
              <input className={inputCls} placeholder="e.g. Senior Backend Engineer" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Department</label>
              <input className={inputCls} placeholder="e.g. Engineering" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Location *</label>
              <input className={inputCls} placeholder="e.g. Kigali, Rwanda" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Type</label>
              <select className={inputCls} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as Job["type"] }))}>
                <option>Full-time</option><option>Part-time</option><option>Contract</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Experience Level</label>
              <select className={inputCls} value={form.experienceLevel} onChange={e => setForm(f => ({ ...f, experienceLevel: e.target.value as Job["experienceLevel"] }))}>
                <option>Junior</option><option>Mid-level</option><option>Senior</option><option>Lead</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Job Description *</label>
              <textarea className={`${inputCls} min-h-[100px] resize-none`} placeholder="Describe the role, team, and what you're looking for..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">Required Skills</h2>
            <button type="button" onClick={addReq} className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
              <Plus className="w-3 h-3" /> Add Skill
            </button>
          </div>
          {requirements.map((req, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center">
              <input className={`${inputCls} col-span-4`} placeholder="Skill name" value={req.skill} onChange={e => updateReq(i, "skill", e.target.value)} />
              <select className={`${inputCls} col-span-3`} value={req.level} onChange={e => updateReq(i, "level", e.target.value)}>
                <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Expert</option>
              </select>
              <input type="number" className={`${inputCls} col-span-2`} placeholder="Years" min={0} max={20} value={req.yearsRequired} onChange={e => updateReq(i, "yearsRequired", Number(e.target.value))} />
              <select className={`${inputCls} col-span-2`} value={req.required ? "required" : "optional"} onChange={e => updateReq(i, "required", e.target.value === "required")}>
                <option value="required">Required</option><option value="optional">Optional</option>
              </select>
              <button type="button" onClick={() => removeReq(i)} className="col-span-1 p-1.5 hover:bg-red-900/30 rounded text-gray-500 hover:text-red-400">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </section>

        {/* Responsibilities */}
        <section className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">Responsibilities</h2>
            <button type="button" onClick={() => addListItem("responsibilities")} className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
          {form.responsibilities.map((r, i) => (
            <div key={i} className="flex gap-2">
              <input className={`${inputCls} flex-1`} placeholder={`Responsibility ${i + 1}`} value={r} onChange={e => updateListItem("responsibilities", i, e.target.value)} />
              <button type="button" onClick={() => removeListItem("responsibilities", i)} className="p-2 hover:bg-red-900/30 rounded text-gray-500 hover:text-red-400">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </section>

        {/* Nice to Have */}
        <section className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">Nice to Have</h2>
            <button type="button" onClick={() => addListItem("niceToHave")} className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
          {form.niceToHave.map((r, i) => (
            <div key={i} className="flex gap-2">
              <input className={`${inputCls} flex-1`} placeholder={`e.g. Experience with Docker`} value={r} onChange={e => updateListItem("niceToHave", i, e.target.value)} />
              <button type="button" onClick={() => removeListItem("niceToHave", i)} className="p-2 hover:bg-red-900/30 rounded text-gray-500 hover:text-red-400">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </section>

        <div className="flex gap-3">
          <Link href="/jobs" className="px-4 py-2 border border-gray-700 hover:bg-gray-800 text-gray-300 text-sm font-medium rounded-lg transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {loading ? "Creating..." : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
