/*
Task name: User endpoints

Requirements
  1.  We need to create CRUD endpoints
  2.  The entries (users) can just be saved in a noSQL database (Bonus for using Firebase Realtime Database)
  3.  Each user should have the following data entries: 
        id, name, zip code, latitude, longitude, timezone
  4.  When creating a user, allow input for name and zip code.  
      (Fetch the latitude, longitude, and timezone - Documentation: https://openweathermap.org/current) 
      (You will need to generate an API Key)
  5.  When updating a user, Re-fetch the latitude, longitude, and timezone (if zip code changes)
  6.  Connect to a ReactJS front-end
  * feel free to add add something creative you'd like

*/

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import configurations and middleware
const { initializeFirebase } = require('./config/firebase');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Import routes
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 8080;

// Initialize Firebase
initializeFirebase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/', routes);

// Error handling middleware (must be after routes)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`OpenWeatherMap API: ${process.env.OPENWEATHER_API_KEY ? 'Configured' : 'Not Configured'}`);
  console.log(`Firebase: ${process.env.FIREBASE_SERVICE_ACCOUNT_PATH ? 'Configured' : 'Not Configured'}`);
});
