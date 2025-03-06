import Editor from "@monaco-editor/react";

function CodeEditor({ code, onChange }) {
  return (
    <Editor
      height="200px"
      language="python"
      theme="vs-dark"
      value={code}
      onChange={(value) => onChange(value || "")}
    />
  );
}

export default CodeEditor;