import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// to check if user is logged in
export const checkUserSession = createAsyncThunk(
  "auth/checkSession",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/auth/me`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Session expired or invalid");
    }
  }
);

//signup user
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/register`,
        userData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/login`,
        userData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//logout user
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post(
        `${BASE_URL}/api/v1/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

//authSlice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.firstLoginQuestions = action.payload.firstLoginQuestions || [];
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(checkUserSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export default authSlice.reducer;
