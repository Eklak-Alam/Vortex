import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10s timeout (Prevents hanging requests)
});

// 1. Request Interceptor: Auto-attach Token
api.interceptors.request.use(
  (config) => {
    // Future-proof: If we save a token later, it injects automatically
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token'); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptor: Smart Error Handling
api.interceptors.response.use(
  (response) => response, // Return success directly
  (error) => {
    const customError = {
      message: error.response?.data?.message || "Something went wrong",
      status: error.response?.status,
      original: error
    };

    // Auto-redirect if unauthorized (401)
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // window.location.href = '/login'; // Uncomment when Auth is ready
      console.warn("Unauthorized access - Redirecting...");
    }

    console.error(`[API Error] ${customError.status}: ${customError.message}`);
    return Promise.reject(customError);
  }
);

export default api;