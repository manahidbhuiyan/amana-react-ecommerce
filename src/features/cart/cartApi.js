import axios from '../../utilis/axios';
import setAuthToken from '../../utilis/setAuthToken';

export const addProductOnCart = async (code, branch) => {
  if (localStorage.userToken) {
    setAuthToken(localStorage.userToken)
  }
  try {

    const res = await axios.post('/api/cart/', {
      code: code,
      branch: branch
    })

    return res.data;

  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

export const updateProductQuantity = async (productId, quantity, branchId) => {
  try {
    if (localStorage.userToken) {
      setAuthToken(localStorage.userToken)
    }
    const response = await axios.put('/api/cart', {
      id: productId, quantity: quantity, branch: branchId || localStorage.branchId
    })
    return response.data;
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    throw error;
  }
}


export const resetCart = async (branch) => {
  if (localStorage.userToken) {
    setAuthToken(localStorage.userToken)
  }
  try {

    // const res = await axios.post('/api/cart/delete',{id:id,branch:branch})
    const res = await axios.delete('/api/cart/delete', {
      data: {
        id: null,
        branch: branch,
        clear_all: "true"
      }
    })

    return res.data;

  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}