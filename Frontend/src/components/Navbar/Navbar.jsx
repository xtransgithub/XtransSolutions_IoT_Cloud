/**
 * Navbar Component
 *
 * A responsive navigation bar component that includes links to various sections
 * of the application and supports user authentication state (logged-in or logged-out).
 *
 * Features:
 * - Displays navigation links: Home, Channels, Documentation, Support.
 * - Shows user profile dropdown if authenticated (includes links to profile, settings, and logout).
 * - Shows a "Sign In" link if not authenticated.
 * - Supports sticky positioning using Bootstrap's `sticky-top` class.
 *
 * Props: None
 *
 * Dependencies:
 * - React Router: For navigation (`Link` and `useNavigate`).
 * - Bootstrap: For layout and styling.
 * - FontAwesome (optional): For icons.
 *
 * Functions:
 * @function handleLogout - Logs the user out by clearing tokens from local storage and redirecting to the sign-in page.
 *
 * Usage:
 * <Navbar />
 *
 * Styles:
 * Custom styles for the navbar are defined in `navbar.css`.
 */


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Images from '../../assets'; 
import './navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if the user is signed in by checking for a token

  const handleLogout = () => {
    // Remove all credentials from local storage on logout
    localStorage.removeItem('token');
    localStorage.removeItem('x-api-key');
    localStorage.removeItem('user');  // If you have other user-related data
    navigate('/signin');  // Redirect to sign-in page after logout
  };

  return (
    <>
      {/* Use Bootstrap classes to make the navbar sticky and styled */}
      <nav className="navbar sticky-top bg-dark">
        <div className="container-fluid">
          {/* Brand/Logo */}
          <a className="navbar-brand" href="/">
            <img 
              src={Images.logo} 
              alt="XTrans Logo" 
              width="30" 
              height="30" 
              className="d-inline-block align-text-top"
            />
            <span className="company"> Xtrans Solutions</span>
          </a>
          
          {/* Navigation Links */}
          <div className="d-flex align-items-center">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/channels" className="nav-link">Channels</Link>
            <Link to="/documentation" className="nav-link">Documentation</Link>
            <Link to="/contact" className="nav-link">Support</Link>
            
            {/* Conditional Rendering based on whether the user is logged in */}
            {token ? (
              <div className="btn-group">
                <button 
                  type="button" 
                  className="btn btn-secondary dropdown-toggle acc-drop" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                  <li><Link className="dropdown-item" to="/settings">Account Settings</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item navbardrop" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <Link to="/signin" className="nav-link">Sign In</Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;