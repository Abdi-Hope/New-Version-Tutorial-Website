const User = require('../../models/User');
const Course = require('../../models/Course');
const Enrollment = require('../../models/Enrollment');
const Payment = require('../../models/Payment');

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/dashboard/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Get counts
    const [
      totalUsers,
      totalInstructors,
      totalStudents,
      totalCourses,
      totalEnrollments,
      totalRevenueResult,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'instructor' }),
      User.countDocuments({ role: 'student' }),
      Course.countDocuments({ status: 'published' }),
      Enrollment.countDocuments(),
      Payment.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ]);

    // Get today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [
      newUsersToday,
      newEnrollmentsToday,
      revenueTodayResult,
    ] = await Promise.all([
      User.countDocuments({ createdAt: { $gte: today } }),
      Enrollment.countDocuments({ enrolledAt: { $gte: today } }),
      Payment.aggregate([
        { $match: { status: 'completed', createdAt: { $gte: today } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ]);

    // Get monthly revenue
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const revenueThisMonthResult = await Payment.aggregate([
      { $match: { status: 'completed', createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    // Get recent activities
    const recentUsers = await User.find()
      .select('name email role createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentCourses = await Course.find({ status: 'published' })
      .populate('instructor', 'name')
      .select('title instructor studentsEnrolled createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentEnrollments = await Enrollment.find()
      .populate('user', 'name')
      .populate('course', 'title')
      .select('user course enrolledAt')
      .sort({ enrolledAt: -1 })
      .limit(5);

    // Get chart data for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyEnrollments = await Enrollment.aggregate([
      { $match: { enrolledAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$enrolledAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const dailyRevenue = await Payment.aggregate([
      { $match: { status: 'completed', createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          amount: { $sum: '$amount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        counts: {
          totalUsers,
          totalInstructors,
          totalStudents,
          totalCourses,
          totalEnrollments,
          totalRevenue: totalRevenueResult[0]?.total || 0,
        },
        today: {
          newUsers: newUsersToday,
          newEnrollments: newEnrollmentsToday,
          revenue: revenueTodayResult[0]?.total || 0,
        },
        monthly: {
          revenue: revenueThisMonthResult[0]?.total || 0,
        },
        recent: {
          users: recentUsers,
          courses: recentCourses,
          enrollments: recentEnrollments,
        },
        charts: {
          dailyEnrollments,
          dailyRevenue,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get system health
// @route   GET /api/admin/dashboard/health
// @access  Private/Admin
exports.getSystemHealth = async (req, res, next) => {
  try {
    const mongoose = require('mongoose');
    
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    
    // Check disk space (Linux only)
    let diskUsage = {};
    if (process.platform === 'linux') {
      const { execSync } = require('child_process');
      const dfOutput = execSync('df -h /').toString();
      // Parse disk usage from df output
    }
    
    res.status(200).json({
      success: true,
      data: {
        database: {
          status: dbStatus,
          connection: mongoose.connection.host,
          name: mongoose.connection.name,
        },
        server: {
          uptime: Math.floor(uptime),
          platform: process.platform,
          nodeVersion: process.version,
          memory: {
            used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
            total: Math.round(memoryUsage.heapTotal / 1024 / 1024),
          },
        },
        application: {
          env: process.env.NODE_ENV || 'development',
          pid: process.pid,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
