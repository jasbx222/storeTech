import axios from 'axios';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: 'https://storetech-back.bandtech-app.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
   
    const token = localStorage.getItem('authToken');  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
