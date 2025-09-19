// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem('luxeAuth');
    if (stored) {
      const { token } = JSON.parse(stored);
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (e) {
    // ignore
  }
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      // Extract error message from response
      if (error.response.data.non_field_errors) {
        error.message = error.response.data.non_field_errors[0];
      } else if (typeof error.response.data === 'object') {
        // Get the first error message from the response
        const firstKey = Object.keys(error.response.data)[0];
        error.message = error.response.data[firstKey][0];
      } else {
        error.message = error.response.data;
      }
    }
    return Promise.reject(error);
  }
);

export default api;