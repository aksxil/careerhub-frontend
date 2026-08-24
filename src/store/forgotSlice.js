import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,

  reducers: {
    // ================= REQUEST =================
    forgotPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },

    // ================= SUCCESS =================
    forgotPasswordSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },

    // ================= FAILURE =================
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
      state.success = false;
    },

    // ================= RESET =================
    resetForgotPasswordState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

// ================= ACTIONS =================

export const {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetForgotPasswordState,
} = forgotPasswordSlice.actions;

// ================= REDUCER =================

export default forgotPasswordSlice.reducer;