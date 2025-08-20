// src/store/slices/fillDataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../Services/api/axiosInstance';

export const submitPatientData = createAsyncThunk(
  'fillData/submitPatientData',
  async (formData, thunkAPI) => {
    try {
      const payload = {
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        mother_name: formData.motherName,
        birth_day: formData.birthdate.toISOString().split('T')[0], // YYYY-MM-DD
        national_number: formData.nationalNumber,
        gender: formData.gender,
      };
      const response = await axios.post('/patient', payload);
      return {
        success: true,
        message: response.data.message,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: 'Something went wrong' });
    }
  }
);

const fillDataSlice = createSlice({
  name: 'fillData',
  initialState: {
    firstName: '',
    lastName: '',
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitPatientData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitPatientData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        localStorage.setItem('user', JSON.stringify({ name: `${action.payload.firstName} ${action.payload.lastName}` }));
      })
      .addCase(submitPatientData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default fillDataSlice.reducer;
