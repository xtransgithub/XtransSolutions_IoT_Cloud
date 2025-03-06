import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NotebookCard from "./NotebookCard";

import Loading from "../loading";
import NO_NOTEBOOK_IMAGE from "../../assets/no_chh.jpg";

const server = "http://localhost:3000";

const NotebookPage = () => {
  const navigate = useNavigate();
  const [notebooks, setNotebooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotebooks = async () => {
      if (!token) {
        navigate("/signin");
        return;
      }
      setIsLoading(true);
      try {
        const response = await axios.get(`${server}/${token}`);
        setNotebooks(response.data.notebooks);
      } catch (error) {
        console.error("Error fetching notebooks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotebooks();
  }, [navigate, token]);

  const handleDeleteNotebook = async (notebookId) => {
    try {
      await axios.post(`${server}/${token}/delete_notebook`, {
        notebookId,
      });
      setNotebooks(notebooks.filter((notebook) => notebook.notebook_id !== notebookId));
    } catch (error) {
      console.error("Error deleting notebook:", error);
    }
  };

  const handleNotebookClick = (notebookId) => {
    navigate(`/dashboard/${notebookId}`);
  };

  const handleNewNotebook = async () => {
    try {
      const response = await axios.post(`${server}/${token}/create_notebook`, {});
      const newNotebook = response.data;
      setNotebooks([...notebooks, { notebook_id: newNotebook.notebookId, notebook_name: newNotebook.name }]);
    } catch (error) {
      console.error("Error creating new notebook:", error);
    }
  };

  return (
    <div className="container m-0">
      <h2 className="mb-2">Manage Notebooks</h2>
      <br />
      <div className="row">
        {isLoading ? (
          <Loading message={"Loading notebooks..."} />
        ) : notebooks.length > 0 ? (
          notebooks.map((notebook) => (
            <NotebookCard
              key={notebook.notebook_id}
              notebook={notebook}
              onNotebookClick={handleNotebookClick}
              onDelete={handleDeleteNotebook}
            />
          ))
        ) : (
          <div className="no-notebooks">
            <img src={NO_NOTEBOOK_IMAGE} alt="No Notebooks Available" className="no-notebook-img" />
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary mb-3" onClick={handleNewNotebook}>
          Create New Notebook
        </button>
      </div>
    </div>
  );
};

export default NotebookPage;