import axios from 'axios';
import { BASE_API } from '../constant/config';

const axiosInstance = axios.create({
  baseURL: BASE_API,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("REQUEST CONFIG", config)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
