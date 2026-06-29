import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import  config from '../../config';

function ForgotPasswordPage() {
  const [alertVisible, setAlertVisible] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.put(
        `${config.BACKEND_URL}api/auth/forget-password`,
        { email: values.email }
      );
      setAlertVisible(true); // Show the alert
    } catch (error) {
      // Handle error if needed
    } finally {
      setSubmitting(false);
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                    </svg>
                  </h3>
                  <h2 className="mb-3">Forgot Password?</h2>
                  <p>You can reset your password here.</p>

                  <Formik
                    initialValues={{ email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form id="register-form" role="form" className="form" method="post">
                        <div className="form-group mb-3">
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="bi bi-envelope"></i>
                            </span>
                            <Field
                              type="email"
                              name="email"
                              id="email"
                              placeholder="Enter your email"
                              className="form-control"
                            />
                          </div>
                          <ErrorMessage name="email" component="div" className="text-danger small" />
                        </div>

                        <div className="form-group mb-3">
                          <button
                            type="submit"
                            className="btn btn-md btn-primary"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Sending...' : 'Reset Password'}
                          </button>
                        </div>

                        <input type="hidden" name="token" id="token" value="" />
                      </Form>
                    )}
                  </Formik>

                  {alertVisible && (
                    <div className="alert alert-success mt-3" role="alert">
                      Email has been sent successfully!
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
}

export default ForgotPasswordPage;
