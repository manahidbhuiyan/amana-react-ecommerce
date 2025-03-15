import axios from '../../utilis/axios';

export const getProducts = async (pageNo, branchID, queryString) => {
    try {
        let searchQuery = '';
        for (const key in queryString) {
            searchQuery += `&${key}=${queryString[key]}`;
        }

        let requestLink = '/api/product/lists/' + pageNo + '?branch=' + branchID + searchQuery;
        const res = await axios.get(requestLink);
        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
