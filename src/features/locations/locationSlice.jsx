import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocations } from "./locationsAPI";

const initialState = {
  branches: [],
  isLoading: false,
  isError: false,
  selectedArea: "",
  branchId: null,
  error: "",
};

export const fetchBranches = createAsyncThunk("locations/fetchBranches", async () => {
  const locations = await getLocations();
  return locations;
});

const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    // Reducer to set selected area
    setSelectedArea(state, action) {
      state.selectedArea = action.payload;
    },
    // Reducer to set selected branchId
    setBranchId(state, action) {
      state.branchId = action.payload;
    },
  },
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

// Export actions
export const { setSelectedArea, setBranchId } = locationSlice.actions;

export default locationSlice.reducer;
