import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../config";
import { Modal, Button } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {AdvancedImage} from '@cloudinary/react';
import images from '../../assets/index'

const Prediction = () => {
  const [formData, setFormData] = useState({
    channel_id: "",
    field: "",
    prediction_hours: "",
  });

  const [channels, setChannels] = useState([]);
  const [fields, setFields] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loadingChannels, setLoadingChannels] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token"); 

  useEffect(() => {
    if (!token) {
      setError("Authorization token is missing.");
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
        setError("Error fetching channels.");
      }
    };

    fetchChannels();
  }, [token]);

  const handleChannelChange = async (e) => {
    const channelId = e.target.value;
    setFormData((prevState) => ({ ...prevState, channel_id: channelId }));

    if (channelId) {
      try {
        const selectedChannel = channels.find((channel) => channel._id === channelId);
        setFields(selectedChannel?.fields || []);
      } catch (err) {
        setError("Error fetching fields for this channel.");
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
      // const response = await axios.post('http://cloud.xtranssolutions.com/tem/api/prediction', formData, {
      const response = await axios.post('http://localhost:5001/prediction', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResult(response.data);
      setShowModal(true);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred.');
    }
  };

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
    }) + ' (IST)';
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        
      <h2 className="text-center text-primary mb-4">Data Prediction</h2>
        <div className="col-md-6 text-center">
          <AdvancedImage
            cldImg={images.prediction}
            alt="Prediction Illustration"
            className="img-fluid"
            style={{ maxHeight: "450px", borderRadius: "10px" }}
          />
        </div>

        <div className="col-md-6">

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

          {error && (
            <div className="alert alert-danger mt-4">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Prediction Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {result && result.forecast ? (
            <>
              {/* Graph */}
              <h5 className="text-center text-primary">Forecast Graph</h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={result.forecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" tickFormatter={formatTimestamp} />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>

              <h5 className="text-center text-success mt-4">Forecast Data</h5>
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
            </>
          ) : (
            <p>No data available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Prediction;
