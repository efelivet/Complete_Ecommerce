 import axios from "axios";

 const BASE_URL =  "https://ecommerce-backend-kmni.onrender.com";//Or "http://localhost:5000";//
const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export { API, BASE_URL };
