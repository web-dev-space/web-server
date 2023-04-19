import axios from "axios";

const ProductSearchController = (app) => {
    app.get("/products/search/:searchText", searchProducts);
    app.get("/products/details/:asinID", getProductDetails);
};

const searchProducts = async (req, res) => {
    const searchText = req.params.searchText;
    try {
        // set up the request parameters
        const params = {
            api_key: process.env.REACT_API_AMAZON_PRODUCT_KEY,
            type: "search",
            search_term: searchText,
            amazon_domain: "amazon.com",
            exclude_sponsored: true,
        }
        // make the http GET request to ASIN Data API
        const response = await axios.get('https://api.asindataapi.com/request', { params });
        // print the JSON response from ASIN Data API
        res.json(response.data.search_results);
    } catch (e) {
        // catch and print the error
        console.error("error in searchProducts", e, e?.response?.data);
    }
};

const getProductDetails = async (req, res) => {
    const asinID = req.params.asinID;
    try {
        // set up the request parameters
        const params = {
            api_key: process.env.REACT_API_AMAZON_PRODUCT_KEY,
            type: "product",
            asin: asinID,
            amazon_domain: "amazon.com"
        }
        // make the http GET request to ASIN Data API
        const response = await axios.get('https://api.asindataapi.com/request', { params });
        // print the JSON response from ASIN Data API
        res.json(response.data.product);
    } catch (e) {
        // catch and print the error
        console.error("error in getProductDetails", e, e?.response?.data);
    }
};

export default ProductSearchController;