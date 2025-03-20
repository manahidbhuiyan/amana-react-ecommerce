import { configureStore } from "@reduxjs/toolkit";
import locationReducer from '../features/locations/locationSlice'
import productReducer from "../features/products/productSlice";
import authReducer from "../features/auth/authSlice"

export const store = configureStore({
  reducer: {
    location: locationReducer,
    products: productReducer,
    auth: authReducer
  }, // Reducer gula ekhane add korte hobe
});
