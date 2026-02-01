const config = require('../config/config');

exports.isAdmin = (req, res, next) => {
  if (!config.adminRoles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.',
    });
  }
  next();
};

exports.isSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'super_admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Super admin privileges required.',
    });
  }
  next();
};

exports.checkPermission = (permission) => {
  return (req, res, next) => {
    // Define admin permissions
    const adminPermissions = {
      admin: ['read_users', 'create_users', 'update_users', 'delete_users',
              'read_courses', 'create_courses', 'update_courses', 'delete_courses',
              'read_analytics', 'manage_settings'],
      super_admin: ['*'], // All permissions
    };

    const userPermissions = adminPermissions[req.user.role] || [];
    
    if (!userPermissions.includes('*') && !userPermissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: `You don't have permission to ${permission}`,
      });
    }
    
    next();
  };
};
