import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Services/api/axiosInstance";


export const fetchDoctorById = createAsyncThunk(
  "infodoctor/fetchById",
  async (doctorId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/doctors/info/${doctorId}`);
      console.log("Doctor fetched from API:", response.data);
      return response.data.data; // فقط بيانات الطبيب من داخل data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "فشل في جلب معلومات الطبيب"
      );
    }
  }
);

const infodoctorSlice = createSlice({
  name: "infodoctor",
  initialState: {
    infodoctor: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearDoctorInfo: (state) => {
      state.infodoctor = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.loading = false;
        state.infodoctor = action.payload;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDoctorInfo } = infodoctorSlice.actions;
export default infodoctorSlice.reducer;
