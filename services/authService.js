import axios from 'axios';

// Base URL for authentication-related API routes (adjust as per your backend)
const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend-api.com/auth';

// Helper function to store the authentication token
const setAuthToken = (token) => localStorage.setItem('authToken', token);

// Helper function to get the authentication token
const getAuthToken = () => localStorage.getItem('authToken');

// Helper function to remove the authentication token
const clearAuthToken = () => localStorage.removeItem('authToken');

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

const authService = {
  // 1. Register User
  async register({ username, email, password, walletAddress }) {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
        walletAddress,
      });
      setAuthToken(response.data.token); // Store the authentication token
      return response.data; // Return registration success details
    } catch (error) {
      handleError(error, 'Failed to register user.');
    }
  },

  // 2. Login User
  async login({ identifier, password }) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        identifier,
        password,
      });
      setAuthToken(response.data.token); // Store the authentication token
      return response.data; // Return login success details
    } catch (error) {
      handleError(error, 'Failed to log in.');
    }
  },

  // 3. Logout User
  async logout() {
    clearAuthToken(); // Remove the authentication token
  },

  // 4. Fetch User Profile
  async getProfile() {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response.data; // Return user profile data
    } catch (error) {
      handleError(error, 'Failed to fetch user profile.');
    }
  },

  // 5. Save User Settings
  async saveUserSettings(settings) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.put(`${API_URL}/settings`, settings, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response.data; // Return success message or updated settings details
    } catch (error) {
      handleError(error, 'Failed to save user settings.');
    }
  },

  // 6. Fetch User Settings
  async getUserSettings() {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.get(`${API_URL}/settings`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response.data; // Return user settings
    } catch (error) {
      handleError(error, 'Failed to fetch user settings.');
    }
  },
};

export default authService;