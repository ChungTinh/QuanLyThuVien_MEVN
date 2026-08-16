import axios from "axios";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

export default (baseURL) => {
    const apiBaseURL = "https://quanlythuvien-mevn.onrender.com";
    
    return axios.create({
        baseURL: apiBaseURL + baseURL,
        ...commonConfig,
    });
};