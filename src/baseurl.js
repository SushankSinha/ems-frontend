import axios from 'axios';

const instance = axios.create({
  // baseURL: "http://localhost:5000/api"
  baseURL: "https://ems-backend-s080.onrender.com/api"
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
