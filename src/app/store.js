import { configureStore } from "@reduxjs/toolkit";
import locationReducer from '../features/locations/locationSlice'
import productReducer from "../features/products/productSlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    products: productReducer,
  }, // Reducer gula ekhane add korte hobe
});
