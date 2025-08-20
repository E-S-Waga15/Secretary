import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Services/api/axiosInstance';

export const fetchSpecialties = createAsyncThunk(
  'specialties/fetchSpecialties',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/getAllSpecializations');
      return response.data.data;
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch specialties');
    }
  }
);

const specialtySlice = createSlice({
  name: 'specialties',
  initialState: {
    specialties: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecialties.fulfilled, (state, action) => {
        state.loading = false;
        state.specialties = action.payload;
      })
      .addCase(fetchSpecialties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default specialtySlice.reducer;
