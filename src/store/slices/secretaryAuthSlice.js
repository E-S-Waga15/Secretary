import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Services/api/axios";

// AsyncThunk لتسجيل الدخول
export const secretaryLogin = createAsyncThunk(
  "secretaryAuth/login",
  async ({ name, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/Secretary_login", {
        name,
        password,
      });

      if (response.data?.success) {
        const token = response.data.data.token;
        // نخزن التوكن في localStorage
        localStorage.setItem("tokenSec", token);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const secretaryAuthSlice = createSlice({
  name: "secretaryAuth",
  initialState: {
    loading: false,
    error: null,
    success: false,
    token: localStorage.getItem("tokenSec") || null,
  },
  reducers: {
    logoutSecretary: (state) => {
      state.success = false;
      state.token = null;
      localStorage.removeItem("tokenSec");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(secretaryLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(secretaryLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.token = action.payload.data?.token || null;
      })
      .addCase(secretaryLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logoutSecretary } = secretaryAuthSlice.actions;
export default secretaryAuthSlice.reducer;
