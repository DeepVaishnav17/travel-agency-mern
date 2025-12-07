import axios from 'axios';

// ✅ MASTER FIX: Automatically switch between Localhost and Render
// If the app is running in production (Render), use the live URL + /api
// If the app is running locally, use localhost + /api
const API_URL = import.meta.env.PROD 
  ? 'https://travel-agency-mern-8wdn.onrender.com/api' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true // Optional: Helps if you use cookies in the future
});

// Automatically add token to headers if it exists (Keep this logic!)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;