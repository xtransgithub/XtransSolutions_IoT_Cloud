import React from "react";
import "./Loading.css"; // Import the CSS file

const Loading = ({ message }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
};

export default Loading;
