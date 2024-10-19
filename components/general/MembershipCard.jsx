import React from 'react';
import PropTypes from 'prop-types'; // Added PropTypes for validation
import styles from './MembershipCard.module.css'; // Adjusted for CSS Modules

const MembershipCard = ({ tier, benefits }) => {
  return (
    <div className={styles.membershipCard}>
      <h3 className={styles.tierTitle}>{tier}</h3>
      <ul className={styles.benefitsList}>
        {benefits.map((benefit, index) => (
          <li key={index} className={styles.benefitItem}>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
};

MembershipCard.propTypes = {
  tier: PropTypes.string.isRequired,
  benefits: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MembershipCard;