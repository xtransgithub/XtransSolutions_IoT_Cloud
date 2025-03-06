function CellToolbar({ type, onTypeChange, onDelete, onExecute }) {
    return (
      <div className="d-flex justify-content-between">
        <div>
          <button className="btn btn-sm btn-primary me-2" onClick={() => onTypeChange("code")}>
            Code
          </button>
          <button className="btn btn-sm btn-secondary" onClick={() => onTypeChange("markdown")}>
            Markdown
          </button>
        </div>
        {type === "code" && (
          <button className="btn btn-sm btn-success me-2" onClick={onExecute}>
            Run
          </button>
        )}
        <button className="btn btn-sm btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    );
  }
  
  export default CellToolbar;