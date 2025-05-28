import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts, getSingleProduct } from "./productApi";

const initialState = {
  newProducts: [],
  specialOffers: [],
  singleProduct: null,
  isLoading: false,
  isError: false,
  branchId: null,
  error: "",
};

// New products and Special offers
export const loadProductData = createAsyncThunk("products/loadProductData", async ({ pageNo, branchId, queryString, queryType }) => {
  const products = await getProducts(pageNo, branchId, queryString);
  return { products, queryType };
});

export const loadProductSingleData = createAsyncThunk("products/singleProductData", async ({ slug, branchId, barcode }) => {
  const singleProduct = await getSingleProduct(slug, branchId, barcode);
  console.log("singleProduct",singleProduct)
  return singleProduct ;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setNewProducts(state, action) {
      state.newProducts = action.payload;
    },
    setSpecialOffers(state, action) {
      state.specialOffers = action.payload;
    },
    setSingleProduct(state, action) {
      state.singleProduct = action.payload;
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
      .addCase(loadProductData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(loadProductData.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.queryType === "newProduct") {
          state.newProducts = action.payload.products;
        } else if (action.payload.queryType === "specialOffer") {
          state.specialOffers = action.payload.products;
        }
      })
      .addCase(loadProductData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      // single product loading
      .addCase(loadProductSingleData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(loadProductSingleData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleProduct = action.payload
      })
      .addCase(loadProductSingleData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export const { setNewProducts, setSpecialOffers, setSingleProduct, setLoading, clearError } = productSlice.actions;
export default productSlice.reducer;
