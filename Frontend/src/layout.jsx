import React from 'react';
import Sidebar from './components/Sidebar/sidebar';

const Layout = ({ children }) => {
  return (
    <div className="app">
        <Sidebar />
        <div className="main-content">{children}</div>
    </div>
  );
};

export default Layout;