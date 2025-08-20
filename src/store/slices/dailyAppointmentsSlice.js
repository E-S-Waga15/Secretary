import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Services/api/axios";

// AsyncThunk لجلب المواعيد اليومية
export const fetchDailyAppointments = createAsyncThunk(
  "appointments/fetchDaily",
  async ({ date, finished = false }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/appointments/secretary", {
        date,
        finished,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch appointments");
    }
  }
);

const dailyAppointmentsSlice = createSlice({
  name: "dailyAppointments",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
      })
      .addCase(fetchDailyAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default dailyAppointmentsSlice.reducer;
