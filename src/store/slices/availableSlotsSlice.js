// availableSlotsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Services/api/axiosInstance";

export const fetchAvailableSlots = createAsyncThunk(
  "availableSlots/fetch",
  async ({ doctorId, date }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/patient/book/apointment1", {
        doctor_id: doctorId,
        date: date,
      });
      return response.data.data.available_slots;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch available slots."
      );
    }
  }
);

const availableSlotsSlice = createSlice({
  name: "availableSlots",
  initialState: {
    slots: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAvailableSlots: (state) => {
      state.slots = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.slots = action.payload;
        state.loading = false;
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAvailableSlots } = availableSlotsSlice.actions;
export default availableSlotsSlice.reducer;
