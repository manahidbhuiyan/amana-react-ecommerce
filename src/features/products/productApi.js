import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ pageNo, branchID, queryString = {} }) => {
                let searchQuery = '';

                for (const key in queryString) {
                    if (
                        queryString[key] !== undefined &&
                        queryString[key] !== null &&
                        queryString[key] !== ''
                    ) {
                        searchQuery += `&${key}=${encodeURIComponent(queryString[key])}`;
                    }
                }
                return `/api/product/lists/${pageNo}?branch=${branchID}${searchQuery}`
            },
            providesTags: (result, error, { pageNo, branchID }) => [
                { type: 'Product', id: `LIST-${branchID}-${pageNo}` },
            ],
            transformResponse: (response) => {
                console.log("RTK response:", response);
                return response;
            },
        })
    })
})

export const { usegetProductsQuery, useLazygetProductsQuery } = productApi


// getUserInfo: builder.query({
//   query: () => '/api/user',
//   providesTags: [{ type: 'Auth', id: 'USER_INFO' }],
//   transformResponse: (response) => {
//     console.log("response,",response,)
//     return response
//   } // Extract data like your existing API
// }),



// export const getProducts = async (pageNo, branchID, queryString) => {
//     try {
//         let searchQuery = '';

//         // Build query string from parameters
//         for (const key in queryString) {
//             if (queryString[key] !== undefined && queryString[key] !== null && queryString[key] !== '') {
//                 searchQuery += `&${key}=${encodeURIComponent(queryString[key])}`;
//             }
//         }

//         // Use the correct GET endpoint from backend
//         let requestLink = `/api/product/lists/${pageNo}?branch=${branchID}${searchQuery}`;

//         const res = await axios.get(requestLink);
//         return res.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const getSingleProduct = async (slug, branchID, barcode) => {
//     try {
//         let requestLink = '/api/product/single/slug/' + slug + '?branch=' + branchID + '&barcode=' + barcode;
//         const res = await axios.get(requestLink);
//         return res.data;
//     } catch (error) {
//         throw error;
//     }
// }