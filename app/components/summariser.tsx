'use client';

import React, { useState } from 'react';

const Summariser = () => {
  const [blog, setBlog] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarise = async () => {
    if (!blog.trim()) {
      setSummary('⚠️ Please paste blog content first!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/summarise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: blog }),
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error(error);
      setSummary('❌ Could not connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📝 Blog Summariser</h1>
      <textarea
        rows={10}
        cols={70}
        value={blog}
        onChange={(e) => setBlog(e.target.value)}
        placeholder="Paste your blog content here..."
      />
      <br />
      <button onClick={handleSummarise} disabled={loading}>
        {loading ? 'Summarising...' : 'Summarise'}
      </button>
      <h2>Summary:</h2>
      <p>{summary}</p>
    </div>
  );
};

export default Summariser;
