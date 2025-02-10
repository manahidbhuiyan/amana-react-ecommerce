import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocations } from "./locationsAPI";

const initialState = {
  branches: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const fetchBranches = createAsyncThunk("locations/fetchBranches", async () => {
  const locations = await getLocations();
  return locations;
});

const locationSlice = createSlice({
  name: "locations",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.branches = [];
        state.error = action.error?.message;
      });
  },
});

export default locationSlice.reducer;
