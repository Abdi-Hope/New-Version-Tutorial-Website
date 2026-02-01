const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect('mongodb://localhost:27017/ae-platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Create simple admin user
    await createAdminUser();
    
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Don't exit process for now
    // process.exit(1);
  }
};

const createAdminUser = async () => {
  try {
    const User = require('../models/User');
    const bcrypt = require('bcryptjs');
    
    // Check if admin exists
    const adminEmail = 'admin@aeplatform.com';
    const adminExists = await User.findOne({ email: adminEmail });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      await User.create({
        name: 'System Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        emailVerified: true,
      });
      console.log('✅ Default admin user created');
    }
  } catch (error) {
    console.log('⚠️ Note: Could not create admin user (models not ready yet)');
  }
};

module.exports = connectDB;
