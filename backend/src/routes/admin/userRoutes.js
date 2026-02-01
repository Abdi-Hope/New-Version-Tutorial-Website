const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  getUserStats,
} = require('../../controllers/admin/userController');
const { protect, authorize } = require('../../middleware/auth');
const { isAdmin } = require('../../middleware/admin');

// All routes require admin access
router.use(protect);
router.use(isAdmin);

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/stats')
  .get(getUserStats);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:id/toggle-status')
  .put(toggleUserStatus);

module.exports = router;
