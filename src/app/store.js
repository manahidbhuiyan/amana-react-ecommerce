import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice.js';

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
    // Add RTK Query
    api: apiSlice.reducer,

    auth: authReducer,
    location: locationReducer,
    products: productReducer,
    categories: categoriesReducer,
    hero: heroReducer,
    customerReview: customerReviewReducer,
    sidebar: sidebarReducer,
    cart: cartReducer,
  }, // Reducer gula ekhane add korte hobe
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
        ],
      },
    }).concat(apiSlice.middleware), // Add RTK Query middleware
  devTools: process.env.NODE_ENV !== 'production',
});

// No TypeScript exports needed for JavaScript
export default store;
