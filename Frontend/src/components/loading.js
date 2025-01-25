import React from 'react';

const Loading = ({ message }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">{message}</span>
        </div>
        <p className="text-center">{message}</p>
      </div>
    </div>
  );
};

export default Loading;