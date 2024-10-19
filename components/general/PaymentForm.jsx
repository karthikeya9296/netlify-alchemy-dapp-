import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Added PropTypes for validation
import styles from './PaymentForm.module.css'; // Adjusted for CSS Modules

const PaymentForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount) {
      onSubmit(amount);
      setAmount(''); // Clear the input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.paymentForm}>
      <label htmlFor="amount" className={styles.label}>Amount:</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={styles.input}
        placeholder="Enter amount"
      />
      <button type="submit" className={styles.submitButton}>Pay</button>
    </form>
  );
};

PaymentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PaymentForm;