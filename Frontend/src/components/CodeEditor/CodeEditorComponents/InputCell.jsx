import { useState } from "react";

function InputCell({ prompt, onSubmit }) {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = () => {
    if (userInput.trim() !== "") {
      onSubmit(userInput);
      setUserInput("");
    }
  };

  return (
    <div className="alert alert-warning d-flex flex-column">
      <p className="mb-2">{prompt}</p>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="form-control mb-2"
        placeholder="Enter input..."
      />
      <button className="btn btn-primary btn-sm" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default InputCell;