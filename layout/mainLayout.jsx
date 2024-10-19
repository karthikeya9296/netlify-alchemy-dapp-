import React from 'react';
import Navbar from '../components/navigation/navbar'; // Adjust the path if necessary
import PropTypes from 'prop-types';
import styles from './mainLayout.module.css'; // Make sure this CSS module exists

const MainLayout = ({ children }) => {
  return (
    <div className={styles.mainLayout}>
      <Navbar />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;