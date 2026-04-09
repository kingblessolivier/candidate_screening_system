import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ScreeningResult } from "@/types";
import { screeningApi } from "@/lib/api";

interface ScreeningState {
  results: ScreeningResult[];
  current: ScreeningResult | null;
  loading: boolean;
  running: boolean;
  error: string | null;
}

const initialState: ScreeningState = {
  results: [],
  current: null,
  loading: false,
  running: false,
  error: null,
};

export const runScreening = createAsyncThunk(
  "screening/run",
  async ({ jobId, candidateIds, shortlistSize }: { jobId: string; candidateIds?: string[]; shortlistSize?: number }) => {
    const res = await screeningApi.run(jobId, candidateIds, shortlistSize);
    return res.data.data as ScreeningResult;
  }
);

export const fetchScreeningResults = createAsyncThunk("screening/fetchAll", async (jobId?: string) => {
  const res = await screeningApi.getAll(jobId);
  return res.data.data as ScreeningResult[];
});

export const fetchScreeningResult = createAsyncThunk("screening/fetchOne", async (id: string) => {
  const res = await screeningApi.getOne(id);
  return res.data.data as ScreeningResult;
});

export const fetchLatestForJob = createAsyncThunk("screening/fetchLatest", async (jobId: string) => {
  const res = await screeningApi.getLatestForJob(jobId);
  return res.data.data as ScreeningResult;
});

const screeningSlice = createSlice({
  name: "screening",
  initialState,
  reducers: {
    setCurrent: (state, action) => { state.current = action.payload; },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runScreening.pending, (state) => { state.running = true; state.error = null; })
      .addCase(runScreening.fulfilled, (state, action) => {
        state.running = false;
        state.current = action.payload;
        state.results.unshift(action.payload);
      })
      .addCase(runScreening.rejected, (state, action) => {
        state.running = false;
        state.error = action.error.message || "Screening failed";
      })
      .addCase(fetchScreeningResults.pending, (state) => { state.loading = true; })
      .addCase(fetchScreeningResults.fulfilled, (state, action) => { state.loading = false; state.results = action.payload; })
      .addCase(fetchScreeningResults.rejected, (state, action) => { state.loading = false; state.error = action.error.message || "Failed"; })
      .addCase(fetchScreeningResult.fulfilled, (state, action) => { state.current = action.payload; })
      .addCase(fetchLatestForJob.fulfilled, (state, action) => { state.current = action.payload; });
  },
});

export const { setCurrent, clearError } = screeningSlice.actions;
export default screeningSlice.reducer;
