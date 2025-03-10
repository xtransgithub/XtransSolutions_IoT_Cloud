import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Cell from "./CodeEditorComponents/Cell";
import { executeCode, listFiles, uploadFile, deleteFile } from "./Api/CodeEditorApi";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function CodeEditor() {
  const [cells, setCells] = useState([]);
  const [executingCellId, setExecutingCellId] = useState(null);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User is not authenticated. Redirecting to login.");
      navigate("/login");
      return;
    }

    setCells([
      {
        id: nanoid(),
        type: "markdown",
        content: "# Welcome to the Python Notebook!\nTry executing the code below.",
      },
      {
        id: nanoid(),
        type: "code",
        content: `import numpy as np\nimport matplotlib.pyplot as plt\nx = np.linspace(0, 10, 100)\ny = np.sin(x)\nplt.plot(x, y)\nplt.show()`,
      },
    ]);

    loadFiles();
  }, []);

  const loadFiles = async () => {
    const fetchedFiles = await listFiles();
    setFiles(fetchedFiles);
  };

  const handleAddCell = (type) => {
    setCells([...cells, { id: nanoid(), type, content: "" }]);
  };

  const handleUpdateCell = (id, content) => {
    setCells(cells.map((cell) => (cell.id === id ? { ...cell, content } : cell)));
  };

  const handleDeleteCell = (id) => {
    setCells(cells.filter((cell) => cell.id !== id));
  };

  const handleExecuteCell = async (id) => {
    const cell = cells.find((c) => c.id === id);
    if (!cell || cell.type !== "code") return;

    setExecutingCellId(id);
    setCells((prevCells) =>
      prevCells.map((c) =>
        c.id === id ? { ...c, isExecuting: true, output: "", error: undefined } : c
      )
    );

    try {
      let result = await executeCode(cell.content);

      setCells((prevCells) =>
        prevCells.map((c) =>
          c.id === id
            ? { ...c, isExecuting: false, output: result.output, error: result.error }
            : c
        )
      );
    } catch (error) {
      setCells((prevCells) =>
        prevCells.map((c) =>
          c.id === id ? { ...c, isExecuting: false, error: "Failed to execute code" } : c
        )
      );
    }

    setExecutingCellId(null);
  };

  return (
    <div className="container py-4">
      <header>
        <h2 className="text-center text-primary mb-4">Interactive Python Notebook</h2>
      </header>

      <main>
        {cells.map((cell) => (
          <Cell
            key={cell.id}
            cell={cell}
            onUpdate={handleUpdateCell}
            onDelete={handleDeleteCell}
            onExecute={handleExecuteCell}
          />
        ))}
        <div className="text-center mt-4">
          <button className="btn btn-success me-2" onClick={() => handleAddCell("code")}>
            ➕ Add Code Cell
          </button>
          <button className="btn btn-info text-white" onClick={() => handleAddCell("markdown")}>
            📝 Add Markdown Cell
          </button>
        </div>
      </main>

      {/* File Upload Section */}
      <div className="mt-4">
        <h4>Manage Files</h4>
        <input type="file" onChange={(e) => uploadFile(e.target.files[0]).then(loadFiles)} />
        <ul>
          {files.map((file) => (
            <li key={file}>
              {file}{" "}
              <button className="btn btn-sm btn-danger" onClick={() => deleteFile(file).then(loadFiles)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
