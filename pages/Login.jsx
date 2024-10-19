import React, { useState } from 'react';
import authService from '../services/authService'; // Adjust path if necessary
import styles from '../styles/Login.module.css'; // Ensure this file exists for custom styles

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login({ identifier, password });
      // Redirect or show success message
      console.log('Login successful!');
    } catch (error) {
      console.error("Login failed:", error);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="identifier">Email or Username</label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
        <button type="submit" className={styles.loginButton} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;