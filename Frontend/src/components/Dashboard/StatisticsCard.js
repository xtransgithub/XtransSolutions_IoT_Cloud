import React from 'react';

const StatisticsCard = ({ field, stats }) => {
  return (
    <div className="stats-card">
      <h4>{field}</h4>
      <p><strong>Min:</strong> {stats.min}</p>
      <p><strong>Max:</strong> {stats.max}</p>
      <p><strong>Trend:</strong> {stats.trend}</p>
    </div>
  );
};

export default StatisticsCard;
