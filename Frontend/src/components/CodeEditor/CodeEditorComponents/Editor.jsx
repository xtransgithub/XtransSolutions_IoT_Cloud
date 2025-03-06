import { useRef } from "react";
import Editor from "@monaco-editor/react";

function CodeEditor({ code, onChange, onRun }) {
  const editorRef = useRef(null);

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between p-2 bg-light border">
        <button className="btn btn-success btn-sm" onClick={onRun}>
          Run
        </button>
      </div>
      <Editor
        height="250px"
        language="python"
        theme="vs-dark"
        value={code}
        onChange={(value) => onChange(value || "")}
      />
    </div>
  );
}

export default CodeEditor;