// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem('token');

//   if (!token) {
//     return <Navigate to="/signin" />;
//   }

//   return children;
// };

// export default PrivateRoute;

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import config from "./config"; // Adjust the path if needed

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        await axios.get(`${config.BACKEND_URL}api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;