import axios from 'axios';

// Base URL for attestation-related API routes (adjust as per your backend)
const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend-api.com/attestations';

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

const attestService = {
  // 1. Create Attestation
  async createAttestation({ data, attester }) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.post(
        `${API_URL}/create`,
        {
          data,
          attester,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return response.data; // Return success message or attestation details
    } catch (error) {
      handleError(error, 'Failed to create attestation.');
    }
  },

  // 2. Verify Attestation
  async verifyAttestation(attestationId) {
    try {
      const response = await axios.get(`${API_URL}/verify/${attestationId}`);
      return response.data; // Return verification result
    } catch (error) {
      handleError(error, 'Failed to verify attestation.');
    }
  },

  // 3. Fetch User's Attestations
  async getUserAttestations(walletAddress) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.get(`${API_URL}/user-attestations`, {
        params: { walletAddress },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response.data; // Return list of user's attestations
    } catch (error) {
      handleError(error, 'Failed to fetch user attestations.');
    }
  },
};

export default attestService;