import axios from './axios.js';

const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token
    } else{
        delete axios.defaults.headers.common['x-auth-token']
    }
}
export default setAuthToken