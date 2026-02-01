const User = require('../../models/User');
const Course = require('../../models/Course');
const Payment = require('../../models/Payment');
const Enrollment = require('../../models/Enrollment');

// @desc    Get revenue analytics
// @route   GET /api/admin/analytics/revenue
// @access  Private/Admin
exports.getRevenueAnalytics = async (req, res, next) => {
  try {
    const { period = 'monthly' } = req.query;
    
    let matchStage = {};
    let groupFormat = '%Y-%m';
    
    if (period === 'daily') {
      matchStage.createdAt = {
        $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      };
      groupFormat = '%Y-%m-%d';
    } else if (period === 'weekly') {
      matchStage.createdAt = {
        $gte: new Date(new Date().setDate(new Date().getDate() - 90)),
      };
      groupFormat = '%Y-%U';
    } else { // monthly
      matchStage.createdAt = {
        $gte: new Date(new Date().setMonth(new Date().getMonth() - 12)),
      };
    }
    
    const revenueData = await Payment.aggregate([
      { $match: { ...matchStage, status: 'completed' } },
      {
        $group: {
          _id: { $dateToString: { format: groupFormat, date: '$createdAt' } },
          total: { $sum: '$amount' },
          count: { $sum: 1 },
          average: { $avg: '$amount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    
    // Get revenue by course
    const revenueByCourse = await Payment.aggregate([
      { $match: { status: 'completed' } },
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'course',
        },
      },
      { $unwind: '$course' },
      {
        $group: {
          _id: '$course.title',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 10 },
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        revenueData,
        revenueByCourse,
      },
    });
  } catch (error) {
    next(error);
  }
};
