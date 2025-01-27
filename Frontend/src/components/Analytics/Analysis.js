import React, { useState } from 'react';
import axios from 'axios';
import './Analysis.css';

const Analysis = () => {
  const [formData, setFormData] = useState({
    channel_id: '',
    analysis_type: '',
    field: '',
    num_entries: '',
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    // Retrieve the token from localStorage (or use another storage mechanism)
    const token = localStorage.getItem('token'); // Adjust this according to how you store the token

    if (!token) {
      setError('Authorization token is missing.');
      return;
    }

    try {
      // Add the Authorization header with the Bearer token
      const response = await axios.post('http://localhost:5000/analysis', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <div className="analysis">
      <h2>Data Analysis</h2>
      <form onSubmit={handleSubmit}>
        <label>Channel ID:</label>
        <input
          type="text"
          name="channel_id"
          onChange={handleChange}
          required
          value={formData.channel_id}
        />

        <label>Field:</label>
        <input
          type="text"
          name="field"
          onChange={handleChange}
          required
          value={formData.field}
        />

        <label>Analysis Type:</label>
        <select
          name="analysis_type"
          onChange={handleChange}
          required
          value={formData.analysis_type}
        >
          <option value="">Select</option>
          <option value="average">Average</option>
          <option value="median">Median</option>
          <option value="mode">Mode</option>
          <option value="max">Max</option>
          <option value="min">Min</option>
        </select>

        <label>Number of Entries:</label>
        <input
          type="number"
          name="num_entries"
          onChange={handleChange}
          required
          value={formData.num_entries}
        />

        <button type="submit">Analyze</button>
      </form>

      {result && (
  <div className="result">
    <h3>Analysis Result:</h3>
    <div className="result-content">
      {Object.entries(result).map(([key, value]) => (
        <div className="result-row" key={key}>
          <span className="result-key">{key}:</span>
          <span className="result-value">{value}</span>
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
};

export default Analysis;
