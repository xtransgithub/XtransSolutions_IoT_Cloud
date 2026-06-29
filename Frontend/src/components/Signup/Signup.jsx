import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../Alert/Alert';
import Navbar from '../Navbar/Navbar';
import {AdvancedImage} from '@cloudinary/react';
import images from '../../assets/index'
import config from '../../config';

function SignUp() {
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^\S+$/, 'First Name cannot contain spaces')
      .required('First Name is required'),
    lastName: Yup.string()
      .matches(/^\S+$/, 'Last Name cannot contain spaces')
      .required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .matches(/^\S+$/, 'Password cannot contain spaces')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$_%^&*()?:{}|<>])/,
        'Password must contain capital letter, small letter, and one special character'
      )
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    mobileNumber: Yup.string().matches(/^\d{10}$/, 'Please enter a valid 10-digit mobile number'),
    avatar: Yup.string().url('Please enter a valid URL for the avatar').nullable(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${config.BACKEND_URL}api/auth/signup`, values);
      setResponseMessage(response.data.message);
      setShowAlert(true);

      if (response.data.status === 'success') {
        navigate("/verify-email");
      }
    } catch (error) {
      setResponseMessage(error.response ? error.response.data.message : 'Something went wrong');
      setShowAlert(true);
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
      <div className="row justify-content-center mt-5 bg-light px-3 signupPage">
        <div className="col-md-7 col-lg-5 col-xl-4 order-2 order-lg-1">
          <p className="text-center h2 fw-bold mb-4 mx-1 mt-5">Sign up for Xtrans cloud</p>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
              mobileNumber: '',
              avatar: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mx-1 mx-md-4">
                <div className="mb-4">
                  <Field type="text" id="firstName" name="firstName" placeholder="First Name" className="form-control" />
                  <ErrorMessage name="firstName" component="div" className="text-danger small" />
                </div>
                <div className="mb-4">
                  <Field type="text" id="lastName" name="lastName" placeholder="Last Name" className="form-control" />
                  <ErrorMessage name="lastName" component="div" className="text-danger small" />
                </div>
                <div className="mb-4">
                  <Field type="email" id="email" name="email" placeholder="Email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="text-danger small" />
                </div>
                <div className="mb-4">
                  <Field type="password" id="password" name="password" placeholder="Password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="text-danger small" />
                </div>
                <div className="mb-4">
                  <Field type="password" id="confirmPassword" name="confirmPassword" placeholder="Repeat Password" className="form-control" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-danger small" />
                </div>
                <div className="mb-4">
                  <Field type="text" id="mobileNumber" name="mobileNumber" placeholder="Mobile Number" className="form-control" />
                  <ErrorMessage name="mobileNumber" component="div" className="text-danger small" />
                </div>
                <div className="mb-4">
                  <Field type="text" id="avatar" name="avatar" placeholder="Avatar URL (optional)" className="form-control" />
                  <ErrorMessage name="avatar" component="div" className="text-danger small" />
                </div>
                <div className="form-check d-flex justify-content-center mb-5">
                  <Field type="checkbox" className="form-check-input border-dark me-2" name="terms" id="terms" required/>
                  <label htmlFor="terms" className="form-check-label">
                    I agree to the Terms of Services
                  </label>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing up...' : 'Register'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          {showAlert && <AlertModal message={responseMessage} onClose={handleCloseAlert} />}
        </div>
        <div className="col-md-8 col-lg-6 col-xl-5 d-flex align-items-center order-1 order-lg-2">
          <AdvancedImage cldImg={images.singup} className="img-fluid w-80 h-75" alt="signup" />
        </div>
      </div>
    </>
  );
}

export default SignUp;
