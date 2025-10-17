// Test db.js directly
const dotenv = require('dotenv');
dotenv.config();

console.log('Testing db.js...');
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);

const connectDB = require('./config/db');
console.log('connectDB is a function:', typeof connectDB === 'function');

// Try to connect
connectDB();
