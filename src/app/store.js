import { configureStore } from "@reduxjs/toolkit";
import locationReducer from '../features/locations/locationSlice'
import productReducer from "../features/products/productSlice";
import authReducer from "../features/auth/authSlice"
import categoriesReducer from '../features/categories/categoriesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    location: locationReducer,
    products: productReducer,
    categories: categoriesReducer,
  }, // Reducer gula ekhane add korte hobe
});
