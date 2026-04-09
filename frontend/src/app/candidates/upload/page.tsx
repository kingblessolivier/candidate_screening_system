"use client";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { uploadPDFs, uploadCSV, bulkCreateCandidates } from "@/store/candidatesSlice";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { Upload, FileText, Table, Code, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import DUMMY_CANDIDATES from "@/lib/dummyData";

type Tab = "pdf" | "csv" | "json";

export default function UploadPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { uploading } = useSelector((s: RootState) => s.candidates);
  const [tab, setTab] = useState<Tab>("pdf");
  const [seedLoading, setSeedLoading] = useState(false);

  // PDF upload
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const onDropPDF = useCallback((accepted: File[]) => setPdfFiles(prev => [...prev, ...accepted]), []);
  const { getRootProps: getPDFProps, getInputProps: getPDFInputProps, isDragActive: isPDFDragging } = useDropzone({
    onDrop: onDropPDF, accept: { "application/pdf": [".pdf"] }, multiple: true,
  });

  const submitPDF = async () => {
    if (!pdfFiles.length) return toast.error("Select PDF files first");
    try {
      const result = await dispatch(uploadPDFs(pdfFiles)).unwrap();
      toast.success(`${result.data.imported} resumes imported!`);
      setPdfFiles([]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    }
  };

  // CSV upload
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const onDropCSV = useCallback((accepted: File[]) => setCsvFile(accepted[0]), []);
  const { getRootProps: getCSVProps, getInputProps: getCSVInputProps, isDragActive: isCSVDragging } = useDropzone({
    onDrop: onDropCSV, accept: { "text/csv": [".csv"], "application/vnd.ms-excel": [".xls", ".xlsx"] }, multiple: false,
  });

  const submitCSV = async () => {
    if (!csvFile) return toast.error("Select a CSV file first");
    try {
      const result = await dispatch(uploadCSV(csvFile)).unwrap();
      toast.success(`${result.data.imported} candidates imported!`);
      setCsvFile(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    }
  };

  // Seed dummy data
  const seedDummyData = async () => {
    setSeedLoading(true);
    try {
      await dispatch(bulkCreateCandidates(DUMMY_CANDIDATES)).unwrap();
      toast.success(`${DUMMY_CANDIDATES.length} demo candidates seeded!`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Seeding failed");
    } finally {
      setSeedLoading(false);
    }
  };

  const dropzoneCls = (active: boolean) =>
    `border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${active ? "border-blue-500 bg-blue-500/5" : "border-gray-700 hover:border-gray-600 bg-gray-900/50"}`;

  const tabs: { id: Tab; label: string; icon: typeof Upload }[] = [
    { id: "pdf", label: "PDF Resumes", icon: FileText },
    { id: "csv", label: "CSV / Excel", icon: Table },
    { id: "json", label: "Demo Data", icon: Code },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/candidates" className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors text-gray-400">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Add Candidates</h1>
          <p className="text-gray-400 text-sm">Upload resumes, CSV, or seed demo data</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 rounded-lg bg-gray-900 border border-gray-800 p-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${tab === id ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-200"}`}
          >
            <Icon className="w-4 h-4" />{label}
          </button>
        ))}
      </div>

      {tab === "pdf" && (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
          <h2 className="font-semibold text-white">Upload PDF Resumes</h2>
          <p className="text-sm text-gray-400">Gemini AI will parse each resume and extract structured profile data automatically.</p>
          <div {...getPDFProps()} className={dropzoneCls(isPDFDragging)}>
            <input {...getPDFInputProps()} />
            <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-300">Drop PDF files here or <span className="text-blue-400">browse</span></p>
            <p className="text-xs text-gray-500 mt-1">Multiple files supported · Max 10MB each</p>
          </div>
          {pdfFiles.length > 0 && (
            <div className="space-y-2">
              {pdfFiles.map(f => (
                <div key={f.name} className="flex items-center gap-2 text-sm text-gray-400">
                  <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="truncate">{f.name}</span>
                  <span className="text-gray-600 flex-shrink-0">({(f.size / 1024).toFixed(0)}KB)</span>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={submitPDF}
            disabled={uploading || !pdfFiles.length}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Parsing resumes...</> : <><Upload className="w-4 h-4" /> Upload & Parse {pdfFiles.length > 0 ? `(${pdfFiles.length})` : ""}</>}
          </button>
        </div>
      )}

      {tab === "csv" && (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
          <h2 className="font-semibold text-white">Upload CSV / Excel</h2>
          <p className="text-sm text-gray-400">
            Expected columns: <code className="text-blue-400 text-xs">firstName, lastName, email, headline, location, skills, bio</code>
          </p>
          <div {...getCSVProps()} className={dropzoneCls(isCSVDragging)}>
            <input {...getCSVInputProps()} />
            <Table className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-300">Drop CSV/Excel file here or <span className="text-blue-400">browse</span></p>
            {csvFile && <p className="text-xs text-green-400 mt-2 flex items-center justify-center gap-1"><CheckCircle className="w-3 h-3" />{csvFile.name}</p>}
          </div>
          <button
            onClick={submitCSV}
            disabled={uploading || !csvFile}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Importing...</> : <><Table className="w-4 h-4" /> Import CSV</>}
          </button>
        </div>
      )}

      {tab === "json" && (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
          <h2 className="font-semibold text-white">Seed Demo Data</h2>
          <p className="text-sm text-gray-400">
            Load <strong className="text-white">{DUMMY_CANDIDATES.length} pre-built candidate profiles</strong> following the exact Umurava Talent Profile Schema. Perfect for testing and demos.
          </p>
          <div className="rounded-lg bg-gray-800 border border-gray-700 p-4 space-y-2">
            {["Full structured profiles with skills, experience, education", "Multiple tech backgrounds and experience levels", "Projects with real technology stacks", "Varied availability and locations across Africa"].map(item => (
              <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <button
            onClick={seedDummyData}
            disabled={seedLoading}
            className="w-full py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {seedLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Seeding...</> : <><Code className="w-4 h-4" /> Seed {DUMMY_CANDIDATES.length} Demo Candidates</>}
          </button>
        </div>
      )}
    </div>
  );
}
