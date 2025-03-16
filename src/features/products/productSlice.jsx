import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from './productApi'

const initialState = {
    newProducts: [],
    specialOffers: [],
    isLoading: false,
    isError: false,
    branchId: null,
    error: "",
}

// Modified to include queryType to differentiate between new products and special offers
export const loadProductData = createAsyncThunk("products/loadProductData",
    async ({ pageNo, branchId, queryString, queryType }) => {
        console.log("pageNo", pageNo)
        console.log("branchId", branchId)
        console.log("queryString", queryString)
        console.log("queryType", queryType)
        const products = await getProducts(pageNo, branchId, queryString);
        return { products, queryType }; // Return both the products and the query type
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setNewProducts(state, action) {
            state.newProducts = action.payload;
        },
        setSpecialOffers(state, action){
            state.specialOffers = action.payload
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
                
                // Check the query type and update the appropriate state
                if (action.payload.queryType === 'newProduct') {
                    state.newProducts = action.payload.products;
                } else if (action.payload.queryType === 'specialOffer') {
                    state.specialOffers = action.payload.products;
                }
            })
            .addCase(loadProductData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export const { setNewProducts, setSpecialOffers } = productSlice.actions;
export default productSlice.reducer;