const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api',
  ADMIN_BASE_URL: 'http://localhost:5000/api/admin',
  
  // Endpoints
  ENDPOINTS: {
    // Auth
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    
    // Admin
    ADMIN_DASHBOARD: '/dashboard/overview',
    ADMIN_USERS: '/users',
    ADMIN_COURSES: '/courses',
    ADMIN_TRANSACTIONS: '/transactions',
    ADMIN_ANALYTICS: '/analytics/revenue',
    
    // User
    USER_PROFILE: '/users/profile',
    USER_COURSES: '/users/courses',
    
    // Course
    COURSES: '/courses',
    COURSE_DETAIL: '/courses/:id',
    
    // Payment
    PAYMENTS: '/payments',
    SUBSCRIPTIONS: '/subscriptions'
  },
  
  // Headers
  getHeaders: (token = null) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  },
  
  // Build URL
  buildUrl: (endpoint, params = {}) => {
    let url = `${API_CONFIG.BASE_URL}${endpoint}`;
    
    // Replace params in URL
    Object.keys(params).forEach(key => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, params[key]);
      }
    });
    
    return url;
  },
  
  // Build Admin URL
  buildAdminUrl: (endpoint, params = {}) => {
    let url = `${API_CONFIG.ADMIN_BASE_URL}${endpoint}`;
    
    // Replace params in URL
    Object.keys(params).forEach(key => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, params[key]);
      }
    });
    
    return url;
  }
};

export default API_CONFIG;
