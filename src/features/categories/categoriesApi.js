import axios from '../../utilis/axios';

export const getCategoryData = async (branchID) => {
    try {
        let requestLink = '/api/category/branch/' + branchID
        const res = await axios.get(requestLink);
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getProductCategoryData = async (type, slug) => {
    try {
        if (type == 'subcategory') {
            const res = await axios.get('/api/subcategory/data/slug/' + slug)
            return res;
        } else if (type == 'category') {
            const res = await axios.get('/api/category/data/slug/' + slug)
            return res;
        }

    } catch (error) {
        console.log(error)
    }
}