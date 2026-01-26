 import axios from "axios";

 const BASE_URL ="https://ecommerce-backend-kmni.onrender.com";
const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export { API, BASE_URL };
