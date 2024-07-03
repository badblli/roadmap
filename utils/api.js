import axios from "axios";

const axiosServices = axios.create();

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) =>
        Promise.reject((error.response && error.response.data) || "Wrong Services")
);

axiosServices.interceptors.request.use(
    (config) => {
        // Promise.resolve(JSON.stringify(config));
        console.error("Request is being sent:", JSON.stringify(config));
        alert(JSON.stringify(config));
        return config;
    },
    (error) => {
        // Promise.reject(JSON.stringify(error));
        console.error("Error in request interceptor:", JSON.stringify(error));
        alert(JSON.stringify(error));
        return Promise.reject(error);
    }
);

export default axiosServices;
