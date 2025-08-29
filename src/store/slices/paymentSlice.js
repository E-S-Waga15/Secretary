// src/store/slices/paymentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Services/api/axios";

// ✅ API لدفع موعد
export const payAppointment = createAsyncThunk(
  "payment/payAppointment",
  async (appointmentId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/appointments/${appointmentId}/pay`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "خطأ أثناء الدفع");
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(payAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(payAppointment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(payAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
