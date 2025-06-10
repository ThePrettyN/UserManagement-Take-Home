const { getDatabase } = require('../config/firebase');

// In-memory storage fallback for development
let inMemoryUsers = {};
let userIdCounter = 1;

/**
 * Save user to database
 */
async function saveUser(userData) {
  const db = getDatabase();
  
  if (db) {
    const userRef = db.ref('users').push();
    const userWithId = { ...userData, id: userRef.key };
    await userRef.set(userWithId);
    return userWithId;
  } else {
    // Fallback to in-memory storage
    const id = userIdCounter.toString();
    userIdCounter++;
    const userWithId = { ...userData, id };
    inMemoryUsers[id] = userWithId;
    return userWithId;
  }
}

/**
 * Get user by ID
 */
async function getUser(id) {
  const db = getDatabase();
  
  if (db) {
    const snapshot = await db.ref(`users/${id}`).once('value');
    return snapshot.val();
  } else {
    return inMemoryUsers[id] || null;
  }
}

/**
 * Get all users
 */
async function getAllUsers() {
  const db = getDatabase();
  
  if (db) {
    const snapshot = await db.ref('users').once('value');
    const users = snapshot.val() || {};
    return Object.values(users);
  } else {
    return Object.values(inMemoryUsers);
  }
}

/**
 * Update user by ID
 */
async function updateUser(id, userData) {
  const db = getDatabase();
  
  if (db) {
    const userWithId = { ...userData, id };
    await db.ref(`users/${id}`).set(userWithId);
    return userWithId;
  } else {
    if (inMemoryUsers[id]) {
      inMemoryUsers[id] = { ...userData, id };
      return inMemoryUsers[id];
    }
    return null;
  }
}

/**
 * Delete user by ID
 */
async function deleteUser(id) {
  const db = getDatabase();
  
  if (db) {
    await db.ref(`users/${id}`).remove();
    return true;
  } else {
    if (inMemoryUsers[id]) {
      delete inMemoryUsers[id];
      return true;
    }
    return false;
  }
}

module.exports = {
  saveUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
}; 