import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Services/api/axiosInstance';

// Async thunk لجلب المواعيد
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (finished, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/appointments/patient', {
        finished, // false للمواعيد القادمة، true للمكتملة
      });
      return response.data.data; // نعيد فقط مصفوفة البيانات
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    data: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default appointmentsSlice.reducer;
