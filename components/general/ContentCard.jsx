import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContentCard.module.css';

const ContentCard = ({ title, description, image }) => {
  return (
    <div className={styles.contentCard}>
      {image && <img src={image} alt={title} className={styles.contentImage} />}
      <h3 className={styles.contentTitle}>{title}</h3>
      <p className={styles.contentDescription}>{description}</p>
    </div>
  );
};

ContentCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default ContentCard;