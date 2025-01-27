import React from 'react';

const Loading = ({ message }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="d-flex align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">{message}</span>
        </div>
        <p className="mb-0 ms-2">{message}</p>
      </div>
    </div>
  );
};

export default Loading;