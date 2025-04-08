import axios from "axios";

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC
});

API.interceptors.request.use(
    (response) => response,
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);
export default API;
