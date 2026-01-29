import axios from "axios";

const API = axios.create({
    baseURL: "https://farmer-shop-backend.onrender.com", // Backend URL (production me env variable use karo)
});

// JWT token automatically attach
API.interceptors.request.use((req)=>{
    const token = localStorage.getItem("token");
    if(token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default API;
