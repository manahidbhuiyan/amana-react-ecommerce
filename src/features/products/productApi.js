import axios from '../../utilis/axios';

export const getProducts = async (pageNo, branchID, queryString) => {
    try {
        let searchQuery = '';

        // Build query string from parameters
        for (const key in queryString) {
            if (queryString[key] !== undefined && queryString[key] !== null && queryString[key] !== '') {
                searchQuery += `&${key}=${encodeURIComponent(queryString[key])}`;
            }
        }

        // Use the correct GET endpoint from backend
        let requestLink = `/api/product/lists/${pageNo}?branch=${branchID}${searchQuery}`;

        const res = await axios.get(requestLink);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getSingleProduct = async (slug, branchID, barcode) => {
    try {
        let requestLink = '/api/product/single/slug/' + slug + '?branch=' + branchID + '&barcode=' + barcode;
        const res = await axios.get(requestLink);
        return res.data;
    } catch (error) {
        throw error;
    }
}