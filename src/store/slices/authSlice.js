import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Services/api/axiosInstance';

export const requestOtp = createAsyncThunk(
  'auth/requestOtp',
  async (phoneNumber, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/requestOtp', {
        number: phoneNumber,
      });
      if (response.data.success) {
        return {
          phoneNumber,
          expiresIn: response.data.data.expires_in,
        };
      } else {
        return rejectWithValue('Failed to send OTP');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Request failed');
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ number, otp }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/verify', { number, otp });
      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue('OTP verification failed');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Verification failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    phoneNumber: null,
    otpSent: false,
    expiresIn: null,
    token: null,
    isLoggedIn: false,
    filledData: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearAuth: (state) => {
      state.phoneNumber = null;
      state.otpSent = false;
      state.expiresIn = null;
      state.token = null;
      state.isLoggedIn = false;
      state.filledData = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.phoneNumber = action.payload.phoneNumber;
        state.expiresIn = action.payload.expiresIn;
        state.otpSent = true;
      })
      .addCase(requestOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.otpSent = false;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.filledData = action.payload.filled_data;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('isLoggedIn', state.isLoggedIn);
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;