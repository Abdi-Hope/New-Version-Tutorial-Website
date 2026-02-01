const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5179',
  credentials: true,
}));
app.use(express.json());

// Test routes
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Welcome to AE Platform API',
    version: '1.0.0',
    status: 'running'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: 'connected'
  });
});

// Simple admin routes
app.get('/api/admin/test', (req, res) => {
  res.json({ 
    success: true,
    message: 'Admin API endpoint is accessible',
    endpoints: {
      users: '/api/admin/users',
      courses: '/api/admin/courses',
      dashboard: '/api/admin/dashboard'
    }
  });
});

// Mock admin routes for testing
app.get('/api/admin/dashboard', (req, res) => {
  res.json({
    success: true,
    data: {
      stats: {
        totalUsers: 1250,
        totalCourses: 45,
        totalRevenue: 12500,
        activeUsers: 890
      },
      recentActivities: [
        { id: 1, action: 'user_registered', user: 'John Doe', time: '2 mins ago' },
        { id: 2, action: 'course_published', course: 'React Basics', time: '1 hour ago' },
        { id: 3, action: 'payment_received', amount: 49.99, time: '3 hours ago' }
      ]
    }
  });
});

// Mock users endpoint
app.get('/api/admin/users', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'Admin User', email: 'admin@aeplatform.com', role: 'admin', status: 'active' },
      { id: 2, name: 'Instructor One', email: 'instructor@example.com', role: 'instructor', status: 'active' },
      { id: 3, name: 'Student One', email: 'student@example.com', role: 'student', status: 'active' }
    ]
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;
