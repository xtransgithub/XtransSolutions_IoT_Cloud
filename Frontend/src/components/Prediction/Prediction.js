import React, { useState } from 'react';
import axios from 'axios';
import './Prediction.css';

const Prediction = () => {
  const [formData, setFormData] = useState({
    channel_id: '',
    field: '',
    prediction_hours: '',
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

    try {
      const response = await axios.post('http://localhost:5000/prediction', formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <div className="prediction">
      <h2>Data Prediction</h2>
      <form onSubmit={handleSubmit}>
        <label>Channel ID:</label>
        <input type="text" name="channel_id" onChange={handleChange} required />

        <label>Field:</label>
        <input type="text" name="field" onChange={handleChange} required />

        <label>Prediction Hours:</label>
        <input type="number" name="prediction_hours" onChange={handleChange} required />

        <button type="submit">Predict</button>
      </form>

      {result && result.forecast && (
        <div className="result">
          <h3>Forecast Results</h3>
          <table className="result-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {result.forecast.map((item, index) => (
                <tr key={index}>
                  <td>{item.timestamp}</td>
                  <td>{item.value.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {error && <div className="error">Error: {error}</div>}
    </div>
  );
};

export default Prediction;
