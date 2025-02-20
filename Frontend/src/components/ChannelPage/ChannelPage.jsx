import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChannelCard from "./ChannelCard";
import "./channel.css";
import { server } from "../../config";
import Loading from "../loading"; 
import CreateChannelForm from "../CreateChannelForm/CreateChannelForm"; 

const MAX_CHANNELS = 4;

const ChannelPage = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchChannels = async () => {
      if (!token) {
        navigate("/signin");
        return;
      }
      setIsLoading(true);
      try {
        const response = await axios.get(`${server}api/auth/channels`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChannels(response.data.channels);
      } catch (error) {
        console.error("Error fetching channels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannels();
  }, [navigate, token]);

  const handleDeleteChannel = async (channelId) => {
    try {
      await axios.delete(`${server}api/auth/channels/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChannels(channels.filter((channel) => channel._id !== channelId));
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  const handleChannelClick = (channelId) => {
    navigate(`/dashboard/${channelId}`);
  };

  return (
    <div className="container m-0">
      <h2 className="mb-2">Manage Channels</h2>
      <br />
      <div className="row">
        {isLoading ? (
          <Loading message={"Loading channels..."} />
        ) : channels.length > 0 ? (
          channels.map((channel) => (
            <ChannelCard
              key={channel._id}
              channel={channel}
              onChannelClick={handleChannelClick}
              onDelete={handleDeleteChannel}
            />
          ))
        ) : (
          <p>No channels found. Create one to get started!</p>
        )}
      </div>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowPopup(true)}
        disabled={channels.length >= MAX_CHANNELS}
      >
        {channels.length >= MAX_CHANNELS ? "Channel Limit Reached" : "Create New Channel"}
      </button>

      {/* Popup for Creating New Channel */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
            <CreateChannelForm onClose={() => setShowPopup(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelPage;
