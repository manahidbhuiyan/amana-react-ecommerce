import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi.js";

const initialState = {
  user: null,
  token: localStorage.getItem("userToken") || null,
  isLoading: false,
  isError: false,
  userInformation: null,
  error: "",
};

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
      state.userInformation = null;
      localStorage.removeItem("userToken");
    },
    clearError(state) {
      state.error = "";
      state.isError = false;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login with RTK Query
      .addMatcher(
        authApi.endpoints.loginUser.matchPending,
        (state) => {
          state.isLoading = true;
          state.isError = false;
          state.error = "";
        }
      )
      .addMatcher(
        authApi.endpoints.loginUser.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
          state.token = action.payload?.token || null;
          state.isError = false;
          state.error = "";
        }
      )
      .addMatcher(
        authApi.endpoints.loginUser.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.error.message || "Login failed";
        }
      )

    // Handle getUserInfo with RTK Query
      .addMatcher(
        authApi.endpoints.getUserInfo.matchPending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        authApi.endpoints.getUserInfo.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.userInformation = action.payload;
        }
      )
      .addMatcher(
        authApi.endpoints.getUserInfo.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.error.message || "Failed to load user info";
        }
      );
  },
});

export const { setSelectedArea, logOutUser, clearError, setToken } = authSlice.actions; 

export default authSlice.reducer;