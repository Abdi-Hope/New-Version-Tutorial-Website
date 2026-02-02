import axios from 'axios';
import API_CONFIG from '../config/api.js';

class ApiService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: 10000,
    });
    
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    
    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error.response?.data || error);
      }
    );
  }
  
  // Admin API methods
  admin = {
    // Dashboard
    getDashboardOverview: () => 
      this.axiosInstance.get(API_CONFIG.ADMIN_BASE_URL + '/dashboard/overview'),
    
    // Users
    getUsers: (params = {}) => 
      this.axiosInstance.get(API_CONFIG.ADMIN_BASE_URL + '/users', { params }),
    
    getUserById: (id) => 
      this.axiosInstance.get(`${API_CONFIG.ADMIN_BASE_URL}/users/${id}`),
    
    updateUser: (id, data) => 
      this.axiosInstance.put(`${API_CONFIG.ADMIN_BASE_URL}/users/${id}`, data),
    
    deleteUser: (id) => 
      this.axiosInstance.delete(`${API_CONFIG.ADMIN_BASE_URL}/users/${id}`),
    
    // Courses
    getCourses: (params = {}) => 
      this.axiosInstance.get(API_CONFIG.ADMIN_BASE_URL + '/courses', { params }),
    
    // Analytics
    getRevenueAnalytics: (params = {}) => 
      this.axiosInstance.get(API_CONFIG.ADMIN_BASE_URL + '/analytics/revenue', { params }),
    
    // System
    getSystemStatus: () => 
      this.axiosInstance.get(`${API_CONFIG.BASE_URL}/health`),
    
    // Quick Actions
    restartBackend: () => 
      this.axiosInstance.post(`${API_CONFIG.ADMIN_BASE_URL}/system/restart`),
    
    clearCache: () => 
      this.axiosInstance.post(`${API_CONFIG.ADMIN_BASE_URL}/system/clear-cache`),
    
    backupDatabase: () => 
      this.axiosInstance.post(`${API_CONFIG.ADMIN_BASE_URL}/system/backup`),
  };
  
  // Auth API methods
  auth = {
    login: (credentials) => 
      this.axiosInstance.post(API_CONFIG.ENDPOINTS.LOGIN, credentials),
    
    register: (userData) => 
      this.axiosInstance.post(API_CONFIG.ENDPOINTS.REGISTER, userData),
    
    logout: () => 
      this.axiosInstance.post(API_CONFIG.ENDPOINTS.LOGOUT),
  };
  
  // User API methods
  users = {
    getProfile: () => 
      this.axiosInstance.get(API_CONFIG.ENDPOINTS.USER_PROFILE),
    
    updateProfile: (data) => 
      this.axiosInstance.put(API_CONFIG.ENDPOINTS.USER_PROFILE, data),
  };
  
  // Course API methods
  courses = {
    getAll: (params = {}) => 
      this.axiosInstance.get(API_CONFIG.ENDPOINTS.COURSES, { params }),
    
    getById: (id) => 
      this.axiosInstance.get(API_CONFIG.buildUrl(API_CONFIG.ENDPOINTS.COURSE_DETAIL, { id })),
  };
}

const apiService = new ApiService();
export default apiService;
