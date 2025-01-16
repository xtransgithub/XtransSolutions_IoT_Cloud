import React from 'react';

const AlertModal = ({ message, onClose }) => {
  return (
    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body text-center">
            <p>{message}</p>
            <button onClick={onClose} className="btn btn-primary">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
