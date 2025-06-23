import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utilis/axios";

// Async thunk for fetching hero banners
export const fetchHeroBanners = createAsyncThunk("hero/fetchBanners", async (branchId, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/offer/branch/list/?branch=" + branchId);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch banners");
  }
});

const initialState = {
  banners: [],
  largeBanners: [],
  smallBanners: [],
  loading: false,
  error: null,
};

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearBanners: (state) => {
      state.banners = [];
      state.largeBanners = [];
      state.smallBanners = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;

        // Filter banners by device type (same as Vue version)
        state.largeBanners = action.payload.filter((banner) => banner.device === "large");
        state.smallBanners = action.payload.filter((banner) => banner.device === "small");
      })
      .addCase(fetchHeroBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Keep existing banners if API fails
      });
  },
});

export const { clearError, clearBanners } = heroSlice.actions;
export default heroSlice.reducer;
