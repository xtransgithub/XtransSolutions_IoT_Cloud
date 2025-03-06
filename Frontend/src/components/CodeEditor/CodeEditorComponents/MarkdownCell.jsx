import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

function MarkdownCell({ content, isEditing, onChange, onDoubleClick, onBlur }) {
  return isEditing ? (
    <MDEditor
      value={content}
      onChange={(value) => onChange(value || "")}
      onBlur={onBlur}
      preview="edit"
    />
  ) : (
    <div className="border p-3" onDoubleClick={onDoubleClick}>
      <MDEditor.Markdown source={content || "Double-click to edit..."} />
    </div>
  );
}

export default MarkdownCell;