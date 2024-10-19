import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Added PropTypes for validation
import aiService from '../services/aiService'; // Ensure the path matches your service structure
import styles from './AIContentGenerator.module.css'; // Adjusted for CSS Modules

const AIContentGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    
    setLoading(true);
    try {
      const content = await aiService.generateContent({ prompt });
      setGeneratedContent(content);
    } catch (error) {
      console.error("Failed to generate content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.aiContentGenerator}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt"
        className={styles.promptInput}
      />
      <button onClick={handleGenerate} className={styles.generateButton} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Content'}
      </button>
      {generatedContent && <p className={styles.generatedContent}>{generatedContent}</p>}
    </div>
  );
};

AIContentGenerator.propTypes = {
  prompt: PropTypes.string,
  generatedContent: PropTypes.string,
};

export default AIContentGenerator;