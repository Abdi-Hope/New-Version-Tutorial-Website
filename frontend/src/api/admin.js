import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const adminApi = {
  // Test endpoints
  testConnection: () => axiosInstance.get('/admin/test'),
  
  // Dashboard
  getDashboardStats: () => axiosInstance.get('/admin/dashboard'),
  
  // Users
  getUsers: () => axiosInstance.get('/admin/users'),
  
  // Mock functions for development
  createUser: async (userData) => {
    console.log('Creating user (mock):', userData);
    return { 
      success: true, 
      data: { 
        ...userData, 
        id: Date.now(),
        createdAt: new Date().toISOString() 
      } 
    };
  },
  
  updateUser: async (id, userData) => {
    console.log('Updating user (mock):', id, userData);
    return { 
      success: true, 
      data: { 
        ...userData, 
        id,
        updatedAt: new Date().toISOString() 
      } 
    };
  },
  
  deleteUser: async (id) => {
    console.log('Deleting user (mock):', id);
    return { success: true, message: 'User deleted successfully' };
  },
};

export default adminApi;
