import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Services/api/axios";

// Async Thunk لإلغاء الموعد
export const cancelAppointment = createAsyncThunk(
  "appointments/cancelAppointment",
  async (appointmentId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/patient/cancel/apointment",
        { Appointment_id: appointmentId }
      );
      return response.data; // { success, message }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to cancel appointment"
      );
    }
  }
);

const cancelAppointmentSlice = createSlice({
  name: "cancelAppointment",
  initialState: {
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    message: null,
  },
  reducers: {
    clearCancelState: (state) => {
      state.status = "idle";
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cancelAppointment.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCancelState } = cancelAppointmentSlice.actions;
export default cancelAppointmentSlice.reducer;
