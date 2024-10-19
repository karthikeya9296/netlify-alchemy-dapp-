import React from 'react';
import Navbar from '../components/navigation/navbar'; // Adjust path if necessary
import ContentCard from '../components/general/ContentCard';
import MembershipCard from '../components/general/MembershipCard';
import styles from '../styles/Home.module.css'; // Adjusted for CSS Modules

const HomePage = () => {
  const sampleContent = [
    { title: "Content 1", description: "Description of Content 1", image: "/path/to/image1.png" },
    { title: "Content 2", description: "Description of Content 2", image: "/path/to/image2.png" },
  ];

  const sampleMemberships = [
    { tier: "Gold", benefits: ["Access to premium content", "Exclusive webinars"] },
    { tier: "Platinum", benefits: ["All Gold benefits", "One-on-one coaching"] },
  ];

  return (
    <div className={styles.homeContainer}>
      <Navbar />
      <section className={styles.contentSection}>
        <h2>Explore Our Content</h2>
        <div className={styles.contentGrid}>
          {sampleContent.map((item, index) => (
            <ContentCard 
              key={index} 
              title={item.title} 
              description={item.description} 
              image={item.image} 
            />
          ))}
        </div>
      </section>

      <section className={styles.membershipSection}>
        <h2>Join Our Membership</h2>
        <div className={styles.membershipGrid}>
          {sampleMemberships.map((membership, index) => (
            <MembershipCard 
              key={index} 
              tier={membership.tier} 
              benefits={membership.benefits} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;