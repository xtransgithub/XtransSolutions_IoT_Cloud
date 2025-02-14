import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from "../../config";

const Prediction = () => {
  const [formData, setFormData] = useState({
    channel_id: '',
    field: '',
    prediction_hours: '',
  });

  const [channels, setChannels] = useState([]);
  const [fields, setFields] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loadingChannels, setLoadingChannels] = useState(true);

  const token = localStorage.getItem('token'); // Retrieve the token from localStorage

  // Fetch channels when the component is mounted
  useEffect(() => {
    if (!token) {
      setError('Authorization token is missing.');
      return;
    }

    const fetchChannels = async () => {
      try {
        const response = await axios.get(`${server}api/auth/channels`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChannels(response.data.channels);
        setLoadingChannels(false);
      } catch (err) {
        setError('Error fetching channels.');
      }
    };

    fetchChannels();
  }, [token]);

  // Handle channel selection and fetch corresponding fields
  const handleChannelChange = async (e) => {
    const channelId = e.target.value;
    setFormData((prevState) => ({ ...prevState, channel_id: channelId }));

    // Fetch fields based on selected channel
    if (channelId) {
      try {
        const selectedChannel = channels.find(channel => channel._id === channelId);
        setFields(selectedChannel?.fields || []);
      } catch (err) {
        setError('Error fetching fields for this channel.');
      }
    } else {
      setFields([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!token) {
      setError('Authorization token is missing.');
      return;
    }

    try {
      const response = await axios.post('http://cloud.xtranssolutions.com/fla/prediction', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred.');
    }
  };

  // Function to format timestamp to a more human-readable format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    }) + ' (UTC)';
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Data Prediction</h2>

      {loadingChannels ? (
        <div>Loading channels...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="channel_id" className="form-label">Channel ID:</label>
            <select
              id="channel_id"
              name="channel_id"
              value={formData.channel_id}
              onChange={handleChannelChange}
              className="form-select"
              required
            >
              <option value="">Select a Channel</option>
              {channels.map((channel) => (
                <option key={channel._id} value={channel._id}>
                  {channel.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="field" className="form-label">Field:</label>
            <select
              id="field"
              name="field"
              value={formData.field}
              onChange={handleChange}
              className="form-select"
              required
              disabled={!formData.channel_id}
            >
              <option value="">Select a Field</option>
              {fields.length > 0 ? (
                fields.map((field, index) => (
                  <option key={index} value={field}>
                    {field}
                  </option>
                ))
              ) : (
                <option value="">No fields available</option>
              )}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="prediction_hours" className="form-label">Prediction Hours:</label>
            <input
              type="number"
              id="prediction_hours"
              name="prediction_hours"
              value={formData.prediction_hours}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Predict</button>
        </form>
      )}

      {result && result.forecast && (
        <div className="mt-4">
          <h3 className="text-success">Forecast Results</h3>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {result.forecast.map((item, index) => (
                <tr key={index}>
                  <td>{formatTimestamp(item.timestamp)}</td>
                  <td>{item.value.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-4">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default Prediction;
