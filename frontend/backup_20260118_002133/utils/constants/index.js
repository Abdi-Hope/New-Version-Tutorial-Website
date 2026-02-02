// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student'
}

// Course Categories
export const COURSE_CATEGORIES = [
  'Programming',
  'Web Development',
  'Data Science',
  'Design',
  'Business',
  'Science',
  'Mathematics',
  'Arts',
  'Languages',
  'Test Preparation'
]

// Grade Levels
export const GRADE_LEVELS = [
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12',
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior',
  'Other'
]

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout'
  },
  COURSES: {
    LIST: '/api/courses',
    DETAIL: '/api/courses/:id',
    CREATE: '/api/courses',
    UPDATE: '/api/courses/:id',
    DELETE: '/api/courses/:id'
  },
  USERS: {
    PROFILE: '/api/users/profile',
    UPDATE: '/api/users/:id'
  }
}

// Course Status
export const COURSE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
}
