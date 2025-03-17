import React from "react";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import "./channel.css";

const ChannelCard = ({ channel, onChannelClick, onDelete }) => {
  const handleCardClick = (e) => {
    if (!e.target.closest(".delete-btn")) {
      onChannelClick(channel._id);
    }
  };

  return (
    <div className="card shadow-sm channel-card channels" onClick={handleCardClick}>
      {/* Card Header */}
      <div className="card-header d-flex justify-content-between align-items-center channelHeader">
        <h5 className="mb-0">{channel.name}</h5>
        <button
          className="btn btn-sm btn-danger delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("Are you sure you want to delete this channel?")) {
              onDelete(channel._id);
            }
          }}
          aria-label={`Delete channel ${channel.name}`}
        >
          <FaTrash />
        </button>
      </div>

      {/* Middle Section (Avatar) */}
      <div className="card-body d-flex justify-content-center align-items-center">
        <div className="channel-avatar">{channel.name.charAt(0).toUpperCase()}</div>
      </div>

      {/* Footer with Description */}
      <div className="card-footer text-muted small text-center channelDesc">
        {channel.description || "No description provided."}
      </div>
    </div>
  );
};

ChannelCard.propTypes = {
  channel: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onChannelClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ChannelCard;
