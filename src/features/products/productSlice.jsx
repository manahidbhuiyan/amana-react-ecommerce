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

// Function to transform product data before storing in Redux
const transformProductData = (product) => {
  const transformedProduct = { ...product };
  // If maxQuantity doesn't exist, set it equal to quantity
  if (transformedProduct.maxQuantity === undefined) {
    transformedProduct.maxQuantity = transformedProduct.quantity;
  }
  // Set quantity to 1
  transformedProduct.quantity = 1;
  return transformedProduct;
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
      state.newProducts = action.payload.map(transformProductData);
    },
    setSpecialOffers(state, action) {
      state.specialOffers = action.payload.map(transformProductData);
    },
    setSingleProduct(state, action) {
      state.singleProduct = transformProductData(action.payload);
    },
    pushProductInformation: (state, action) => {
      const transformedProducts = action.payload.map(transformProductData);

      // Properly append new products to existing data array
      if (state.productList.data) {
        state.productList.data.push(...transformedProducts);
      } else {
        state.productList.data = transformedProducts;
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
          const productsData = action.payload.products.data || action.payload.products;
          const transformedProducts = Array.isArray(productsData) ? productsData.map(transformProductData) : [];
          const count = action.payload.products.count || (Array.isArray(productsData) ? productsData.length : 0);

          const allProduct = {
            data: transformedProducts,
            count: count,
          };
          state.newProducts = allProduct;
        } else if (action.payload.queryType === "specialOffer") {
          const productsData = action.payload.products.data || action.payload.products;
          const transformedProducts = Array.isArray(productsData) ? productsData.map(transformProductData) : [];
          const count = action.payload.products.count || (Array.isArray(productsData) ? productsData.length : 0);

          const allProduct = {
            data: transformedProducts,
            count: count,
          };

          state.specialOffers = allProduct;
        } else {
          // For the first page, replace the data
          if (action.payload.pageNo === 1) {
            const productsData = action.payload.products.data || action.payload.products;
            const count = action.payload.products.count || (Array.isArray(productsData) ? productsData.length : 0);
            const transformedProducts = Array.isArray(productsData) ? productsData.map(transformProductData) : [];

            state.productList = {
              data: transformedProducts,
              count: count,
            };
          } else {
            const newProducts = action.payload.products.data || action.payload.products;

            if (state.productList.data && newProducts) {
              const transformedProducts = Array.isArray(newProducts) ? newProducts.map(transformProductData) : [];

              state.productList.data.push(...transformedProducts);
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
        state.singleProduct = transformProductData(action.payload);
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
