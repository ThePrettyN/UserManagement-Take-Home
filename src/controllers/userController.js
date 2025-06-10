const userService = require('../services/userService');
const { getLocationData } = require('../utils/locationService');

/**
 * Get all users
 */
async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message
    });
  }
}

/**
 * Get user by ID
 */
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await userService.getUser(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message
    });
  }
}

/**
 * Create new user
 */
async function createUser(req, res) {
  try {
    const { name, zipCode } = req.body;
    
    // Validation
    if (!name || !zipCode) {
      return res.status(400).json({
        success: false,
        message: "Name and zipCode are required"
      });
    }
    
    // Get location data from OpenWeatherMap
    const locationData = await getLocationData(zipCode);
    
    // Create user object
    const userData = {
      name,
      zipCode,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      timezone: locationData.timezone,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Save to database
    const savedUser = await userService.saveUser(userData);
    
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: savedUser
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message
    });
  }
}

/**
 * Update user by ID
 */
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, zipCode } = req.body;
    
    // Check if user exists
    const existingUser = await userService.getUser(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    // Prepare update data
    let userData = {
      ...existingUser,
      updatedAt: new Date().toISOString()
    };
    
    // Update name if provided
    if (name) {
      userData.name = name;
    }
    
    // Update zip code and re-fetch location data if zip code changed
    if (zipCode && zipCode !== existingUser.zipCode) {
      const locationData = await getLocationData(zipCode);
      userData.zipCode = zipCode;
      userData.latitude = locationData.latitude;
      userData.longitude = locationData.longitude;
      userData.timezone = locationData.timezone;
    }
    
    // Save updated user
    const updatedUserData = await userService.updateUser(id, userData);
    
    res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUserData
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message
    });
  }
}

/**
 * Delete user by ID
 */
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    
    // Check if user exists
    const existingUser = await userService.getUser(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    // Delete user
    await userService.deleteUser(id);
    
    res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message
    });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}; 