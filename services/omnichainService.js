import axios from 'axios';
import LayerZeroMessaging from '@layer-zero/messaging-sdk'; // Example import for LayerZero

// Base URL for omnichain-related API routes (adjust as per your backend)
const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend-api.com/omnichain';

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

const omnichainService = {
  // 1. Transfer Assets Across Chains
  async transferAssets({ fromChain, toChain, assetId, walletAddress }) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.post(
        `${API_URL}/transfer-assets`,
        {
          fromChain,
          toChain,
          assetId,
          walletAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return response.data; // Return success message or transfer details
    } catch (error) {
      handleError(error, 'Failed to transfer assets across chains.');
    }
  },

  // 2. Fetch Supported Chains for Omnichain Services
  async getSupportedChains() {
    try {
      const response = await axios.get(`${API_URL}/supported-chains`);
      return response.data; // Return list of supported chains
    } catch (error) {
      handleError(error, 'Failed to fetch supported chains.');
    }
  },

  // 3. Retrieve Transfer Status
  async getTransferStatus(transferId) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.get(`${API_URL}/transfer-status`, {
        params: { transferId },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response.data; // Return status of the transfer
    } catch (error) {
      handleError(error, 'Failed to retrieve transfer status.');
    }
  },
};

export default omnichainService;