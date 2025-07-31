import { apiSlice } from "../api/apiSlice";

export const categoriesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get categoies list with data
        getCategory: builder.query({
            query: (branchID) => `/api/category/branch/${branchID}`,
            transformResponse: (response) => {
                // return response.data;
                return response.info?.sort((a, b) => a.category.cust_ser - b.category.cust_ser) || [];
            },
            providesTags: ['Category'],
        }),
        // get products based on category and subCategory
        getProductCategory: builder.query({
            query: ({ type, slug }) => {
                if (type === 'subcategory') {
                    return `/api/subcategory/data/slug/${slug}`;
                } else if (type === 'category') {
                    return `/api/category/data/slug/${slug}`;
                } else {
                    throw new Error('Invalid type. Must be "category" or "subcategory"');
                }
            },
            providesTags: (error, { type, slug }) => [
                { type: 'Category', id: `${type}-${slug}` }
            ],
            transformResponse: (response) => {
                return response;
            },
        })
    })
})

export const { useGetCategoryQuery, useLazyGetCategoryQuery, useGetProductCategoryQuery, useLazyGetProductCategoryQuery } = categoriesApi