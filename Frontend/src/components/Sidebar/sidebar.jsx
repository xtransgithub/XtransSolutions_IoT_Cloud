import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from 'react';
import axios from "axios";
import config from "../../config";
import "./sidebar.css";
import Navbar from "../Navbar/Navbar";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
//   const [userId, setUserId] = useState(null);
const navigate = useNavigate();
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     navigate("/signin");
//   };

const handleLogout = async () => {

    try {

        const token = localStorage.getItem("token");

        await axios.post(
            `${config.BACKEND_URL}api/auth/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

    } catch (error) {

        console.log("Logout Error:", error);

    }

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    navigate("/signin");
};

//   useEffect(() => {
//     const UserID = localStorage.getItem('userId');
//     if (UserID) {
//       setUserId(UserID);
//     }
//   }, []);

  return(
    <>
        <Navbar />
            <aside id="sidebar" className={isExpanded ? "expand" : ""}>
                <div className="d-flex justify-content-center">
                    <button className="toggle-btn p-1 menu" type="button" onClick={handleToggle}>
                    <i className="bi bi-list"></i>
                    </button>
                    <div className="sidebar-logo">
                        Menu
                    </div>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-item">
                        <a href="/Profile" className="sidebar-link" data-tooltip="Profile">
                            <i className="bi bi-person-fill"></i>
                            <span>Profile</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="/channels" className="sidebar-link" data-tooltip="Channels">
                            <i className="bi bi-card-list"></i>
                            <span>Channels</span>
                        </a>
                    </li>

                    <li className="sidebar-item">
                        <a href="/dashboard" className="sidebar-link" data-tooltip="Dashboard">
                            <i className="bi bi-display"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="/events" className="sidebar-link" data-tooltip="Events">
                            <i className="bi bi-bell"></i>
                            <span>Events</span>
                        </a> 
                    </li>
                    <li className="sidebar-item">
                        <a href="/tutorial" className="sidebar-link" data-tooltip="Tutorials">
                            <i className="bi bi-file-earmark-text"></i>
                            <span>Tutorials</span>
                        </a> 
                    </li>
                    <li className="sidebar-item">
                        <a href="/code-playground" className="sidebar-link" data-tooltip="Code Editor">
                            <i className="bi bi-code-slash"></i>
                            <span>Code Editor</span>
                        </a> 
                    </li>
                    <li className="sidebar-item">
                        <a href="/analysis" className="sidebar-link" data-tooltip="Analytics">
                            <i className="bi bi-bar-chart-line"></i>
                            <span>Analytics</span>
                        </a> 
                    </li>
                    <li className="sidebar-item">
                        <a href="/prediction" className="sidebar-link" data-tooltip="Prediction">
                            <i className="bi bi-graph-up-arrow"></i>
                            <span>Prediction</span>
                        </a> 
                    </li>
                    <li className="sidebar-item">
                        <a href="/documentation" className="sidebar-link" data-tooltip="Documentation">
                            <i className="bi bi-book"></i>
                            <span>Documentation</span>
                        </a> 
                    </li>
                    <li className="sidebar-item">
                       <a href="/info" className="sidebar-link" data-tooltip="Info">
                         <i className="bi bi-info-circle"></i>
                         <span>Info</span>
                       </a> 
                    </li>
                </ul>
                <div className="sidebar-footer">
                    {/* <a href="/signin" className="sidebar-link" data-tooltip="Logout" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-left"></i>
                        <span>Logout</span>
                    </a> */}
                    {/* <button
    className="sidebar-link"
    onClick={handleLogout}
>
    <i className="bi bi-box-arrow-left"></i>
    <span>Logout</span>
</button> */}
<a
    href="#"
    className="sidebar-link"
    data-tooltip="Logout"
    onClick={(e) => {
        e.preventDefault();
        handleLogout();
    }}
>
     <i className="bi bi-box-arrow-left"></i>
                        <span>Logout</span>
</a>
                </div>
            </aside>
    </>
  );
}

export default Sidebar;