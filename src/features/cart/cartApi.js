import axios from '../../utilis/axios';

export const addProductOnCart = async (code, branch) => {
  if (localStorage.userToken) {
    setAuthToken(localStorage.userToken)
  }
  try {

    const res = await axios.get('/api/cart/',{
        code: code,
        branch: branch
    })

    return res;

  } catch (error) {
    console.log(error)
  }
}