import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { nanoid } from "nanoid";
import Cell from "./CodeEditorComponents/Cell";

const DEFAULT_CELLS = [
  {
    id: nanoid(),
    type: "markdown",
    content: "# Welcome to the Interactive Python Notebook\nTry running the code below!",
  },
  {
    id: nanoid(),
    type: "code",
    content: `# Example: Data visualization with matplotlib
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.title('Sine Wave')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.grid(True)
plt.show()`,
  },
];

function CodeEditor() {
  const [cells, setCells] = useState(DEFAULT_CELLS);
  const [executingCellId, setExecutingCellId] = useState(null);
  const [notebooks, setNotebooks] = useState([]);
  const [activeNotebook, setActiveNotebook] = useState(null);

  const userId = useParams().id;

  useEffect(() => {
    const fetchNotebooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${userId}`);
        console.log(response);
        setNotebooks(response.data.notebooks || []);
    
        // If the user has notebooks, open the first one
        if (response.data.notebooks.length > 0) {
          openNotebook(response.data.notebooks[0]);
        }
      } catch (error) {
        console.error("Error fetching notebooks:", error);
      }
    };

    fetchNotebooks();
  }, [userId]);

  const openNotebook = async (notebook) => {
    setActiveNotebook(notebook);
  
    try {
      const response = await axios.get(`http://localhost:5000/${userId}/${notebook.notebook_id}`);
      setCells(response.data.cells || []);
    } catch (error) {
      console.error("Error fetching notebook content:", error);
    }
  };

  const handleAddNotebook = async () => {
    const notebookName = prompt("Enter notebook name:");
    if (!notebookName) return;
  
    try {
      const response = await axios.post(`http://localhost:5000/${userId}/create_notebook`, {
        name: notebookName
      });
  
      const newNotebook = response.data;
      setNotebooks([...notebooks, newNotebook]);
      openNotebook(newNotebook);
    } catch (error) {
      console.error("Error creating notebook:", error);
      alert("Failed to create notebook. Please try again.");
    }
  };

  const handleAddCell = (type) => {
    const newCell = { id: nanoid(), type, content: "" };
    setCells([...cells, newCell]);
  };

  const handleUpdateCell = (id, content) => {
    setCells((prevCells) =>
      prevCells.map((cell) => (cell.id === id ? { ...cell, content } : cell))
    );
  };

  const handleDeleteCell = (id) => {
    setCells((prevCells) => prevCells.filter((cell) => cell.id !== id));
  };

  const handleExecuteCell = async (id) => {
    const cell = cells.find((c) => c.id === id);
    if (!cell || cell.type !== "code") return;

    setExecutingCellId(id);
    setCells((prevCells) =>
      prevCells.map((c) =>
        c.id === id
          ? { ...c, isExecuting: true, output: "", error: undefined, images: undefined }
          : c
      )
    );

    try {
      const response = await axios.post(`http://localhost:5000/${userId}/${activeNotebook.notebook_id}/execute`, {
        code: cell.content
      });

      const result = response.data;

      setCells((prevCells) =>
        prevCells.map((c) =>
          c.id === id
            ? { ...c, isExecuting: false, output: result.text, error: result.error, images: result.images }
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

  const handleTypeChange = (id, type) => {
    setCells((prevCells) =>
      prevCells.map((cell) => (cell.id === id ? { ...cell, type } : cell))
    );
  };

  return (
    <div className="container m-0">
      <h2 className="text-center text-primary mb-4">Interactive Python Notebook</h2>
      <div className="container d-flex">
        {/* Sidebar for user notebooks */}
        <div className="container col-md-2 userNotebook">
          <h3 className="text-center">Notebooks</h3>
          {notebooks.length > 0 ? (
            <ul className="list-group">
              {notebooks.map((notebook) => (
                <li
                  key={notebook.notebook_id}
                  className={`list-group-item ${activeNotebook?.notebook_id === notebook.notebook_id ? "active" : ""}`}
                  onClick={() => openNotebook(notebook)}
                  style={{ cursor: "pointer" }}
                >
                  {notebook.notebook_name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted">No Notebooks Found</p>
          )}
          <button className="btn btn-secondary w-100 mt-2" onClick={handleAddNotebook}>
            ➕ Add Notebook
          </button>
        </div>

        {/* Notebook editor */}
        <div className="container notebook">
          {activeNotebook ? (
            <>
              <h3 className="text-center text-secondary">{activeNotebook.notebook_name}</h3>
              <div className="mt-4">
                {cells.map((cell) => (
                  <Cell
                    key={cell.id}
                    cell={cell}
                    onUpdate={handleUpdateCell}
                    onDelete={handleDeleteCell}
                    onExecute={handleExecuteCell}
                    onTypeChange={handleTypeChange}
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
              </div>
            </>
          ) : (
            <>
              {DEFAULT_CELLS.map((cell) => (
                <Cell
                  key={cell.id}
                  cell={cell}
                  onUpdate={handleUpdateCell}
                  onDelete={handleDeleteCell}
                  onExecute={handleExecuteCell}
                  onTypeChange={handleTypeChange}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;