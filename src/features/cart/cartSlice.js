import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProductOnCart, resetCart, updateProductQuantity } from './cartApi'

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

// Update cart quantity for logged in users
export const updateCartQuantity = createAsyncThunk("cart/updateCartQuantity", async ({ productId, quantity, maxQuantity, branchId }) => {
    const result = await updateProductQuantity(productId, quantity, maxQuantity, branchId || localStorage.branchId);
    console.log("result")
    return { productId, quantity, result };
})

// cart reset
export const clearAllCart = createAsyncThunk("cart/clearAllCart", async () => {
    const products = await resetCart(localStorage.branchId)
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
            const existingCartProducts = JSON.parse(localStorage.getItem("localCartProduct")) || [];
            const isProductExists = existingCartProducts.some(item => item._id === product._id);
            if (!isProductExists) {
                const newProduct = {
                    ...product,
                    maxQuantity: product.quantity,
                    quantity: 1
                };
                existingCartProducts.push(newProduct);
                localStorage.setItem("localCartProduct", JSON.stringify(existingCartProducts));
                state.CartInformation = existingCartProducts;
            }
        },
        // Update local cart quantity for guest users
        updateCartQuantity(state, action) {
            const { productId, quantity } = action.payload;
            const existingCartProducts = JSON.parse(localStorage.getItem("localCartProduct")) || [];

            const updatedCartProducts = existingCartProducts.map(item => {
                if (item._id === productId) {
                    return {
                        ...item,
                        quantity: quantity
                    };
                }
                return item;
            });
            localStorage.setItem("localCartProduct", JSON.stringify(updatedCartProducts));
            state.CartInformation = updatedCartProducts;
        },
        // Remove from local cart
        removeFromLocalCart(state, action) {
            const productId = action.payload;
            const existingCartProducts = JSON.parse(localStorage.getItem("localCartProduct")) || [];

            const filteredCartProducts = existingCartProducts.filter(item => item._id !== productId);

            localStorage.setItem("localCartProduct", JSON.stringify(filteredCartProducts));
            state.CartInformation = filteredCartProducts;
        },
        // Load from localStorage to Redux (for app initialization)
        loadLocalCartProducts(state) {
            const existingCartProducts = JSON.parse(localStorage.getItem("localCartProduct")) || [];
            state.CartInformation = existingCartProducts;
        },
        // Sync cart data after login
        syncCartAfterLogin(state) {
            const localCartProducts = JSON.parse(localStorage.getItem("localCartProduct")) || [];
            const serverCartProducts = JSON.parse(localStorage.getItem("CartProduct")) || [];

            // Merge local cart with server cart (you can customize this logic)
            const mergedCart = [...serverCartProducts];

            localCartProducts.forEach(localProduct => {
                const existsInServerCart = serverCartProducts.some(serverProduct =>
                    serverProduct._id === localProduct._id
                );

                if (!existsInServerCart) {
                    mergedCart.push(localProduct);
                }
            });

            localStorage.setItem("CartProduct", JSON.stringify(mergedCart));
            localStorage.removeItem("localCartProduct"); // Clear local cart after sync
            state.CartInformation = mergedCart;
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
                const productsArray = action.payload.data || action.payload;

                // Get existing products from localStorage
                const existingCartProducts = JSON.parse(localStorage.getItem("CartProduct")) || [];

                productsArray.forEach(product => {
                    const isProductExists = existingCartProducts.some(item => item._id === product._id);

                    if (!isProductExists) {
                        const modifiedProduct = {
                            ...product,
                            maxQuantity: product.maxQuantity ? product.maxQuantity : product.quantity ,
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
            // update qunatity
            .addCase(updateCartQuantity.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                const { productId, quantity } = action.payload;

                // Update in localStorage
                const existingCartProducts = JSON.parse(localStorage.getItem("CartProduct")) || [];
                const updatedCartProducts = existingCartProducts.map(item => {
                    if (item._id === productId) {
                        return {
                            ...item,
                            quantity: quantity
                        };
                    }
                    return item;
                });

                localStorage.setItem("CartProduct", JSON.stringify(updatedCartProducts));
                state.CartInformation = updatedCartProducts;

            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
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
                const responseData = action.payload.data || action.payload

                if (responseData.msg === 'cart is empty') {
                    state.CartInformation = [];
                    localStorage.removeItem("CartProduct");
                }
                else if (responseData.msg === 'No token, authorization denied') {
                    state.CartInformation = [];
                    localStorage.removeItem("localCartProduct");
                } else {
                    // If data is array, use it; otherwise empty array
                    state.CartInformation = Array.isArray(responseData) ? responseData : [];
                }
            })
            .addCase(clearAllCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            });
    },
})

export const { setCartInformation, setLoading, clearError, addToLocalCart, updateLocalCartQuantity, removeFromLocalCart, loadLocalCartProducts, openCartModule, closeCartModule, syncCartAfterLogin } = cartSlice.actions;

export default cartSlice.reducer;


