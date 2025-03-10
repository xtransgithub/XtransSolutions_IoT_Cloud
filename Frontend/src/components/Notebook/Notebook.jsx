import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Notebook = () => {
  const [notebooks, setNotebooks] = useState([]);
  const [newNotebookName, setNewNotebookName] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchNotebooks();
    }
  }, [token]);

  const fetchNotebooks = async () => {
    if (!token) {
      console.error("No authentication token found.");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/${token}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotebooks(Array.isArray(response.data.notebooks) ? response.data.notebooks : []);
    } catch (error) {
      console.error("Error fetching notebooks:", error);
      setNotebooks([]);
    }
  };

  const createNotebook = async () => {
    if (!newNotebookName || !token) {
      console.error("Notebook name or token missing.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5000/${token}/create_notebook`,
        { name: newNotebookName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewNotebookName("");
      fetchNotebooks();
      navigate(`/codeEditor/${response.data.notebookId}`);
    } catch (error) {
      console.error("Error creating notebook:", error);
    }
  };

  const selectNotebook = (notebook) => {
    if (!notebook.notebook_id) {
      console.error("Invalid notebook selection.");
      return;
    }
    navigate(`/codeEditor/${notebook.notebook_id}`);
  };

  return (
    <div>
      <h1>Python Notebook</h1>
      {token ? (
        <>
          <input
            type="text"
            placeholder="Notebook Name"
            value={newNotebookName}
            onChange={(e) => setNewNotebookName(e.target.value)}
          />
          <button onClick={createNotebook} disabled={!newNotebookName}>
            Create Notebook
          </button>

          <h2>Notebooks</h2>
          {notebooks.length === 0 ? (
            <p>No notebooks found.</p>
          ) : (
            <ul>
              {notebooks.map((nb) => (
                <li key={nb.notebook_id} onClick={() => selectNotebook(nb)}>
                  {nb.notebook_name}
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Notebook;
