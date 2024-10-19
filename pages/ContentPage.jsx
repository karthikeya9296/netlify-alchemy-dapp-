import React, { useState, useEffect } from 'react';
import ContentCard from '../components/general/ContentCard';
import contentService from '../services/contentService'; // Adjust path if necessary
import styles from '../styles/ContentPage.module.css'; // Ensure this file exists for custom styles

const ContentPage = () => {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await contentService.getContentList(); // Assuming this service method exists
        setContentList(content);
      } catch (error) {
        console.error("Failed to fetch content:", error);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return <p>Loading content...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.contentPage}>
      <h2>Available Content</h2>
      <div className={styles.contentGrid}>
        {contentList.map((item, index) => (
          <ContentCard
            key={index}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentPage;