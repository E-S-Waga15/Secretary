import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Services/api/axiosInstance';


export const bookAppointment = createAsyncThunk(
  'appointment/bookAppointment',
  async ({ doctor_id, date, start_time }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/patient/book/apointment2', {
        doctor_id,
        date,
        start_time,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Booking failed.' });
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    loading: false,
    successMessage: '',
    error: '',
  },
  reducers: {
    clearAppointmentState: (state) => {
      state.loading = false;
      state.successMessage = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.successMessage = '';
        state.error = '';
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearAppointmentState } = appointmentSlice.actions;

export default appointmentSlice.reducer;
