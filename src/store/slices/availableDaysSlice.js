// src/store/slices/availableDaysSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Services/api/axiosInstance";

export const fetchAvailableDays = createAsyncThunk(
  "availableDays/fetch",
  async ({ doctorId, date }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/patient/book/apointment", {
        doctor_id: doctorId,
        date: date,
      });
      return response.data.data.available_day;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch available days."
      );
    }
  }
);

const availableDaysSlice = createSlice({
  name: "availableDays",
  initialState: {
    days: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAvailableDays: (state) => {
      state.days = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableDays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableDays.fulfilled, (state, action) => {
        state.loading = false;
        state.days = action.payload
        .filter((d) => d.isAvailable && typeof d.date === "string")
        .map((d) => d.date);
      
      })
      .addCase(fetchAvailableDays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAvailableDays } = availableDaysSlice.actions;
export default availableDaysSlice.reducer;
