import React, { useState, useEffect } from 'react';
import authService from '../services/authService'; // Adjust path if necessary
import styles from '../styles/ProfilePage.module.css'; // Ensure this file exists for custom styles

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await authService.getProfile(); // Assuming this method exists in authService
        setProfile(userProfile);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.profilePage}>
      <h2>User Profile</h2>
      {profile ? (
        <div className={styles.profileDetails}>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Username:</strong> {profile.username}</p>
          {/* Add other profile fields as needed */}
        </div>
      ) : (
        <p>No profile information available.</p>
      )}
    </div>
  );
};

export default ProfilePage;