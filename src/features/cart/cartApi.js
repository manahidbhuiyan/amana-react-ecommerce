import { apiSlice } from "../api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get cart contents
    getCart: builder.query({
      query: (branchId) => ({
        url: '/api/cart',
        params: { branch: branchId || localStorage.branchId },
      }),
      providesTags: ['Cart'],
      transformResponse: (response) => {
        console.log("response cart",response)
        // Store in localStorage to maintain backward compatibility
        const cartData = response.data || response;
        localStorage.setItem("CartProduct", JSON.stringify(cartData));
        return cartData;
      },
    }),

    // Add product to cart
    addToCart: builder.mutation({
      query: ({ code, branchId }) => ({
        url: '/api/cart',
        method: 'POST',
        body: {
          code,
          branch: branchId || localStorage.branchId,
        },
      }),
      invalidatesTags: ['Cart'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const productsArray = data.data || data;
          
          // Get existing products from localStorage
          const existingCartProducts = JSON.parse(localStorage.getItem("CartProduct")) || [];
          
          productsArray.forEach(product => {
            const isProductExists = existingCartProducts.some(item => item._id === product._id);
            
            if (!isProductExists) {
              const modifiedProduct = {
                ...product,
                maxQuantity: product.maxQuantity ? product.maxQuantity : product.quantity,
                quantity: 1
              };
              existingCartProducts.push(modifiedProduct);
            }
          });
          
          localStorage.setItem("CartProduct", JSON.stringify(existingCartProducts));
        } catch (error) {
          console.error('Error in addToCart onQueryStarted:', error);
        }
      },
    }),

    // Update cart item quantity
    updateCartQuantity: builder.mutation({
      query: ({ productId, quantity, branchId }) => ({
        url: '/api/cart',
        method: 'PUT',
        body: {
          id: productId,
          quantity,
          branch: branchId || localStorage.branchId,
        },
      }),
      invalidatesTags: ['Cart'],
      async onQueryStarted({ productId, quantity }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          
          // Update in localStorage
          const existingCartProducts = JSON.parse(localStorage.getItem("CartProduct")) || [];
          const updatedCartProducts = existingCartProducts.map(item => {
            if (item._id === productId) {
              return {
                ...item,
                quantity
              };
            }
            return item;
          });
          
          localStorage.setItem("CartProduct", JSON.stringify(updatedCartProducts));
        } catch (error) {
          console.error('Error in updateCartQuantity onQueryStarted:', error);
        }
      },
    }),

    // Remove product from cart
    removeFromCart: builder.mutation({
      query: ({ productId, branchId }) => ({
        url: '/api/cart/delete',
        method: 'DELETE',
        body: {
          id: productId,
          branch: branchId || localStorage.branchId,
          clear_all: "false"
        },
      }),
      invalidatesTags: ['Cart'],
      async onQueryStarted({ productId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const responseData = data.data || data;
          
          const existingCartProducts = JSON.parse(localStorage.getItem("CartProduct")) || [];
          
          let newCart = [];
          responseData.forEach(product => {
            existingCartProducts.forEach(item => {
              if (product.product._id === item.product._id) {
                newCart.push(item);
              }
            });
          });
          
          localStorage.setItem("CartProduct", JSON.stringify(newCart));
        } catch (error) {
          console.error('Error in removeFromCart onQueryStarted:', error);
        }
      },
    }),

    // Clear the entire cart
    clearCart: builder.mutation({
      query: (branchId) => ({
        url: '/api/cart/delete',
        method: 'DELETE',
        body: {
          id: null,
          branch: branchId || localStorage.branchId,
          clear_all: "true"
        },
      }),
      invalidatesTags: ['Cart'],
      async onQueryStarted(arg, { queryFulfilled }) {
      console.log("clear cart api")

        try {
          const { data } = await queryFulfilled;
          const responseData = data.data || data;
          
          if (responseData.msg === 'cart is empty' || responseData.msg === 'No token, authorization denied') {
            localStorage.removeItem("CartProduct");
          }
        } catch (error) {
          console.error('Error in clearCart onQueryStarted:', error);
        }
      },
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartQuantityMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApiSlice;