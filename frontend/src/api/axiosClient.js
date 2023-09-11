import axios from 'axios';
import storage from '../Storage/Storage';

const axiosClient = axios.create({
    // baseURL: 'http://localhost:8080/api/v1',
    baseURL: 'http://13.212.255.1:8080/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    // if token exists then attach token
    const token = storage.getToken();
    if (token !== null && token !== undefined) {
        config.headers.Authorization = token;
    }

    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data !== undefined) {
        // only get data
        return response.data;
    }

    return response;
}, (error) => {
    // Handle errors
    if (error.response) {
        throw error.response;
    } else if (error.request) {
        throw error.request;
    } else {
        throw error;
    }
});

export default axiosClient;