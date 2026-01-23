 import axios from "axios";

 const BASE_URL =window.location.hostname ==="localhost" 
 ? "https://ecommerce-backend-kmni.onrender.com":"http://localhost:5000";
const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export { API, BASE_URL };
