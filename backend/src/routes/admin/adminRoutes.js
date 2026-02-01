const express = require('express');
const router = express.Router();

// Import admin controllers directly
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  getUserStats,
} = require('../../controllers/admin/userController');

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  approveCourse,
  rejectCourse,
  getPendingCourses,
  getCourseStats,
} = require('../../controllers/admin/courseController');

const {
  getDashboardStats,
  getSystemHealth,
} = require('../../controllers/admin/dashboardController');

const { protect } = require('../../middleware/auth');
const { isAdmin } = require('../../middleware/admin');

// Apply auth middleware to all admin routes
router.use(protect);
router.use(isAdmin);

// Dashboard routes
router.get('/dashboard/stats', getDashboardStats);
router.get('/dashboard/health', getSystemHealth);

// User routes
router.get('/users', getUsers);
router.get('/users/stats', getUserStats);
router.post('/users', createUser);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/toggle-status', toggleUserStatus);

// Course routes
router.get('/courses', getCourses);
router.get('/courses/stats', getCourseStats);
router.post('/courses', createCourse);
router.get('/courses/pending', getPendingCourses);
router.get('/courses/:id', getCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);
router.put('/courses/:id/approve', approveCourse);
router.put('/courses/:id/reject', rejectCourse);

module.exports = router;
