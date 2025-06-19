import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "../api/allCategoriesApi";

const initialState = {
  categories: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const fetchBranches = createAsyncThunk("categories/allCategories", async () => {
  const allCategories = await getAllCategories();
  return allCategories;
});

const allCategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // Reducer to set selected area
    setCategories(state, action) {
      state.categories = action.payload;
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
        state.categories = action.payload;
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
export const { setSelectedArea, setBranchId, setSelectedBranch } = locationSlice.actions;

export default locationSlice.reducer;
