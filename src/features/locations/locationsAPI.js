import axios from '../../utilis/axios'

export const getLocations = async () =>{
    const response = await axios.get("/api/branch")
    return response.data
}