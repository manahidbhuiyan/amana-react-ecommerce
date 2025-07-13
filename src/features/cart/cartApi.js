import axios from '../../utilis/axios';
import setAuthToken from '../../utilis/setAuthToken';

export const addProductOnCart = async (code, branch) => {
  console.log("user", localStorage.userToken)
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