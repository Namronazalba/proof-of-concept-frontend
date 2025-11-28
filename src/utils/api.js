import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // local backend URL
});

export default API;
