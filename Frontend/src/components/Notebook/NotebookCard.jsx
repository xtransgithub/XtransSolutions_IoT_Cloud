import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./notebook.css";

const NotebookCard = ({ notebook, onNotebookClick, onDelete }) => {
  return (
    <div className="card shadow-sm p-3 mb-4 notebook-row">
      <div className="row align-items-center">
        {/* Notebook Name Section */}
        <div className="col-md-2 text-center">
          <h5 className="fw-bold">{notebook.name}</h5>
        </div>

        {/* Description Section */}
        <div className="col-md-7 p-3 border-start border-end border-2 border-dark">
          <p className="mb-1 fw-bold">Description</p>
          <p className="text-muted mb-0">{notebook.description || "No description provided."}</p>
        </div>

        {/* Buttons Section */}
        <div className="col-md-3 d-flex flex-column align-items-center">
          <button
            className="btn btn-primary mb-2 w-100"
            onClick={() => onNotebookClick(notebook._id)}
            aria-label={`Go to notebook ${notebook.name}`}
          >
            Open Notebook
          </button>
          <button
            className="btn btn-danger w-100"
            onClick={() =>
              window.confirm("Are you sure you want to delete this notebook?") &&
              onDelete(notebook._id)
            }
            aria-label={`Delete notebook ${notebook.name}`}
          >
            Delete Notebook
          </button>
        </div>
      </div>
    </div>
  );
};

NotebookCard.propTypes = {
  notebook: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onNotebookClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NotebookCard;
