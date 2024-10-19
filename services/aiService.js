import axios from 'axios';

// Base URL for AI-related API routes (adjust as per your backend)
const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend-api.com/ai';

// Helper function to get the authentication token
const getAuthToken = () => localStorage.getItem('authToken');

// Helper function to check if JWT token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the token
    return decoded.exp * 1000 < Date.now(); // Return true if token is expired
  } catch (error) {
    return true; // Return true if decoding fails (indicating an invalid token)
  }
};

// Centralized error handling to provide better user feedback
const handleError = (error, fallbackMessage) => {
  const message = error.response?.data?.message || fallbackMessage || 'An unexpected error occurred. Please try again.';
  console.error(`Error: ${message}`, error); // Log the error for debugging purposes
  throw new Error(message); // Throw the error to propagate it further
};

const aiService = {
  // 1. Generate Content Based on a Prompt
  async generateContent({ prompt }) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.post(
        `${API_URL}/generate`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return response.data; // Return generated content
    } catch (error) {
      handleError(error, 'Failed to generate AI content.');
    }
  },

  // 2. Fetch AI Model Details
  async getModelDetails() {
    try {
      const response = await axios.get(`${API_URL}/model-details`);
      return response.data; // Return AI model details
    } catch (error) {
      handleError(error, 'Failed to fetch AI model details.');
    }
  },

  // 3. Train AI Model with User Input
  async trainModel({ trainingData }) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.post(
        `${API_URL}/train`,
        { trainingData },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return response.data; // Return success message or training details
    } catch (error) {
      handleError(error, 'Failed to train the AI model.');
    }
  },
};

export default aiService;