import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Ensure react-router-dom is installed
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to="/" className={styles.navbarLogo}>
          MyApp
        </Link>
        <ul className={styles.navbarMenu}>
          <li>
            <NavLink to="/" exact activeClassName={styles.active} className={styles.navbarLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/content" activeClassName={styles.active} className={styles.navbarLink}>
              Content
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" activeClassName={styles.active} className={styles.navbarLink}>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/membership" activeClassName={styles.active} className={styles.navbarLink}>
              Membership
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;