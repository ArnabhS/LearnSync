import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// to check if user is logged in
export const checkUserSession = createAsyncThunk(
  "auth/checkSession",
  async (_, { getState }) => {
    const token = getState().auth.token || localStorage.getItem("token");

    if (token) {
      const response = await axios.get(`${BASE_URL}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    }
  }
);

//signup user
export const signupUser = createAsyncThunk("auth/signup", async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/register`,
      userData
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

//login user
export const loginUser = createAsyncThunk("auth/login", async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/auth/login`,
      userData
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

//logout user
// export const logoutUser = createAsyncThunk(
//   "auth/logout",
//   async (_, thunkAPI) => {
//     try {
//       await axios.post(
//         `${BASE_URL}/api/v1/auth/logout`,
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       return null;
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Logout failed");
//     }
//   }
// );

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

//authSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      (state.user = null), (state.token = null);
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(checkUserSession.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
