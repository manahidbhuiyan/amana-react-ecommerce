import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategoryData, getProductCategoryData } from "./categoriesApi";

const initialState = {
    CategoriesData: [],
    ProductCategoryData: [],
    isLoading: false,
    isError: false,
    branchId: null,
    error: "",
};

// New products and Special offers
export const loadCategoryData = createAsyncThunk("categories/loadCategoryData", async ({ branchId }) => {
    const CategoriesData = await getCategoryData(branchId);
   
    const sortedData = CategoriesData.info.sort((a, b) => {
        return a.category.cust_ser - b.category.cust_ser;
    });
    
    return sortedData;
});

export const loadProductCategoryData = createAsyncThunk("categories/loadProductCategoryData", async ({ type, slug }) => {
    const ProductCategoryData = await getProductCategoryData(type, slug);
    return ProductCategoryData;
});

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategoriesData(state, action) {
            state.CategoriesData = action.payload
        },
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
            // Multiple products loading
            .addCase(loadCategoryData.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(loadCategoryData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.CategoriesData = action.payload;
            })
            .addCase(loadCategoryData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            // single product loading
            .addCase(loadProductCategoryData.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(loadProductCategoryData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ProductCategoryData = action.payload;
            })
            .addCase(loadProductCategoryData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export const { setCategoriesData, setProductCategoryData, setLoading, clearError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
