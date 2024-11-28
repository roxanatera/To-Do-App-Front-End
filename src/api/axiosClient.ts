import axios from "axios";

// Asumiendo que tienes una variable de entorno llamada VITE_API_URL configurada en tus archivos .env
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

// Explicitly set JSON as the content type
axiosClient.defaults.headers.common['Content-Type'] = 'application/json';

// Interceptor to handle authentication errors
axiosClient.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    console.error("Authentication error", error.response);
  }
  return Promise.reject(error);
});

export default axiosClient;
