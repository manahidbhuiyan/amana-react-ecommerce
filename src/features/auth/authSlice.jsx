import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserAuth, getuserInfo } from "./authApi.js";

const initialState = {
  user: null,
  token: localStorage.getItem("userToken") || null,
  isLoading: false,
  isError: false,
  userInformation: null,
  error: "",
};

// user loggedIn
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

// Load user
export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  const user = await getuserInfo();
  return user.data;
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
      state.userInformation = null;
      localStorage.removeItem("userToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
        state.userInformation = null;
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

    builder
      // Add these new cases for loadUser
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInformation = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { setSelectedArea, logOutUser } = authSlice.actions; 

export default authSlice.reducer;
