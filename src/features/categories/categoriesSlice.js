import { createSlice } from "@reduxjs/toolkit";
import { categoriesApi } from "./categoriesApi";

const initialState = {
    // CategoriesData: [],
    ProductCategoryData: [],
    isLoading: false,
    isError: false,
    branchId: null,
    error: "",
};


const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        // setCategoriesData(state, action) {
        //     state.CategoriesData = action.payload
        // },
        setProductCategoryData(state, action) {
            state.ProductCategoryData = action.payload;
        },
        // Loading state manually control করার জন্য
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        clearError(state) {
            state.isError = false;
            state.error = "";
        },
    },

    extraReducers: (builder) => {
        builder
            // Handle categiry product with RTK Query
            .addMatcher(
                categoriesApi.endpoints.getProductCategory.matchPending,
                (state) => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                categoriesApi.endpoints.getProductCategory.matchFulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.userInformation = action.payload;
                }
            )
            .addMatcher(
                categoriesApi.endpoints.getProductCategory.matchRejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.error = action.error.message || "Failed to load user info";
                }
            );
    }
});

export const { setCategoriesData, setProductCategoryData, setLoading, clearError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
