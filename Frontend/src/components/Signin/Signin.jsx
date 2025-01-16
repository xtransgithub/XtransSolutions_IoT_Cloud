import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import AlertModal from '../Alert/Alert';

import { server } from '../../config';

function SignIn() {
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${server}api/auth/login`, values);
      setResponseMessage(response.data.message);
      setShowAlert(true);
      if (response.data.status === 'success') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        navigate('/channels'); // Redirect to the channels page after login
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
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-4 mt-5">
            <div className="bg-white p-4 rounded-4 shadow-sm">
              <h2 className="text-center mb-4">Sign In to Xtrans cloud</h2>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {/* Email Field */}
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className="form-control"
                      />
                      <ErrorMessage name="email" component="div" className="text-danger small" />
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        className="form-control"
                      />
                      <ErrorMessage name="password" component="div" className="text-danger small" />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </button>
                  </Form>
                )}
              </Formik>

              {/* Response Message */}
              {responseMessage && (
                <div className="mt-3 text-center">
                  <p className={`text-${responseMessage.includes('success') ? 'success' : 'danger'}`}>
                    {responseMessage}
                  </p>
                </div>
              )}

              {/* Forgot Password and Sign Up Links */}
              <div className="text-center mt-3">
                <p>
                  <a href="/forget-password" className="text-decoration-none">Forgot Password?</a>
                </p>
                <p>
                  Don't have an account? <a href="/signup" className="text-decoration-none">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Modal */}
      {showAlert && (
        <AlertModal message={responseMessage} onClose={handleCloseAlert} />
      )}
    </>
  );
}

export default SignIn;
