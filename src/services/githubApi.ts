import axios from "axios";
import { configEnv } from "../config";

const githubApi = axios.create({
  baseURL: `${configEnv.api_host}`,
  headers: {
    "Content-Type": "application/json",
  },
});

githubApi.interceptors.request.use(
  async (config) => {
    // const token = localStorage.getItem("token"); // React Web
    const token = `${configEnv.access_token}`;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

githubApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expired. Redirect to login...");
    }
    return Promise.reject(error);
  }
);

export default githubApi;
