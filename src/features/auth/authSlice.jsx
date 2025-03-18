import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserAuth } from "./authApi.js";

const initialState = {
  user: null,
  token: localStorage.getItem("userToken") || null,
  isLoading: false,
  isError: false,
  error: "",
};

export const signInUser = createAsyncThunk("auth/signInUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginUserAuth(credentials);

    if (response.token) {
      localStorage.setItem("userToken", response.token);
    }
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSelectedArea(state, action) {
      state.credentials = action.payload;
    },
    logOutUser(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("userToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload?.token || null;
        // Store token in localStorage
        if (action.payload?.token) {
          localStorage.setItem("userToken", action.payload.token);
          
        }
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { setSelectedArea, logOutUser } = authSlice.actions; // Updated to include logOutUser, removed setBranchId which wasn't defined

export default authSlice.reducer;
