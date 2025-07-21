import axios from '../../utilis/axios';
import setAuthToken from '../../utilis/setAuthToken';

export const addProductOnCart = async (code, branch) => {
  if (localStorage.userToken) {
    setAuthToken(localStorage.userToken)
  }
  try {
    console.log("api code",code)
    console.log("api branch",branch)

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