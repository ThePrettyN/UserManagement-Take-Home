const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');

// Welcome endpoint
router.get('/', (req, res) => {
  console.log('Triggering "/" endpoint...');
  
  const companyName = "SMART";
  console.log("companyName = ", companyName);
  
  res.json({
    message: `Welcome to the ${companyName} interview!`,
    endpoints: {
      "GET /users": "Get all users",
      "GET /users/:id": "Get user by ID", 
      "POST /users": "Create new user (requires name and zipCode)",
      "PUT /users/:id": "Update user by ID",
      "DELETE /users/:id": "Delete user by ID",
      "GET /health": "Health check"
    }
  });
});

// Health check endpoint
router.get('/health', (req, res) => {
  const { getDatabase } = require('../config/firebase');
  const db = getDatabase();
  
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    database: db ? "Firebase" : "In-Memory",
    environment: {
      openWeatherMap: process.env.OPENWEATHER_API_KEY ? 'Configured' : 'Not Configured',
      firebase: process.env.FIREBASE_SERVICE_ACCOUNT_PATH ? 'Configured' : 'Not Configured'
    }
  });
});

// Mount user routes
router.use('/users', userRoutes);

module.exports = router; 