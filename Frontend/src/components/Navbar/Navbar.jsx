import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Images from '../../assets'; 
import './navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('x-api-key');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <nav className="navbar sticky-top bg-dark">
        <div className="container-fluid">
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
          
          <div className="d-flex align-items-center">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/channels" className="nav-link">Channels</Link>
            <Link to="/documentation" className="nav-link">Documentation</Link>
            <Link to="/contact" className="nav-link">Support</Link>
            
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
  );
};

export default Navbar;
