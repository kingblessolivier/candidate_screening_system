import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  timeout: 120000, // 2 min for AI screening
});

// Attach backend JWT from NextAuth session to every request
api.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    try {
      const { getSession } = await import("next-auth/react");
      const session = await getSession();
      const token = (session as { backendToken?: string })?.backendToken;
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch {}
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.error || err.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export default api;

// ─── Jobs ────────────────────────────────────────────────────────────────────
export const jobsApi = {
  getAll: () => api.get("/jobs"),
  getOne: (id: string) => api.get(`/jobs/${id}`),
  create: (data: object) => api.post("/jobs", data),
  update: (id: string, data: object) => api.put(`/jobs/${id}`, data),
  delete: (id: string) => api.delete(`/jobs/${id}`),
};

// ─── Candidates ──────────────────────────────────────────────────────────────
export const candidatesApi = {
  getAll: () => api.get("/candidates"),
  getOne: (id: string) => api.get(`/candidates/${id}`),
  create: (data: object) => api.post("/candidates", data),
  bulkCreate: (candidates: object[]) => api.post("/candidates/bulk", { candidates }),
  delete: (id: string) => api.delete(`/candidates/${id}`),
  uploadPDF: (files: File[]) => {
    const formData = new FormData();
    files.forEach(f => formData.append("resumes", f));
    return api.post("/candidates/upload/pdf", formData, { headers: { "Content-Type": "multipart/form-data" } });
  },
  uploadCSV: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/candidates/upload/csv", formData, { headers: { "Content-Type": "multipart/form-data" } });
  },
};

// ─── Screening ───────────────────────────────────────────────────────────────
export const screeningApi = {
  run: (jobId: string, candidateIds?: string[], shortlistSize?: number) =>
    api.post("/screening/run", { jobId, candidateIds, shortlistSize }),
  getAll: (jobId?: string) => api.get("/screening", { params: jobId ? { jobId } : {} }),
  getOne: (id: string) => api.get(`/screening/${id}`),
  getLatestForJob: (jobId: string) => api.get(`/screening/job/${jobId}/latest`),
};
