import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/home/Home';
import SignIn from './components/Signin/Signin';
import SignUp from './components/Signup/Signup';
import ChannelDashboard from './components/NewDashboard/NewDashboard';
import CreateChannelForm from './components/CreateChannelForm/CreateChannelForm';
import PrivateRoute from './PrivateRoute';
import UserProfile from './components/UserProfile/UserProfile';
import Contact from './components/Contact/Contact';
import ChannelPage from './components/ChannelPage/ChannelPage';
import ForgotPasswordPage from './components/forgetPass/forgetPass';
import ResetPasswordPage from './components/resetPassword/resetPasswordPage';
import Layout from './layout';
import EventForm from './components/EventForm/EventForm';
import Documentation from "./components/Documentation/Documentation";
import Analysis from './components/Analytics/Analysis';
import Prediction from './components/Prediction/Prediction';
import VerifyEmail from "./components/VerifyEmail/VerifyEmail";
import NotVerified from './components/VerifyEmail/NotVerified';
import Tutorial from "./components/tutorial/tutorial";
import Dashboard from "./components/Dashboard/dashboard"
import CodePlayground from './components/CodeEditor/CodePlayground';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token") || "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
    <ToastContainer />
      <Router> 
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forget-password" element={<ForgotPasswordPage />} />
          <Route path="/update-password/:token" element={<ResetPasswordPage />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/verify-email" element={<NotVerified />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/tutorial" element={
            <Layout>
              <Tutorial />
            </Layout>
          } />
          {/* Protected Routes */}
          <Route path="/channels" element={
            <PrivateRoute>
              <Layout>
                <ChannelPage />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/newChannel" element={
            <PrivateRoute>
              <Layout>
                <CreateChannelForm />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/dashboard/:id" element={
            <PrivateRoute>
              <Layout>
                <ChannelDashboard />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Layout>
                <UserProfile />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/events" element={
            <PrivateRoute>
              <Layout>
                <EventForm />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/code-playground" element={ 
            <PrivateRoute>
              <Layout>
                <ToastContainer />
                <CodePlayground token={token}/>
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/analysis" element={
            <PrivateRoute>
              <Layout>
                <Analysis />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/prediction" element={
            <PrivateRoute>
              <Layout>
                <Prediction />
              </Layout>
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;