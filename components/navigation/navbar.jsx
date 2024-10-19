import React from 'react';
import { Link } from 'react-router-dom'; // If you're using Next.js, replace with Next.js' Link component
import styles from './Navbar.module.css'; // Adjusted import for CSS Module

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link href="/" className={styles.navbarLogo}>Kosma</Link>
        <ul className={styles.navbarMenu}>
          <li><Link href="/content" className={styles.navbarLink}>Content</Link></li>
          <li><Link href="/membership" className={styles.navbarLink}>Membership</Link></li>
          <li><Link href="/profile" className={styles.navbarLink}>Profile</Link></li>
          <li><Link href="/settings" className={styles.navbarLink}>Settings</Link></li>
          <li><Link href="/login" className={styles.navbarLink}>Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;