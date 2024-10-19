import React from 'react';
import PropTypes from 'prop-types'; // Added PropTypes for validation
import styles from './Notification.module.css'; // Adjusted for CSS Modules

const Notification = ({ message, type }) => {
  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']).isRequired, // Ensuring valid type options
};

export default Notification;