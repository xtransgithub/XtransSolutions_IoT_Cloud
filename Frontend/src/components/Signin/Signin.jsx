import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import AlertModal from '../Alert/Alert';
import config from '../../config';
import './SignIn.css'; // Import external CSS for responsiveness

function SignIn() {
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${config.BACKEND_URL}api/auth/login`, values);
      setResponseMessage(response.data.message);
      setShowAlert(true);
      if (response.data.status === 'success') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        navigate('/channels');
      }
    } catch (error) {
      setResponseMessage(error.response ? error.response.data.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Navbar />
      <div className="signin-container">
        <div className="signin-wrapper">
          {/* Left Side: Welcome Section (Hidden in mobile & tablet screens) */}
          <div className="left-section">
            <h2 className="welcome-text">Welcome Back</h2>
            <p className="description-text">
              We are happy to see you again! Log in to continue exploring your dashboard.
            </p>
          </div>

          {/* Right Side: Login Form (Always visible) */}
          <div className="right-section">
            <h2 className="text-center mb-4">Sign In to Xtrans Cloud</h2>
            <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <Field type="email" id="email" name="email" placeholder="Enter your email" className="input-field" />
                    <ErrorMessage name="email" component="div" className="text-danger small" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <Field type="password" id="password" name="password" placeholder="Enter your password" className="input-field" />
                    <ErrorMessage name="password" component="div" className="text-danger small" />
                  </div>

                  <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </button>
                </Form>
              )}
            </Formik>

            {responseMessage && (
              <div className="mt-3 text-center">
                <p className={`text-${responseMessage.includes('success') ? 'success' : 'danger'}`}>{responseMessage}</p>
              </div>
            )}

            <div className="text-center mt-3">
              <p><a href="/forget-password" className="text-decoration-none">Forgot Password?</a></p>
              <p>Don't have an account? <a href="/signup" className="text-decoration-none">Sign Up</a></p>
            </div>
          </div>
        </div>
      </div>

      {showAlert && <AlertModal message={responseMessage} onClose={handleCloseAlert} />}
    </>
  );
}

export default SignIn;
