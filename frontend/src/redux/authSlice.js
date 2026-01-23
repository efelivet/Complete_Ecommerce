 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {API} from "../api";

/* ================= REGISTER USER ================= */
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, password, email }, { rejectWithValue }) => {
    try {
      const res = await API.post("/register", {
        username,
        password,
        email,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

/* ================= Login USER ================= */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await API.post(
        "/login",
        { username, password},
        { withCredentials: true } 
      );

      return res.data; // { message, user, token }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Invalid credentials"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
     user: null,
    token: null,
    loading: false,
    success: null,
    error: null,
  },

  
  reducers: {
     logout: (state) => {
      state.user = null;
      state.token = null;
      state.success = null;
      state.error = null;
    },
    clearAuthState: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = "Registration successful";
      })

      /* ---------- ERROR ---------- */
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

         /* ===== LOGIN ===== */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message; // "Login successful"
        state.user = action.payload.user;       // { username, isAdmin, email }
        state.token = action.payload.token;     // JWT token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }); 
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
