import { apiSlice } from '../api/apiSlice';

// export const loginUserAuth = async (credentials) => {
//     try {
//         const response = await axios.post("/api/user/login", {
//             email: credentials.email,
//             password: credentials.password
//         });
//         return response.data;
//     } catch (error) {
//         console.log(error);
//         throw error; // Re-throw to handle in the thunk
//     }
// }

// export const getuserInfo = async() =>{
//     try{
//         if (localStorage.userToken) {
//             setAuthToken(localStorage.userToken)
//           }
        
//         const response = await axios.get("/api/user")
//         return response
//     }
//     catch(error){
//         console.log(error);
//         throw error;
//     }
// }



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
        // Save token to localStorage automatically
        if (response.token) {
          localStorage.setItem('userToken', response.token);
        }
        return response.data;
      },
    }),

    // Get user info query  
    getUserInfo: builder.query({
      query: () => '/api/user',
      providesTags: [{ type: 'Auth', id: 'USER_INFO' }],
      transformResponse: (response) => {
        console.log("response,",response,)
        return response
      } // Extract data like your existing API
    }),

    // Logout mutation
    // logoutUser: builder.mutation({
    //   query: () => ({
    //     url: '/api/user/logout', // If you have logout endpoint
    //     method: 'POST',
    //   }),
    //   invalidatesTags: ['Auth'],
    //   onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
    //     try {
    //       await queryFulfilled;
    //     } finally {
    //       // Clear token regardless of API response
    //       localStorage.removeItem('userToken');
    //     }
    //   },
    // }),
  }),
});

// export const {
//   useLoginUserMutation,
//   useGetUserInfoQuery,
//   // useLogoutUserMutation,
//   useLazyGetUserInfoQuery, // For manual triggering
// } = authApi;

export const { useLoginUserMutation, useGetUserInfoQuery, useLazyGetUserInfoQuery } = authApi