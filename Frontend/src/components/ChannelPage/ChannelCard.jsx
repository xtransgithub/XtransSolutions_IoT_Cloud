import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./channel.css"

const ChannelCard = ({ channel, onChannelClick, onDelete }) => {
  return (
    <div
      className="card shadow-sm p-3 mb-4 channel-row"
    >
      <div className="row align-items-center">
        {/* Channel Name Section */}
        <div className="col-md-2 text-center">
          <h5 className="fw-bold">{channel.name}</h5>
        </div>

        {/* Description Section */}
        <div className="col-md-7 p-3 border-start border-end border-2 border-dark">
          <p className="mb-1 fw-bold">Description</p>
          <p className="text-muted mb-0">{channel.description || "No description provided."}</p>
        </div>

        {/* Buttons Section */}
        <div className="col-md-3 d-flex flex-column align-items-center">
          <button
            className="btn btn-primary mb-2 w-100"
            onClick={() => onChannelClick(channel._id)}
            aria-label={`Go to channel ${channel.name}`}
          >
            Go to Channel
          </button>
          <button
            className="btn btn-danger w-100"
            onClick={() =>
              window.confirm("Are you sure you want to delete this channel?") &&
              onDelete(channel._id)
            }
            aria-label={`Delete channel ${channel.name}`}
          >
            Delete Channel
          </button>
        </div>
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
