const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 5000;

console.log('🚀 Starting AE Platform Backend...');

// Connect to MongoDB first
connectDB().then(() => {
  // Start the server
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
    console.log(`👑 Admin Test: http://localhost:${PORT}/api/admin/test`);
    console.log(`📊 Dashboard: http://localhost:${PORT}/api/admin/dashboard`);
    console.log(`👥 Users: http://localhost:${PORT}/api/admin/users`);
  });
}).catch((err) => {
  console.error('❌ Failed to start server:', err.message);
  console.log('⚠️ Starting server without database connection...');
  
  // Start server even without DB for testing
  app.listen(PORT, () => {
    console.log(`⚠️ Server running WITHOUT database on port ${PORT}`);
    console.log(`⚠️ Note: Some features may not work properly`);
  });
});
