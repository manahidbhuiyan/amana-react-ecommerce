import axios from '../../utilis/axios';
import setAuthToken from '../../utilis/setAuthToken';

export const addProductOnCart = async (code, branch) => {
  if (localStorage.userToken) {
    setAuthToken(localStorage.userToken)
  }
  try {

    const res = await axios.post('/api/cart/',{
        code: code,
        branch: branch
    })

    return res.data;

  } catch (error) {
    console.log(error)
    throw error;
  }
}


export const resetCart = async (branch) => {
  if (localStorage.userToken) {
    setAuthToken(localStorage.userToken)
  }
  try {

    // const res = await axios.post('/api/cart/delete',{id:id,branch:branch})
    const res = await axios.delete('/api/cart/delete',{
      data:{
        id:null,
        branch:branch,
        clear_all:"true"}
    })

    console.log("res",res)
    return res;

  } catch (error) {
    console.log(error)
  }
}