const admin = require("firebase-admin");

let db = null;

const initializeFirebase = () => {
  try {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
    const databaseURL = process.env.FIREBASE_DATABASE_URL;

    if (!serviceAccountPath || !databaseURL) {
      throw new Error("Firebase configuration missing");
    }

    const serviceAccount = require(`../../${serviceAccountPath}`);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: databaseURL
    });

    db = admin.database();
    console.log("Firebase Admin SDK initialized successfully");
    return db;
  } catch (error) {
    console.log("Firebase initialization skipped - using in-memory storage for development");
    console.log("Error:", error.message);
    return null;
  }
};

const getDatabase = () => {
  return db;
};

module.exports = {
  initializeFirebase,
  getDatabase
}; 