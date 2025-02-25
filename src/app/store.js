import { configureStore } from "@reduxjs/toolkit";
import locationReducer from '../features/locations/locationSlice'

export const store = configureStore({
  reducer: {
    location: locationReducer,
  }, // Reducer gula ekhane add korte hobe
});
