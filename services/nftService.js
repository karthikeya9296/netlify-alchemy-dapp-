import axios from 'axios';
import { ethers } from 'ethers'; // Assuming ethers.js is used for interacting with Ethereum

// Base URL for NFT-related API routes (adjust as per your backend)
const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend-api.com/nfts';

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

const nftService = {
  // 1. Mint New NFT
  async mintNFT({ tokenURI, walletAddress }) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.post(
        `${API_URL}/mint`,
        {
          tokenURI,
          walletAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return response.data; // Return details of the minted NFT
    } catch (error) {
      handleError(error, 'Failed to mint NFT.');
    }
  },

  // 2. Transfer NFT
  async transferNFT({ nftId, fromAddress, toAddress }) {
    try {
      const authToken = getAuthToken();
      if (isTokenExpired(authToken)) throw new Error('Session expired. Please log in again.');

      const response = await axios.post(
        `${API_URL}/transfer`,
        {
          nftId,
          fromAddress,
          toAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return response.data; // Return success message or transfer details
    } catch (error) {
      handleError(error, 'Failed to transfer NFT.');
    }
  },

  // 3. Fetch User's NFTs
  async getUserNFTs(walletAddress) {
    try {
      const response = await axios.get(`${API_URL}/user-nfts`, {
        params: { walletAddress },
      });
      return response.data; // Return the list of user's NFTs
    } catch (error) {
      handleError(error, 'Failed to fetch user NFTs.');
    }
  },

  // 4. Interact with NFT Smart Contract
  async interactWithContract(contractAddress, abi, method, params, signer) {
    try {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const result = await contract[method](...params);
      return result;
    } catch (error) {
      handleError(error, 'Failed to interact with the NFT smart contract.');
    }
  },
};

export default nftService;