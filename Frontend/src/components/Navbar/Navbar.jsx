import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Images from '../../assets';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const location = useLocation();
  const isVerifyPage = location.pathname === '/verify-email';
  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top text-white">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img 
            src={Images.logo} 
            alt="XTrans Logo" 
            width="30" 
            height="30" 
            className="d-inline-block align-text-top"
          />
          <span className="ms-2 company"> Xtrans Solutions</span>
        </a>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/channels" className="nav-link text-white">Channels</Link>
            </li>
            <li className="nav-item">
              <Link to="/documentation" className="nav-link text-white">Documentation</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-white">Support</Link>
            </li>

            {token ? (
              <li className="nav-item dropdown vk12">
                <button 
                  className="btn btn-secondary dropdown-toggle" 
                  type="button" 
                  id="dropdownMenuButton" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                  <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                  {/* <li><Link className="dropdown-item" to="/settings">Account Settings</Link></li> */}
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                {/* <Link to="/signin" className="nav-link text-white">Sign In</Link> */}
                <Link 
                  to="/signin" 
                  className={`nav-link text-white ${isVerifyPage ? 'disabled' : ''}`} 
                  aria-disabled={isVerifyPage}
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;