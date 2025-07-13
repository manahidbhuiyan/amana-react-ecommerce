// src/features/sidebar/sidebarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  activeCategory: null,
  activeSubCategory: null,
  expandedCategory: null
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
      state.activeSubCategory = null;
    },
    setActiveSubCategory: (state, action) => {
      state.activeSubCategory = action.payload;
    },
    setExpandedCategory: (state, action) => {
      state.expandedCategory = action.payload;
    },
    resetSidebarSelections: (state) => {
      state.activeCategory = null;
      state.activeSubCategory = null;
      state.expandedCategory = null;
    },
    resetSidebar: (state) => {
      return initialState; // Reset everything to initial state
    }
  }
});

export const {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  setActiveCategory,
  setActiveSubCategory,
  setExpandedCategory,
  resetSidebarSelections,
  resetSidebar
} = sidebarSlice.actions;

export default sidebarSlice.reducer;