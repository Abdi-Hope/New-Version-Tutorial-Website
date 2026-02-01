module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  adminRoles: ['admin', 'super_admin'],
  instructorRoles: ['instructor', 'admin', 'super_admin'],
  
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },
  
  fileUpload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  },
  
  email: {
    from: process.env.EMAIL_FROM || 'noreply@aeplatform.com',
  },
};
