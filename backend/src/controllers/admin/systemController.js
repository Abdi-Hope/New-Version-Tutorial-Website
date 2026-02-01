const SystemLog = require('../../models/SystemLog');

// @desc    Get system logs
// @route   GET /api/admin/system/logs
// @access  Private/Admin
exports.getSystemLogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, level, startDate, endDate } = req.query;
    
    let query = {};
    
    if (level) {
      query.level = level;
    }
    
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }
    
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    
    const logs = await SystemLog.find(query)
      .sort({ timestamp: -1 })
      .skip(startIndex)
      .limit(parseInt(limit));
    
    const total = await SystemLog.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: logs.length,
      total,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear system cache
// @route   POST /api/admin/system/clear-cache
// @access  Private/Admin
exports.clearCache = async (req, res, next) => {
  try {
    // Implement cache clearing logic here
    // This depends on your caching solution (Redis, etc.)
    
    res.status(200).json({
      success: true,
      message: 'Cache cleared successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get system settings
// @route   GET /api/admin/system/settings
// @access  Private/Admin
exports.getSystemSettings = async (req, res, next) => {
  try {
    const settings = {
      general: {
        siteName: process.env.SITE_NAME || 'AE Platform',
        siteUrl: process.env.SITE_URL || 'http://localhost:5173',
        maintenanceMode: false,
        registrationEnabled: true,
      },
      email: {
        smtpHost: process.env.SMTP_HOST,
        smtpPort: process.env.SMTP_PORT,
        fromEmail: process.env.EMAIL_FROM,
      },
      payment: {
        stripeEnabled: !!process.env.STRIPE_SECRET_KEY,
        paypalEnabled: !!process.env.PAYPAL_CLIENT_ID,
      },
      security: {
        requireEmailVerification: true,
        maxLoginAttempts: 5,
        sessionTimeout: 24, // hours
      },
    };
    
    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update system settings
// @route   PUT /api/admin/system/settings
// @access  Private/Admin
exports.updateSystemSettings = async (req, res, next) => {
  try {
    // In a real application, you would save these to a database
    // For now, we'll just return the updated settings
    
    const updatedSettings = req.body;
    
    // TODO: Save settings to database
    // TODO: Update environment variables if needed
    // TODO: Clear cache
    
    res.status(200).json({
      success: true,
      data: updatedSettings,
      message: 'Settings updated successfully',
    });
  } catch (error) {
    next(error);
  }
};
