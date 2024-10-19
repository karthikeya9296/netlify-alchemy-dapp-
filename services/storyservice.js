import axios from 'axios';

// Base URL for story-related API routes (adjust as per your backend)
const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend-api.com/stories';

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

const storyService = {
  // 1. Create Story
  async createStory({ title, content, author }) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.post(
        `${API_URL}/create`,
        {
          title,
          content,
          author,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return response.data; // Return success message or story details
    } catch (error) {
      handleError(error, 'Failed to create story.');
    }
  },

  // 2. Fetch All Stories
  async fetchAllStories() {
    try {
      const response = await axios.get(`${API_URL}/all`);
      return response.data; // Return the list of all stories
    } catch (error) {
      handleError(error, 'Failed to fetch stories.');
    }
  },

  // 3. Update Story
  async updateStory({ storyId, title, content }) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.put(
        `${API_URL}/update/${storyId}`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return response.data; // Return success message or updated story details
    } catch (error) {
      handleError(error, 'Failed to update story.');
    }
  },

  // 4. Delete Story
  async deleteStory(storyId) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.delete(`${API_URL}/delete/${storyId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response.data; // Return success message on story deletion
    } catch (error) {
      handleError(error, 'Failed to delete story.');
    }
  },
};

export default storyService;