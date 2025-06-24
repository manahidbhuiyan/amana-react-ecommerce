import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts, getSingleProduct } from "./productApi";

const initialState = {
  newProducts: [],
  specialOffers: [],
  productList: {
    data: [],
    count: 0,
  },
  productInformation: [],
  singleProduct: null,
  isLoading: false,
  isError: false,
  branchId: null,
  error: "",
};

// New products and Special offers
export const loadProductData = createAsyncThunk("products/loadProductData", async ({ pageNo, branchId, queryString, queryType }) => {
  const products = await getProducts(pageNo, branchId, queryString);
  return { products, queryType, pageNo };
});

export const loadProductSingleData = createAsyncThunk("products/singleProductData", async ({ slug, branchId, barcode }) => {
  const singleProduct = await getSingleProduct(slug, branchId, barcode);
  return singleProduct;
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
    pushProductInformation: (state, action) => {
      // Properly append new products to existing data array
      if (state.productList.data) {
        state.productList.data.push(...action.payload);
      } else {
        state.productList.data = action.payload;
      }
    },
    clearProductList: (state) => {
      state.productList = {
        data: [],
        count: 0,
      };
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
        } else {
          // For the first page, replace the data
          if (action.payload.pageNo === 1) {
            state.productList = {
              data: action.payload.products.data || action.payload.products,
              count: action.payload.products.count || 0,
            };
          } else {
            // For subsequent pages, append new products to existing data
            const newProducts = action.payload.products.data || action.payload.products;
            if (state.productList.data && newProducts) {
              state.productList.data.push(...newProducts);
            }
            // Update count if provided
            if (action.payload.products.count !== undefined) {
              state.productList.count = action.payload.products.count;
            }
          }
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
        state.singleProduct = action.payload;
      })
      .addCase(loadProductSingleData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export const { setNewProducts, setSpecialOffers, setSingleProduct, pushProductInformation, clearProductList, setLoading, clearError } = productSlice.actions;

export default productSlice.reducer;
