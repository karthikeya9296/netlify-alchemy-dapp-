import React, { useState, useEffect } from 'react';
import authService from '../services/authService'; // Adjust path if necessary
import styles from '../styles/SettingsPage.module.css'; // Ensure this file exists for custom styles

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: false,
    darkMode: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const userSettings = await authService.getUserSettings(); // Assuming this service method exists
        setSettings(userSettings);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
        setError('Failed to load settings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSaveSettings = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.saveUserSettings(settings); // Assuming this service method exists
      setSuccess('Settings saved successfully.');
    } catch (error) {
      console.error("Failed to save settings:", error);
      setError('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className={styles.settingsPage}>
      <h2>Settings</h2>
      {loading && <p>Loading settings...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <div className={styles.settingsForm}>
        <label>
          <input
            type="checkbox"
            name="emailNotifications"
            checked={settings.emailNotifications}
            onChange={handleChange}
          />
          Email Notifications
        </label>
        <label>
          <input
            type="checkbox"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
          />
          Dark Mode
        </label>
        <button onClick={handleSaveSettings} disabled={loading} className={styles.saveButton}>
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;