import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Verifica que esto esté correcto
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
