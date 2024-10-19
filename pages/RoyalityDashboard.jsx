import React, { useState, useEffect } from 'react';
import contentService from '../services/contentService'; // Adjust path if necessary
import styles from '../styles/RoyaltyDashboard.module.css'; // Ensure this file exists for custom styles

const RoyaltyDashboard = () => {
  const [royalties, setRoyalties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoyalties = async () => {
      try {
        const data = await contentService.getRoyalties(); // Assuming this service method exists
        setRoyalties(data);
      } catch (error) {
        console.error("Failed to fetch royalties:", error);
        setError('Failed to load royalties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoyalties();
  }, []);

  if (loading) {
    return <p>Loading royalties...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.royaltyDashboard}>
      <h2>Royalty Dashboard</h2>
      <table className={styles.royaltyTable}>
        <thead>
          <tr>
            <th>Content</th>
            <th>Revenue</th>
            <th>License Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {royalties.length > 0 ? (
            royalties.map((royalty, index) => (
              <tr key={index}>
                <td>{royalty.contentTitle}</td>
                <td>{`$${royalty.revenue.toFixed(2)}`}</td>
                <td>{royalty.licenseType}</td>
                <td>{royalty.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No royalties available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoyaltyDashboard;