import axios from 'axios';

// Base URL for payment-related API routes (adjust as per your backend)
const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend-api.com/payments';

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

const paymentService = {
  // 1. Make Payment securely
  async makePayment({ amount, walletAddress }) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.post(
        `${API_URL}/make-payment`,
        {
          amount,
          walletAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return response.data; // Return success message or payment details
    } catch (error) {
      handleError(error, 'Failed to make payment.');
    }
  },

  // 2. Fetch Payment History
  async getPaymentHistory(walletAddress) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.get(`${API_URL}/payment-history`, {
        params: { walletAddress },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response.data; // Return the user's payment history
    } catch (error) {
      handleError(error, 'Failed to fetch payment history.');
    }
  },

  // 3. Retrieve Payment Status
  async getPaymentStatus(paymentId) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.get(`${API_URL}/payment-status`, {
        params: { paymentId },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response.data; // Return status of the payment
    } catch (error) {
      handleError(error, 'Failed to retrieve payment status.');
    }
  },
};

export default paymentService;