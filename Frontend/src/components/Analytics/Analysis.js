import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../config";
import { useNavigate } from "react-router-dom";
import {AdvancedImage} from '@cloudinary/react';
import images from '../../assets/index'

const Analysis = () => {
  const [formData, setFormData] = useState({
    channel_id: "",
    analysis_type: "",
    field: "",
    num_entries: "",
  });

  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [fields, setFields] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loadingChannels, setLoadingChannels] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
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
  }, [token, navigate]);

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
      setError("Authorization token is missing.");
      return;
    }

    try {
      //const response = await axios.post("http://cloud.xtranssolutions.com/tem/api/analysis", formData, {
        const response = await axios.post("https://xtrans-solutions-1.onrender.com/analysis", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
    }
  };

  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.map((v) => (typeof v === "number" ? v.toFixed(2) : v)).join(", ");
    }
    return typeof value === "number" ? value.toFixed(2) : value;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Data Analysis</h2>
      <div className="row align-items-center">
        {/* Left Side: Image */}
        <div className="col-md-6 text-center">
          <AdvancedImage 
            cldImg={images.analytics} 
            alt="No Channels Available" 
            className="no-channel-img" 
            style={{ width: "100%", maxWidth: "650px", height: "auto" }} 
          />
        </div>

        {/* Right Side: Form */}
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
                <label htmlFor="analysis_type" className="form-label">Analysis Type:</label>
                <select
                  id="analysis_type"
                  name="analysis_type"
                  value={formData.analysis_type}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select</option>
                  <option value="average">Mean</option>
                  <option value="median">Median</option>
                  <option value="mode">Mode</option>
                  <option value="max">Max</option>
                  <option value="min">Min</option>
                  <option value="overview">Overview</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="num_entries" className="form-label">Number of Entries:</label>
                <input
                  type="number"
                  id="num_entries"
                  name="num_entries"
                  value={formData.num_entries}
                  onChange={handleChange}
                  className="form-control"
                  placeholder='Optional'
                  // required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">Analyze</button>
            </form>
          )}

          {result && (
            <div className="mt-4">
              <h3 className="text-success">Analysis Result:</h3>
              <div className="list-group">
                {
                  Object.entries(result).map(([key, value]) => (
                    <div className="list-group-item d-flex justify-content-between" key={key}>
                      <strong>{key}:</strong>
                      <span>{formatValue(value)}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger mt-4">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
