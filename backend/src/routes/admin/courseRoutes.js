const express = require('express');
const router = express.Router();
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
const { protect } = require('../../middleware/auth');
const { isAdmin } = require('../../middleware/admin');

// All routes require admin access
router.use(protect);
router.use(isAdmin);

router.route('/')
  .get(getCourses)
  .post(createCourse);

router.route('/stats')
  .get(getCourseStats);

router.route('/pending')
  .get(getPendingCourses);

router.route('/:id')
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

router.route('/:id/approve')
  .put(approveCourse);

router.route('/:id/reject')
  .put(rejectCourse);

module.exports = router;
