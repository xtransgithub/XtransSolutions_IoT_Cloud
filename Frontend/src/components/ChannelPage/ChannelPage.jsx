import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChannelCard from './ChannelCard'; 
import './channel.css';

import { server } from '../../config';

const ChannelPage = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchChannels = async () => {
      if (!token) {
        navigate('/signin');
        return;
      }
      try {
        const response = await axios.get(`${server}api/auth/channels`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChannels(response.data.channels);
      } catch (error) {
      }
    };

    fetchChannels();
  }, [navigate, token]);

  const handleDeleteChannel = async (channelId) => {
      await axios.delete(`${server}api/auth/channels/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChannels(channels.filter((channel) => channel._id !== channelId));
  };

  const handleChannelClick = (channelId) => {
    navigate(`/dashboard/${channelId}`);
  };

  return (
    <>
      <div className="container m-0">
        <h2 className="mb-2">Manage Channels</h2>
        <div className="row">
          {channels.length > 0 ? (
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
      </div>
    </>
  );
};

export default ChannelPage;
