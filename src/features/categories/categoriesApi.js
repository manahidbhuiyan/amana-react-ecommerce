// import axios from '../../utilis/axios';

// export const getCategoryData = async (branchID) => {
//     try {
//         let requestLink = '/api/category/branch/' + branchID
//         const res = await axios.get(requestLink);
//         return res.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export const getProductCategoryData = async (type, slug) => {
//     try {
//         if (type == 'subcategory') {
//             const res = await axios.get('/api/subcategory/data/slug/' + slug)
//             return res;
//         } else if (type == 'category') {
//             const res = await axios.get('/api/category/data/slug/' + slug)
//             return res;
//         }

//     } catch (error) {
//         console.log(error)
//     }
// }

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