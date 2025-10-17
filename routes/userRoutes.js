const express = require('express');
const router = express.Router();
const User = require('../models/User');

// CREATE user - WITH REAL DATABASE SAVING
router.post('/', async (req, res) => {
  try {
    console.log('📝 Creating user in database...');
    const { name, email, age } = req.body;

    // Create and save user to MongoDB
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      age: parseInt(age)
    });

    const savedUser = await user.save();
    console.log('✅ User saved to database:', savedUser._id);

    res.json({
      success: true,
      message: 'User created and saved to database!',
      data: savedUser
    });
    
  } catch (error) {
    console.error('❌ Error saving user to database:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET all users - FROM REAL DATABASE
router.get('/', async (req, res) => {
  try {
    console.log('🔍 Fetching users from database...');
    
    const users = await User.find().sort({ createdAt: -1 });
    console.log(`✅ Found ${users.length} users in database`);
    
    res.json({
      success: true,
      count: users.length,
      message: `Found ${users.length} users in database`,
      data: users
    });
    
  } catch (error) {
    console.error('❌ Error fetching users from database:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;