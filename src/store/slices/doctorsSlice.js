import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Services/api/axiosInstance';


export const fetchDoctorsBySpecialty = createAsyncThunk(
  'doctors/fetchBySpecialty',
  async (specialtyId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/doctors/by_specialization/${specialtyId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch doctors');
    }
  }
);

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: {
    doctors: [],
    loading: false,
    error: null
  },
  reducers: {
    clearDoctors: (state) => {
      state.doctors = [];
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorsBySpecialty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorsBySpecialty.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctorsBySpecialty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearDoctors } = doctorsSlice.actions;

export default doctorsSlice.reducer;
