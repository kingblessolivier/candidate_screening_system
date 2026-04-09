import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Candidate } from "@/types";
import { candidatesApi } from "@/lib/api";

interface CandidatesState {
  items: Candidate[];
  loading: boolean;
  uploading: boolean;
  error: string | null;
}

const initialState: CandidatesState = { items: [], loading: false, uploading: false, error: null };

export const fetchCandidates = createAsyncThunk("candidates/fetchAll", async () => {
  const res = await candidatesApi.getAll();
  return res.data.data as Candidate[];
});

export const createCandidate = createAsyncThunk("candidates/create", async (data: Partial<Candidate>) => {
  const res = await candidatesApi.create(data);
  return res.data.data as Candidate;
});

export const bulkCreateCandidates = createAsyncThunk("candidates/bulkCreate", async (candidates: Partial<Candidate>[]) => {
  const res = await candidatesApi.bulkCreate(candidates);
  return res.data;
});

export const deleteCandidate = createAsyncThunk("candidates/delete", async (id: string) => {
  await candidatesApi.delete(id);
  return id;
});

export const uploadPDFs = createAsyncThunk("candidates/uploadPDFs", async (files: File[]) => {
  const res = await candidatesApi.uploadPDF(files);
  return res.data;
});

export const uploadCSV = createAsyncThunk("candidates/uploadCSV", async (file: File) => {
  const res = await candidatesApi.uploadCSV(file);
  return res.data;
});

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCandidates.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchCandidates.rejected, (state, action) => { state.loading = false; state.error = action.error.message || "Failed"; })
      .addCase(createCandidate.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(deleteCandidate.fulfilled, (state, action) => { state.items = state.items.filter(c => c._id !== action.payload); })
      .addCase(uploadPDFs.pending, (state) => { state.uploading = true; })
      .addCase(uploadPDFs.fulfilled, (state) => { state.uploading = false; })
      .addCase(uploadPDFs.rejected, (state, action) => { state.uploading = false; state.error = action.error.message || "Upload failed"; })
      .addCase(uploadCSV.pending, (state) => { state.uploading = true; })
      .addCase(uploadCSV.fulfilled, (state) => { state.uploading = false; })
      .addCase(uploadCSV.rejected, (state, action) => { state.uploading = false; state.error = action.error.message || "Upload failed"; });
  },
});

export const { clearError } = candidatesSlice.actions;
export default candidatesSlice.reducer;
