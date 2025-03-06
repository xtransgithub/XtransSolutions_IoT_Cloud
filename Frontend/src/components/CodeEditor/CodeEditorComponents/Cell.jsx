import { useState } from "react";
import CodeEditor from "./CodeEditor";
import MarkdownCell from "./MarkdownCell";
import CellToolbar from "./CellToolbar";
import CellOutput from "./CellOutput";
// import InputCell from "./InputCell";

function Cell({ cell, onUpdate, onDelete, onExecute, onTypeChange }) {
  const [isEditing, setIsEditing] = useState(cell.type === "code");

  return (
    <div className="card mb-3">
      <div className="card-header">
        <CellToolbar
          type={cell.type}
          onTypeChange={(type) => onTypeChange(cell.id, type)}
          onDelete={() => onDelete(cell.id)}
          onExecute={() => cell.type === "code" && onExecute(cell.id)}
        />
      </div>
      <div className="card-body">
        {cell.type === "code" ? (
          <CodeEditor code={cell.content} onChange={(value) => onUpdate(cell.id, value)} />
        ) : (
          <MarkdownCell
            content={cell.content}
            isEditing={isEditing}
            onChange={(value) => onUpdate(cell.id, value)}
            onDoubleClick={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
          />
        )}
      </div>
      <div className="card-footer">
        <CellOutput output={cell.output} error={cell.error} images={cell.images} />
      </div>
    </div>
  );
}

export default Cell;