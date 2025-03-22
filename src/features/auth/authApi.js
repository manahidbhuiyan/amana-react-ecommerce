import axios from '../../utilis/axios'
import setAuthToken from '../../utilis/setAuthToken';

export const loginUserAuth = async (credentials) => {
    try {
        const response = await axios.post("/api/user/login", {
            email: credentials.email,
            password: credentials.password
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error; // Re-throw to handle in the thunk
    }
}

export const getuserInfo = async() =>{
    try{
        if (localStorage.userToken) {
            setAuthToken(localStorage.userToken)
          }
        
        const response = await axios.get("/api/user")
        return response
    }
    catch(error){
        console.log(error);
        throw error;
    }
}


