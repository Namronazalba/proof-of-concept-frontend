import axios from "axios";

const API = axios.create({
  baseURL: "https://proof-of-concept-backend.vercel.app", 
});

export default API;
