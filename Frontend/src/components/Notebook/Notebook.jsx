import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NotebookCard from "./NotebookCard";
import { server } from "../../config";
import Loading from "../loading";
import NO_NOTEBOOK_IMAGE from "../../assets/no_chh.jpg";

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
        const response = await axios.get(`${server}api/auth/notebooks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
      await axios.delete(`${server}api/auth/notebooks/${notebookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotebooks(notebooks.filter((notebook) => notebook._id !== notebookId));
    } catch (error) {
      console.error("Error deleting notebook:", error);
    }
  };

  const handleNotebookClick = (notebookId) => {
    navigate(`/dashboard/${notebookId}`);
  };

  const handleNewNotebook = () => {
    navigate("/codeEditor"); // Redirects to a new Code Editor
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
              key={notebook._id}
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
          Open New Notebook
        </button>
      </div>
    </div>
  );
};

export default NotebookPage;