import React, { useState } from 'react';
import authService from '../services/authService'; // Adjust path if necessary
import styles from '../styles/RegisterPage.module.css'; // Ensure this file exists for custom styles

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.register({ username, email, password, walletAddress });
      // Redirect or show success message
      console.log('Registration successful!');
    } catch (error) {
      console.error("Registration failed:", error);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleRegister} className={styles.registerForm}>
        <h2>Register</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="walletAddress">Wallet Address</label>
          <input
            type="text"
            id="walletAddress"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.registerButton} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;