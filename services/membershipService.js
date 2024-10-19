import axios from 'axios';

// Base URL for membership-related API routes (adjust as per your backend)
const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend-api.com/memberships';

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

const membershipService = {
  // 1. Subscribe to Membership Tier
  async subscribe({ tierId, walletAddress }) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.post(
        `${API_URL}/subscribe`,
        {
          tierId,
          walletAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return response.data; // Return subscription success details
    } catch (error) {
      handleError(error, 'Failed to subscribe to membership tier.');
    }
  },

  // 2. Fetch Available Membership Tiers
  async getMembershipTiers() {
    try {
      const response = await axios.get(`${API_URL}/tiers`);
      return response.data; // Return list of available membership tiers
    } catch (error) {
      handleError(error, 'Failed to fetch membership tiers.');
    }
  },

  // 3. Fetch User's Active Memberships
  async getUserMemberships(walletAddress) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.get(`${API_URL}/user-memberships`, {
        params: { walletAddress },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response.data; // Return user's active memberships
    } catch (error) {
      handleError(error, 'Failed to fetch user memberships.');
    }
  },

  // 4. Cancel Membership Subscription
  async cancelSubscription(membershipId) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.delete(`${API_URL}/cancel/${membershipId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response.data; // Return cancellation success message
    } catch (error) {
      handleError(error, 'Failed to cancel membership subscription.');
    }
  },
};

export default membershipService;