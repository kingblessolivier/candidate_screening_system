import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Job } from "@/types";
import { jobsApi } from "@/lib/api";

interface JobsState {
  items: Job[];
  selected: Job | null;
  loading: boolean;
  error: string | null;
}

const initialState: JobsState = { items: [], selected: null, loading: false, error: null };

export const fetchJobs = createAsyncThunk("jobs/fetchAll", async () => {
  const res = await jobsApi.getAll();
  return res.data.data as Job[];
});

export const fetchJob = createAsyncThunk("jobs/fetchOne", async (id: string) => {
  const res = await jobsApi.getOne(id);
  return res.data.data as Job;
});

export const createJob = createAsyncThunk("jobs/create", async (data: Partial<Job>) => {
  const res = await jobsApi.create(data);
  return res.data.data as Job;
});

export const updateJob = createAsyncThunk("jobs/update", async ({ id, data }: { id: string; data: Partial<Job> }) => {
  const res = await jobsApi.update(id, data);
  return res.data.data as Job;
});

export const deleteJob = createAsyncThunk("jobs/delete", async (id: string) => {
  await jobsApi.delete(id);
  return id;
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setSelected: (state, action) => { state.selected = action.payload; },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchJobs.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchJobs.rejected, (state, action) => { state.loading = false; state.error = action.error.message || "Failed"; })
      .addCase(fetchJob.fulfilled, (state, action) => { state.selected = action.payload; })
      .addCase(createJob.fulfilled, (state, action) => { state.items.unshift(action.payload); })
      .addCase(updateJob.fulfilled, (state, action) => {
        const idx = state.items.findIndex(j => j._id === action.payload._id);
        if (idx >= 0) state.items[idx] = action.payload;
        if (state.selected?._id === action.payload._id) state.selected = action.payload;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.items = state.items.filter(j => j._id !== action.payload);
        if (state.selected?._id === action.payload) state.selected = null;
      });
  },
});

export const { setSelected, clearError } = jobsSlice.actions;
export default jobsSlice.reducer;
