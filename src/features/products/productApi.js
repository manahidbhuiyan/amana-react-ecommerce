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
        throw error;
    }
};

export const getSingleProduct = async (slug, branchID, barcode) => {
    try {
        let requestLink = '/api/product/single/slug/' + slug + '?branch=' + branchID + '&barcode=' + barcode
        const res = await axios.get(requestLink);
        return res.data;
    } catch (error) {
        throw error;
    }
}
