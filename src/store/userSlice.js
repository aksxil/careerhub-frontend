import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // ================= AUTH =================
  user: null,
  isAuthenticated: false,

  // Student / Employer ko identify karne ke liye
  userType: null, // "student" | "employer" | null

  // ================= UI STATE =================
  loading: false,
  isLoading: false,
  error: null,

  // ================= PUBLIC JOBS =================
  randomJobs: [],
  randomInternships: [],

  // ================= JOB DETAILS =================
  jobDetails: {},

  // ================= INTERNSHIP DETAILS =================
  internshipDetails: {},

  // ================= STUDENT DETAILS =================
  studentDetails: {},

  // ================= SAVED ITEMS =================
  savedJobs: [],
  savedInternships: [],
};

export const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    // =====================================================
    // AUTH
    // =====================================================

    loaduser: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;

        // Detect user type
        if (
          action.payload.role === "employer" ||
          action.payload.role === "employe" ||
          action.payload.userType === "employer"
        ) {
          state.userType = "employer";
        } else {
          state.userType = "student";
        }
      } else {
        state.user = null;
        state.isAuthenticated = false;
        state.userType = null;
      }

      state.loading = false;
      state.isLoading = false;
      state.error = null;
    },

    signout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.userType = null;

      state.loading = false;
      state.isLoading = false;
      state.error = null;

      // Clear cached user-specific data
      state.jobDetails = {};
      state.internshipDetails = {};
      state.studentDetails = {};

      state.savedJobs = [];
      state.savedInternships = [];
    },

    // =====================================================
    // RANDOM JOBS
    // =====================================================

    loadRandomJobs: (state, action) => {
      state.randomJobs = Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    // =====================================================
    // RANDOM INTERNSHIPS
    // =====================================================

    loadRandomInternships: (state, action) => {
      state.randomInternships = Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    // =====================================================
    // JOB DETAILS
    // =====================================================

    loadJobDetails: (state, action) => {
      const { jobId, jobDetails } = action.payload || {};

      if (jobId && jobDetails) {
        state.jobDetails[jobId] = jobDetails;
      }
    },

    setJobDetails: (state, action) => {
      const { jobId, jobDetails } = action.payload || {};

      if (jobId && jobDetails) {
        state.jobDetails[jobId] = jobDetails;
      }
    },

    updateJobDetails: (state, action) => {
      const { jobId, jobDetails } = action.payload || {};

      if (jobId && jobDetails) {
        state.jobDetails[jobId] = jobDetails;
      }
    },

    // Remove cached job details
    removeJobDetails: (state, action) => {
      const jobId = action.payload;

      if (jobId) {
        delete state.jobDetails[jobId];
      }
    },

    // =====================================================
    // INTERNSHIP DETAILS
    // =====================================================

    loadInternshipDetails: (state, action) => {
      const { internshipId, internshipDetails } =
        action.payload || {};

      if (internshipId && internshipDetails) {
        state.internshipDetails[internshipId] =
          internshipDetails;
      }
    },

    updateInternshipDetails: (state, action) => {
      const { internshipId, internshipDetails } =
        action.payload || {};

      if (internshipId && internshipDetails) {
        state.internshipDetails[internshipId] =
          internshipDetails;
      }
    },

    // Remove cached internship details
    removeInternshipDetails: (state, action) => {
      const internshipId = action.payload;

      if (internshipId) {
        delete state.internshipDetails[internshipId];
      }
    },

    // =====================================================
    // STUDENT DETAILS
    // =====================================================

    loadStudentDetails: (state, action) => {
      const { studentId, studentDetails } =
        action.payload || {};

      if (studentId && studentDetails) {
        state.studentDetails[studentId] = studentDetails;
      }
    },

    // Update student details
    updateStudentDetails: (state, action) => {
      const { studentId, studentDetails } =
        action.payload || {};

      if (studentId && studentDetails) {
        state.studentDetails[studentId] = studentDetails;
      }
    },

    // =====================================================
    // SAVED JOBS
    // =====================================================

    fetchSavedJobsSuccess: (state, action) => {
      state.savedJobs = Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    // Add saved job locally
    addSavedJob: (state, action) => {
      const job = action.payload;

      if (!job?._id) return;

      const exists = state.savedJobs.some(
        (item) => item._id === job._id
      );

      if (!exists) {
        state.savedJobs.push(job);
      }
    },

    // Remove saved job locally
    removeSavedJob: (state, action) => {
      const jobId = action.payload;

      state.savedJobs = state.savedJobs.filter(
        (job) => job._id !== jobId
      );
    },

    // =====================================================
    // SAVED INTERNSHIPS
    // =====================================================

    fetchSavedInternshipsSuccess: (state, action) => {
      state.savedInternships = Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    // Add saved internship locally
    addSavedInternship: (state, action) => {
      const internship = action.payload;

      if (!internship?._id) return;

      const exists = state.savedInternships.some(
        (item) => item._id === internship._id
      );

      if (!exists) {
        state.savedInternships.push(internship);
      }
    },

    // Remove saved internship locally
    removeSavedInternship: (state, action) => {
      const internshipId = action.payload;

      state.savedInternships =
        state.savedInternships.filter(
          (internship) => internship._id !== internshipId
        );
    },

    // =====================================================
    // GENERIC SAVED ITEM REMOVE
    // =====================================================

    removeSavedItem: (state, action) => {
      const { itemType, itemId } = action.payload || {};

      if (!itemId) return;

      if (itemType === "job") {
        state.savedJobs = state.savedJobs.filter(
          (job) => job._id !== itemId
        );
      }

      if (itemType === "internship") {
        state.savedInternships =
          state.savedInternships.filter(
            (internship) => internship._id !== itemId
          );
      }
    },

    // =====================================================
    // LOADING
    // =====================================================

    setLoading: (state, action) => {
      state.loading = Boolean(action.payload);
    },

    setIsLoading: (state, action) => {
      state.isLoading = Boolean(action.payload);
    },

    // =====================================================
    // ERROR
    // =====================================================

    setError: (state, action) => {
      state.error = action.payload || null;
    },

    clearError: (state) => {
      state.error = null;
    },

    // =====================================================
    // CLEAR CACHE
    // =====================================================

    clearJobCache: (state) => {
      state.jobDetails = {};
    },

    clearInternshipCache: (state) => {
      state.internshipDetails = {};
    },

    clearStudentCache: (state) => {
      state.studentDetails = {};
    },

    clearSavedItems: (state) => {
      state.savedJobs = [];
      state.savedInternships = [];
    },
  },
});

// =========================================================
// EXPORT ACTIONS
// =========================================================

export const {
  // Auth
  loaduser,
  signout,

  // Random data
  loadRandomJobs,
  loadRandomInternships,

  // Job
  loadJobDetails,
  setJobDetails,
  updateJobDetails,
  removeJobDetails,

  // Internship
  loadInternshipDetails,
  updateInternshipDetails,
  removeInternshipDetails,

  // Student
  loadStudentDetails,
  updateStudentDetails,

  // Saved
  fetchSavedJobsSuccess,
  addSavedJob,
  removeSavedJob,
  fetchSavedInternshipsSuccess,
  addSavedInternship,
  removeSavedInternship,
  removeSavedItem,

  // Loading
  setLoading,
  setIsLoading,

  // Error
  setError,
  clearError,

  // Cache
  clearJobCache,
  clearInternshipCache,
  clearStudentCache,
  clearSavedItems,
} = userSlice.actions;

// =========================================================
// EXPORT REDUCER
// =========================================================

export default userSlice.reducer;