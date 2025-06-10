/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', err.stack);
  
  // Default error
  let error = {
    success: false,
    message: err.message || 'Something went wrong!',
    status: err.statusCode || 500
  };

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = {
      success: false,
      message: message.join(', '),
      status: 400
    };
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = {
      success: false,
      message,
      status: 400
    };
  }

  // Firebase errors
  if (err.code && err.code.startsWith('auth/')) {
    error = {
      success: false,
      message: 'Firebase authentication error',
      status: 401
    };
  }

  // Only send error details in development
  if (process.env.NODE_ENV === 'development') {
    error.error = err.message;
    error.stack = err.stack;
  }

  res.status(error.status).json(error);
};

/**
 * 404 handler for unmatched routes
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
}; 