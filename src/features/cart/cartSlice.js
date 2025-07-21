import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProductOnCart } from './cartApi'

const initialState = {
    CartInformation: [],
    localCartProducts: [],
    isLoading: false,
    isError: false,
    branchId: null,
    error: "",
}

// New products and Special offers
export const addToCart = createAsyncThunk("cart/addToCart", async ({ code, branchId }) => {
    const products = await addProductOnCart(code, branchId);
    return products;
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

        addToLocalCart(state, action) {
            const product = action.payload

            // Get existing products from localStorage first
            const existingCartProducts = JSON.parse(localStorage.getItem("localCartProduct")) || [];

            // Check if product already exists (by _id)
            const isProductExists = existingCartProducts.some(item => item._id === product._id);

            if (!isProductExists) {
                // Add to localStorage first
                existingCartProducts.push(product);
                localStorage.setItem("localCartProduct", JSON.stringify(existingCartProducts));

                // Then update Redux state
                state.localCartProducts = existingCartProducts;
            }

        },
        // Load from localStorage to Redux (for app initialization)
        loadLocalCartProducts(state) {
            const existingCartProducts = JSON.parse(localStorage.getItem("localCartProduct")) || [];
            state.localCartProducts = existingCartProducts;
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
                state.isLoading = false;
                // state.CartInformation = action.payload;

                const product = action.payload

                // Get existing products from localStorage first
                const existingCartProducts = JSON.parse(localStorage.getItem("CartProduct")) || [];

                // Check if product already exists (by _id)
                const isProductExists = existingCartProducts.some(item => item._id === product._id);

                if (!isProductExists) {
                    // Add to localStorage first
                    existingCartProducts.push(product);
                    localStorage.setItem("CartProduct", JSON.stringify(existingCartProducts));

                    // Then update Redux state
                    state.CartProducts = existingCartProducts;
                }
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
    },
})

export const { setCartInformation, setLoading, clearError, addToLocalCart, loadLocalCartProducts } = cartSlice.actions;

export default cartSlice.reducer;


