import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link> | 
            <Link to="/code">Code Execution</Link> | 
            <Link to="/files">File Management</Link>
        </nav>
    );
};

export default Navbar;
