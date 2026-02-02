import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ae_token')
    if (token) {
      config.headers.Authorization = Bearer 
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Auth services
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout')
}

// Course services
export const courseService = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(/courses/),
  create: (courseData) => api.post('/courses', courseData),
  update: (id, courseData) => api.put(/courses/, courseData),
  delete: (id) => api.delete(/courses/),
  enroll: (courseId) => api.post(/courses//enroll)
}

// User services
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  getEnrollments: () => api.get('/users/enrollments')
}

export default api
