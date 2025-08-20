// src/store/slices/onDutyDoctorsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Services/api/axios";

// Async thunk لجلب الأطباء المداومين اليوم
export const fetchOnDutyDoctors = createAsyncThunk(
  "onDutyDoctors/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/doctorsWorkingToday");
      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message || "Failed to fetch doctors.");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const onDutyDoctorsSlice = createSlice({
  name: "onDutyDoctors",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOnDutyDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOnDutyDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOnDutyDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default onDutyDoctorsSlice.reducer;
