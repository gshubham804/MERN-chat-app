import axios from "axios";
import { BASE_URL } from "../config";

// Create an instance of axios

const axiosInstance = axios.create({ baseURL: BASE_URL });

// Create an interceptors which can handle response and error

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || "Something went wrong")
);

export default axiosInstance;
