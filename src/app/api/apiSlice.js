import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  prepareHeaders: (headers, { getState }) => {
    // Get token from your existing auth setup
    const token = localStorage.getItem('userToken') || getState().auth?.token;
    
    if (token) {
      headers.set('x-auth-token', token); // Same as your axios setup
    }
    
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

// Handle auth errors like your existing setup
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error && result.error.status === 401) {
    console.log('Token expired, logging out...');
    localStorage.removeItem('userToken');
    // Keep your existing logout logic
  }
  
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Product', 
    'Category', 
    'Cart', 
    'Order', 
    'Location',
    'Auth'
  ],
  endpoints: (builder) => ({}),
});

export default apiSlice;