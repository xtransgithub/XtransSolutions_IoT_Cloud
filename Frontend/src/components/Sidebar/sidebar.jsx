import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sidebar.css";
import Navbar from "../Navbar/Navbar";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

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
                </ul>
                <div className="sidebar-footer">
                    <a href="/signin" className="sidebar-link" data-tooltip="Logout">
                        <i className="bi bi-box-arrow-left"></i>
                        <span>Logout</span>
                    </a>
                </div>
            </aside>
    </>
  );
}

export default Sidebar;