import axios from '../../utilis/axios'

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