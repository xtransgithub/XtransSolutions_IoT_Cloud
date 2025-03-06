import { useState } from "react";
import { nanoid } from "nanoid";
import Cell from "./CodeEditorComponents/Cell";
import { executeCode } from "./CodeEditorApi";
import "bootstrap/dist/css/bootstrap.min.css";

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

export default function App() {
  const [cells, setCells] = useState(DEFAULT_CELLS);
  const [executingCellId, setExecutingCellId] = useState(null);

  // Add a new cell
  const handleAddCell = (type) => {
    const newCell = { id: nanoid(), type, content: "" };
    setCells([...cells, newCell]);
  };

  // Update cell content
  const handleUpdateCell = (id, content) => {
    setCells((prevCells) =>
      prevCells.map((cell) => (cell.id === id ? { ...cell, content } : cell))
    );
  };

  // Delete a cell
  const handleDeleteCell = (id) => {
    setCells((prevCells) => prevCells.filter((cell) => cell.id !== id));
  };

  // Execute code in a cell
  const handleExecuteCell = async (id, userInput) => {
    const cell = cells.find((c) => c.id === id);
    if (!cell || cell.type !== "code") return;

    setExecutingCellId(id);
    setCells((prevCells) =>
      prevCells.map((c) =>
        c.id === id
          ? { ...c, isExecuting: true, output: "", error: undefined, images: undefined, requiresInput: false, inputPrompt: "" }
          : c
      )
    );

    try {
      let result = await executeCode(cell.content, userInput);

      // If backend requests input, update state to show InputCell
      if (result.requiresInput) {
        setCells((prevCells) =>
          prevCells.map((c) =>
            c.id === id ? { ...c, requiresInput: true, inputPrompt: result.inputPrompt } : c
          )
        );
        return;
      }

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

  // Change cell type (code or markdown)
  const handleTypeChange = (id, type) => {
    setCells((prevCells) =>
      prevCells.map((cell) => (cell.id === id ? { ...cell, type } : cell))
    );
  };

  return (
    <div className="container py-4">
      <header className="bg-dark text-white py-2 px-3 rounded text-center fw-bold d-block mx-auto w-fit">        
        <h1>Interactive Python Notebook</h1>
      </header>
      <main className="mt-4">
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
      </main>
    </div>
  );
}