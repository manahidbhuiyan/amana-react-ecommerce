import { createSlice } from "@reduxjs/toolkit";

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
  if (transformedProduct.maxQuantity === undefined) {
    transformedProduct.maxQuantity = transformedProduct.quantity;
  }
  // Set quantity to 1
  transformedProduct.quantity = 1;
  return transformedProduct;
};

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
    setProductList(state, action) {
      console.log("action",action)
      const products = action.payload?.data || [];
      const count = action.payload?.count || products.length;
      state.productList = {
        data: products.map(transformProductData),
        count,
      };
    },
    pushProductInformation: (state, action) => {
      const transformed = action.payload.map(transformProductData);
      state.productList.data.push(...transformed);
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
    setError(state, action) {
      state.isError = true;
      state.error = action.payload || "Something went wrong.";
    },
    clearError(state) {
      state.isError = false;
      state.error = "";
    },
  },
});

export const { setNewProducts, setSpecialOffers, setSingleProduct, setProductList, pushProductInformation, clearProductList, setLoading, setError, clearError } = productSlice.actions;

export default productSlice.reducer;
