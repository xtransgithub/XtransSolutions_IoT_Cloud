import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { server } from '../../config';
import Navbar from '../Navbar/Navbar';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to server
      const response = await fetch(`${server}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent!');
        setFormData({ name: '', email: '', message: '' });
        navigate('/thank-you');
      } else {
        throw new Error('Message submission failed');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          {/* Contact Information Section */}
          <div className="col-md-6 mt-5">
            <div className="mb-4">
              <h3>USA (HQ)</h3>
              <p>
                Xtrans Solutions LLC<br />
                6590 Bollinger Road<br />
                San Jose, CA 95129
              </p>
            </div>

            <div className="mb-4">
              <h3>INDIA</h3>
              <p>
                Xtrans Solutions Pvt. Ltd.<br />
                #343, 3rd Floor, 9th Main, Sector-7, HSR Layout, Bangalore-560102
              </p>
            </div>

            <div className="mb-4">
              <h3>Email Us</h3>
              <p>info@xtranssolutions.com</p>
              <h3>Call Us</h3>
              <p>+91-6363812596</p>
            </div>

            <div className="mb-4">
              <h3>Follow Us</h3>
              <div className="d-flex gap-3">
                <a href="https://www.facebook.com/xtranssolutions" className="fs-3 text-decoration-none text-primary">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://twitter.com/xtranssolutions" className="fs-3 text-decoration-none text-secondary">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="https://www.linkedin.com/company/xtrans-solutions" className="fs-3 text-decoration-none text-primary">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-5">
            <h3>Connect with Us</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
