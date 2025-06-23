// src/utils/api.js
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL  || 'http://localhost:5000';

// Simple function
export const getImageUrl = (imagePath) => {
  return imagePath ? `${API_BASE_URL}${imagePath}` : '';
};
