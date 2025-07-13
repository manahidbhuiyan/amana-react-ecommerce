import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProductOnCart } from './cartApi'

const initialState = {
    CartInformation: [],
    isLoading: false,
    isError: false,
    branchId: null,
    error: "",
}

// New products and Special offers
export const addToCart = createAsyncThunk("cart/addToCart", async ({ code, branchId }) => {
    const cartProducts = await addProductOnCart(code, branchId);
    console.log("cartProducts",cartProducts)
    return cartProducts;
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartInformation(state, action) {
            state.CartInformation = action.payload;
        },
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
          .addCase(addToCart.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
          })
          .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.CartInformation = action.payload;
          })
          .addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
          })
      },
})

export const { setCartInformation, setLoading, clearError } = cartSlice.actions;

export default cartSlice.reducer;


