const Course = require('../../models/Course');
const User = require('../../models/User');
const Enrollment = require('../../models/Enrollment');

// @desc    Get all courses with filters
// @route   GET /api/admin/courses
// @access  Private/Admin
exports.getCourses = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, category, status, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    let query = {};
    
    // Search by title
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by status
    if (status) {
      query.status = status;
    }
    
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    
    const courses = await Course.find(query)
      .populate('instructor', 'name email')
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip(startIndex)
      .limit(parseInt(limit));
    
    const total = await Course.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: courses.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single course
// @route   GET /api/admin/courses/:id
// @access  Private/Admin
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name email bio avatar')
      .populate('enrolledStudents', 'name email progress');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }
    
    // Get enrollments for this course
    const enrollments = await Enrollment.find({ course: req.params.id })
      .populate('user', 'name email')
      .sort({ enrolledAt: -1 });
    
    res.status(200).json({
      success: true,
      data: {
        course,
        enrollments,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new course
// @route   POST /api/admin/courses
// @access  Private/Admin
exports.createCourse = async (req, res, next) => {
  try {
    const courseData = {
      ...req.body,
      instructor: req.body.instructor || req.user.id,
      status: 'published', // Admin can publish directly
    };
    
    const course = await Course.create(courseData);
    
    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update course
// @route   PUT /api/admin/courses/:id
// @access  Private/Admin
exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('instructor', 'name email');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete course
// @route   DELETE /api/admin/courses/:id
// @access  Private/Admin
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }
    
    // Check if course has enrollments
    const enrollments = await Enrollment.countDocuments({ course: req.params.id });
    if (enrollments > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete course with active enrollments',
      });
    }
    
    await course.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve course
// @route   PUT /api/admin/courses/:id/approve
// @access  Private/Admin
exports.approveCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }
    
    if (course.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Course is not pending approval',
      });
    }
    
    course.status = 'published';
    await course.save();
    
    // TODO: Send notification to instructor
    
    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject course
// @route   PUT /api/admin/courses/:id/reject
// @access  Private/Admin
exports.rejectCourse = async (req, res, next) => {
  try {
    const { reason } = req.body;
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }
    
    if (course.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Course is not pending approval',
      });
    }
    
    course.status = 'rejected';
    course.rejectionReason = reason;
    await course.save();
    
    // TODO: Send rejection email to instructor
    
    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get courses pending approval
// @route   GET /api/admin/courses/pending
// @access  Private/Admin
exports.getPendingCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ status: 'pending' })
      .populate('instructor', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get course statistics
// @route   GET /api/admin/courses/stats
// @access  Private/Admin
exports.getCourseStats = async (req, res, next) => {
  try {
    const totalCourses = await Course.countDocuments();
    const publishedCourses = await Course.countDocuments({ status: 'published' });
    const pendingCourses = await Course.countDocuments({ status: 'pending' });
    const totalEnrollments = await Enrollment.countDocuments();
    
    const coursesByCategory = await Course.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    
    const topCourses = await Course.find({ status: 'published' })
      .sort({ studentsEnrolled: -1 })
      .limit(5)
      .select('title studentsEnrolled revenue ratings');
    
    res.status(200).json({
      success: true,
      data: {
        totalCourses,
        publishedCourses,
        pendingCourses,
        totalEnrollments,
        coursesByCategory,
        topCourses,
      },
    });
  } catch (error) {
    next(error);
  }
};
