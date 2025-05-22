import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../helper/ApiService";
import { toast } from "react-toastify";

const initialState = {
  jobs: [],
  myJobs: [],
  applicants: [],
  selectedJob: null, // ✅ For Job Details page
  applyLoading: false,
  fetchApplicantsLoading: false,
  jobLoading: false,
  error: null,
};

// -------------------- JOB SEEKER: APPLY --------------------
export const applyJob = createAsyncThunk(
  "jobs/applyJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.post(
        `/applications/${jobId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Applied successfully!");
      return response.data;
    } catch (err) {
      const message = err?.response?.data?.message || "Apply failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// -------------------- EMPLOYER: CREATE JOB --------------------
export const createJob = createAsyncThunk(
  "jobs/createjob",
  async (jobData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.post(`/jobs`, jobData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Job created successfully!");
      return response.data.job;
    } catch (err) {
      const message = err?.response?.data?.message || "Job creation failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// -------------------- EMPLOYER: GET OWN JOBS --------------------
export const getOwnJobs = createAsyncThunk(
  "jobs/getOwnJobs",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get(`/jobs/my/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.jobs;
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to fetch your jobs";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// -------------------- EMPLOYER: UPDATE JOB --------------------
export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ id, jobData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.put(`/jobs/${id}`, jobData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Job updated successfully!");
      return response.data.job;
    } catch (err) {
      const message = err?.response?.data?.message || "Job update failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// -------------------- EMPLOYER: DELETE JOB --------------------
export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Job deleted successfully!");
      return id;
    } catch (err) {
      const message = err?.response?.data?.message || "Job deletion failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// -------------------- COMMON: GET ALL JOBS --------------------
export const getAllJobs = createAsyncThunk(
  "jobs/getAllJobs",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get(`/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to load jobs";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// -------------------- EMPLOYER: GET APPLICANTS + JOB --------------------
export const getApplicants = createAsyncThunk(
  "jobs/getApplicants",
  async (jobId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get(`/applications/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {
        job: response.data.job,
        applicants: response.data.applicants,
      };
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to fetch applicants";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearApplicants: (state) => {
      state.applicants = [];
    },
    clearSelectedJob: (state) => {
      state.selectedJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // -------------------- APPLY --------------------
      .addCase(applyJob.pending, (state) => {
        state.applyLoading = true;
        state.error = null;
      })
      .addCase(applyJob.fulfilled, (state) => {
        state.applyLoading = false;
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.applyLoading = false;
        state.error = action.payload;
      })

      // -------------------- GET APPLICANTS + JOB --------------------
      .addCase(getApplicants.pending, (state) => {
        state.fetchApplicantsLoading = true;
        state.error = null;
      })
      .addCase(getApplicants.fulfilled, (state, action) => {
        state.fetchApplicantsLoading = false;
        state.selectedJob = action.payload.job;
        state.jobDetails = action.payload.job;
        state.applicants = action.payload.applicants;
      })
      .addCase(getApplicants.rejected, (state, action) => {
        state.fetchApplicantsLoading = false;
        state.error = action.payload;
      })

      // -------------------- CREATE JOB --------------------
      .addCase(createJob.pending, (state) => {
        state.jobLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.jobLoading = false;
        state.myJobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.jobLoading = false;
        state.error = action.payload;
      })

      // -------------------- GET OWN JOBS --------------------
      .addCase(getOwnJobs.pending, (state) => {
        state.jobLoading = true;
      })
      .addCase(getOwnJobs.fulfilled, (state, action) => {
        state.jobLoading = false;
        state.myJobs = action.payload;
      })
      .addCase(getOwnJobs.rejected, (state, action) => {
        state.jobLoading = false;
        state.error = action.payload;
      })

      // -------------------- GET ALL JOBS --------------------
      .addCase(getAllJobs.pending, (state) => {
        state.jobLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.jobLoading = false;
        state.jobs = action.payload;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.jobLoading = false;
        state.error = action.payload;
      })

      // -------------------- UPDATE JOB --------------------
      .addCase(updateJob.pending, (state) => {
        state.jobLoading = true;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.jobLoading = false;
        const idx = state.myJobs.findIndex(
          (job) => job._id === action.payload._id
        );
        if (idx !== -1) {
          state.myJobs[idx] = action.payload;
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.jobLoading = false;
        state.error = action.payload;
      })

      // -------------------- DELETE JOB --------------------
      .addCase(deleteJob.pending, (state) => {
        state.jobLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobLoading = false;
        state.myJobs = state.myJobs.filter((job) => job._id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.jobLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearApplicants, clearSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
