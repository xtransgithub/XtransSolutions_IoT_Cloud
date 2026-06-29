import React, { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Navbar from '../Navbar/Navbar';

import config from '../../config';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);

  // Yup validation schema
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/^\S+$/, 'Password cannot contain spaces')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[!@#$%^&*()?:{}|<>]/, 'Password must contain at least one special character')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
          await axios.put(
        `${config.BACKEND_URL}api/auth/update-password/${token}`,
        { password: values.password }
      );
      setAlertVisible(true);
      setSubmitting(false);
      setTimeout(() => {
        navigate('/signin'); 
      }, 2000);
    } catch (err) {
      setSubmitting(false);
      // Handle error response
      setErrors({ submit: err.response?.data?.error || 'Something went wrong. Please try again.' });
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="container py-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="panel panel-default">
              <div className="panel-body p-4 shadow-lg rounded-3">
                <div className="text-center">
                  <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-unlock-fill" viewBox="0 0 16 16">
                      <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2"/>
                    </svg>
                  </h3>
                  <h2 className="mb-3">Reset Your Password</h2>
                  <p>You can reset your password here.</p>

                  <Formik
                    initialValues={{ password: '', confirmPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        {/* Error messages */}
                        <ErrorMessage name="submit" component="div" className="alert alert-danger" />

                        {/* Password field */}
                        <div className="form-group mb-3">
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="bi bi-key"></i>
                            </span>
                            <Field
                              type="password"
                              name="password"
                              id="password"
                              className="form-control"
                              placeholder="Enter new password"
                            />
                          </div>
                          <ErrorMessage name="password" component="div" className="text-danger small" />
                          <div className="form-text">
                            Password must be at least 6 characters long, contain a lowercase letter, an uppercase letter, and a special character.
                          </div>
                        </div>

                        {/* Confirm Password field */}
                        <div className="form-group mb-3">
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="bi bi-key-fill"></i>
                            </span>
                            <Field
                              type="password"
                              name="confirmPassword"
                              id="confirmPassword"
                              className="form-control"
                              placeholder="Confirm new password"
                            />
                          </div>
                          <ErrorMessage name="confirmPassword" component="div" className="text-danger small" />
                        </div>

                        {/* Submit button */}
                        <div className="form-group mb-3">
                          <button
                            type="submit"
                            className="btn btn-md btn-primary w-100"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Resetting...' : 'Reset Password'}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>

                  {alertVisible && (
                    <div className="alert alert-success mt-3" role="alert">
                      Password Updated Successfully
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
