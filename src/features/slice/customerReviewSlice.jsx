import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utilis/axios";

// Fixed async thunk - parameter signature was wrong
export const fetchCustomeReviews = createAsyncThunk(
  "testimonial/fetchCustomerReviews", 
  async (_, { rejectWithValue }) => { // First parameter should be _ or actual params
    try {
      console.log("Making API request...");
      const response = await axios.get("/api/clientreview/items");
      console.log("API response:", response);
      
      // Return response.data, not full response
      return response.data.data || response.data; // Adjust based on your API structure
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch Customer Reviews");
    }
  }
);

const initialState = {
  customerReview: [],
  loading: false,
  error: null,
};

const customerReviewSlice = createSlice({
  name: "customerReview",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearReviews: (state) => {
      state.customerReview = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomeReviews.pending, (state) => {
        console.log("Redux: Loading started");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomeReviews.fulfilled, (state, action) => {
        console.log("Redux: Data received", action.payload);
        state.loading = false;
        state.customerReview = action.payload;
      })
      .addCase(fetchCustomeReviews.rejected, (state, action) => {
        console.log("Redux: Error occurred", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearReviews } = customerReviewSlice.actions;
export default customerReviewSlice.reducer;