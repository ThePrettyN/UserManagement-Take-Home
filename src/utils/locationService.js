const axios = require("axios");

/**
 * Get location data from OpenWeatherMap API
 * @param {string} zipCode - Zip code to fetch location data for
 * @returns {Promise<Object>} Location data with latitude, longitude, and timezone
 */
async function getLocationData(zipCode) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      throw new Error("OpenWeatherMap API key not configured");
    }

    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`
    );

    const { coord, timezone } = response.data;
    return {
      latitude: coord.lat,
      longitude: coord.lon,
      timezone: timezone
    };
  } catch (error) {
    console.error("Error fetching location data:", error.message);
    if (error.response && error.response.status === 404) {
      throw new Error("Invalid zip code - location not found");
    }
    throw new Error("Failed to fetch location data for the provided zip code");
  }
}

module.exports = {
  getLocationData
}; 