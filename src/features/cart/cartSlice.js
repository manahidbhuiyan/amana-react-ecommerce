import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProductOnCart, resetCart } from './cartApi'

const initialState = {
    isCartOpen: false,
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

// cart reset
export const clearAllCart = createAsyncThunk("cart/clearAllCart", async () => {
    const products = await resetCart(localStorage.branchId)
    console.log("products", products)
    return products;
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartInformation(state) {
            const existingCartProducts = JSON.parse(localStorage.getItem("CartProduct")) || [];
            state.CartInformation = existingCartProducts;
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        clearError(state) {
            state.isError = false;
            state.error = "";
        },
        openCartModule(state) {
            state.isCartOpen = true;
        },
        closeCartModule(state) {
            state.isCartOpen = false;
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
                state.CartInformation = existingCartProducts;
            }

        },
        // Load from localStorage to Redux (for app initialization)
        loadLocalCartProducts(state) {
            const existingCartProducts = JSON.parse(localStorage.getItem("localCartProduct")) || [];
            state.CartInformation = existingCartProducts;
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
                const productsArray = action.payload;

                // Get existing products from localStorage
                const existingCartProducts = JSON.parse(localStorage.getItem("CartProduct")) || [];

                productsArray.forEach(product => {
                    const isProductExists = existingCartProducts.some(item => item._id === product._id);

                    if (!isProductExists) {
                        const modifiedProduct = {
                            ...product,
                            maxQuantity: product.quantity,
                            quantity: 1
                        };
                        existingCartProducts.push(modifiedProduct);
                    }
                });

                localStorage.setItem("CartProduct", JSON.stringify(existingCartProducts));
                state.CartInformation = existingCartProducts;

            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            // cart reset loading
            .addCase(clearAllCart.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(clearAllCart.fulfilled, (state, action) => {
                console.log("state.CartInformation before")
                state.isLoading = false;
                console.log("action.payload", action.payload)
                if (!action.payload.data.msg) {
                    state.CartInformation = action.payload
                } else {
                    state.CartInformation = action.payload

                    localStorage.removeItem("CartProduct");
                    localStorage.removeItem("localCartProduct");
                }
                // state.CartInformation = action.payload;
                // console.log("state.CartInformation after", state.CartInformation)
                // localStorage.removeItem("CartProduct");
            })
            .addCase(clearAllCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            });
    },
})

export const { setCartInformation, setLoading, clearError, addToLocalCart, loadLocalCartProducts, openCartModule, closeCartModule } = cartSlice.actions;

export default cartSlice.reducer;


