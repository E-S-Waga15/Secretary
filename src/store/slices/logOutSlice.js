// src/store/slices/logOutSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../Services/api/axiosInstance';

// Thunk لتسجيل الخروج
export const logoutUser = createAsyncThunk(
  'logout/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/logout');
      if (response.data.success) {
        // تنظيف التخزين المحلي
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        return response.data.message;
      } else {
        return rejectWithValue(response.data.message || 'Logout failed');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Logout error');
    }
  }
);

const logOutSlice = createSlice({
  name: 'logout',
  initialState: {
    successMessage: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default logOutSlice.reducer;
