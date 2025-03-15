import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from './productApi'

const initialState = {
    newProducts: [],  // ✅ Make sure this exists
    specialProducts: [],
    isLoading: false,
    isError: false,
    branchId: null,
    error: "",
}

export const loadProductData = createAsyncThunk("products/loadProductData",
    async ({ pageNo, branchId, queryString }) => {
        console.log("pageNo",pageNo)
        console.log("branchId",branchId)
        const products = await getProducts(pageNo, branchId, queryString);
        return products; // Returning data directly
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setNewProducts(state, action) {
            state.newProducts = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadProductData.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(loadProductData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.newProducts = action.payload; // Fixed state update
            })
            .addCase(loadProductData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.newProducts = [];
                state.error = action.error?.message;
            });
    },
});

export const { setNewProducts } = productSlice.actions;
export default productSlice.reducer;