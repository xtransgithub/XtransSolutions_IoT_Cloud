import React from 'react';

const FieldDisplay = ({ name, value, count, onRemove }) => {
  const handleRemoveClick = () => {
    const isConfirmed = window.confirm(`Are you sure you want to remove the field "${name}"?`);
    if (isConfirmed) {
      onRemove(name);
    }
  };

  return (
    <div className="card mb-3 border-1">
      <div className="card-body text-center">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4 className="card-title mb-0 text-center flex-grow-1 ms-4">Field: {name}</h4>
        <button
          className="btn btn-sm"
          onClick={handleRemoveClick}
          aria-label={`Remove ${name}`}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </div>
        <p className="card-text">Current Reading: {value}</p>
        <p className="card-text text-muted">Entries Count: {count}</p>
      </div>
    </div>
  );
};

export default FieldDisplay;