import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../Alert/Alert';

import { server } from '../../config';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false); // Track if the form is in edit mode
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin'); // Redirect to signin if no token is found
        return;
      }

      try {
        const response = await axios.get(`${server}api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status === 'success') {
          const userData = response.data.user;
          setUser(userData);
          setFirstName(userData.firstName);
          setLastName(userData.lastName); // Set initial values for the form
        } else {
          setError('Failed to load user details');
        }
      } catch (error) {
        setError('An error occurred while fetching user details');
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleEdit = () => {
    setEditMode(true); // Enable edit mode
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User is not authenticated.');
      return;
    }

    try {
      const response = await axios.patch(
        `${server}api/auth/me`,
        { firstName, lastName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === 'User information updated successfully') {
        setUser(response.data.user); // Update user details in state
        setSuccessMessage('Profile updated successfully!');
        setShowAlert(true); // Show success alert
        setEditMode(false); // Exit edit mode
      } else {
        setError('Failed to update user details');
      }
    } catch (error) {
      setError('An error occurred while updating user details');
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container m-0">
      <h2 className="text-start mb-4">User Profile</h2>
      {user ? (
        <>
          {/* Personal Information */}
          <div className="profile-section mb-4">
            <h2 className="h4">Personal Information</h2>
            <div className="row">
              <div className="col-md-3 mb-3 me-2 bg-light rounded">
                <label className="form-label">First Name</label>
                {editMode ? (
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="form-control"
                  />
                ) : (
                  <p>{user.firstName}</p>
                )}
              </div>

              <div className="col-md-3 mb-3 ms-2 bg-light rounded">
                <label className="form-label">Last Name</label>
                {editMode ? (
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="form-control"
                  />
                ) : (
                  <p>{user.lastName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="profile-section mb-4">
            <h2 className="h4">Contact Information</h2>
            <div className="row">
              <div className="col-md-3 mb-3 me-2 bg-light rounded">
                <label className="form-label">Email</label>
                <p>{user.email}</p>
              </div>
              <div className="col-md-3 mb-3 ms-2 bg-light rounded">
                <label className="form-label">Mobile Number</label>
                <p>{user.mobileNumber}</p>
              </div>
            </div>
          </div>

          {/* Avatar Section */}
          {user.avatar && (
            <div className="profile-section mb-4">
              <h2 className="h4">Avatar</h2>
              <img
                src={user.avatar}
                alt="User Avatar"
                className="img-fluid rounded-circle"
                style={{ maxWidth: '150px' }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="d-flex justify-content-between mt-4">
            {editMode ? (
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
            ) : (
              <button className="btn btn-secondary" onClick={handleEdit}>
                Edit Profile
              </button>
            )}
          </div>

          {/* Success Alert */}
          {showAlert && (
            <AlertModal message={successMessage} onClose={handleCloseAlert} />
          )}
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
