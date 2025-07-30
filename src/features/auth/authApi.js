import { apiSlice } from '../api/apiSlice';


export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // Login mutation
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/api/user/login',
        method: 'POST',
        body: {
          email: credentials.email,
          password: credentials.password,
        },
      }),
      invalidatesTags: [{ type: 'Auth' }],
      transformResponse: (response) => {
        if (response.token) {
          localStorage.setItem('userToken', response.token);
        }
        return response;
      },
    }),

    // Get user info query  
    getUserInfo: builder.query({
      query: () => '/api/user',
      providesTags: [{ type: 'Auth', id: 'USER_INFO' }],
      transformResponse: (response) => {
        return response
      } // Extract data like your existing API
    }),

  }),
});


export const { useLoginUserMutation, useGetUserInfoQuery, useLazyGetUserInfoQuery } = authApi