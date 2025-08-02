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

                let api = `/api/product/lists/${pageNo}?branch=${branchID}${searchQuery}`
                console.log("api",api)

                return api
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

export const { useGetProductsQuery, useLazyGetProductsQuery } = productApi
