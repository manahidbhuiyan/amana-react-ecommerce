import { configureStore } from "@reduxjs/toolkit";
import locationReducer from '../features/locations/locationSlice'
import productReducer from "../features/products/productSlice";
import authReducer from "../features/auth/authSlice"
import categoriesReducer from '../features/categories/categoriesSlice';
import heroReducer from "../features//slice/heroSlice"
import customerReviewReducer from '../features/slice/customerReviewSlice';
import sidebarReducer from '../features/slice/sidebarSlice.jsx';
import cartReducer from '../features/cart/cartSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    location: locationReducer,
    products: productReducer,
    categories: categoriesReducer,
    hero: heroReducer,
    customerReview: customerReviewReducer,
    sidebar: sidebarReducer,
    cart: cartReducer,
  }, // Reducer gula ekhane add korte hobe
});
