import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../Alert/Alert';
import { server } from '../../config';
import Loading from '../loading';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false); // Track if the form is in edit mode
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
      } finally {
        setIsLoading(false);
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

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setError('User is not authenticated.');
      return;
    }

    try {
      const response = await axios.delete(`${server}api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === 'success') {
        // Clear local storage
        localStorage.clear();

        // Redirect to home page
        navigate('/');
      } else {
        setError('Failed to delete account.');
      }
    } catch (error) {
      setError('An error occurred while deleting your account.');
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  if (isLoading) {
    return <Loading message="Loading user profile..." />;
  }

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
            <h3 className="h5">Personal Information</h3>
            <div className="row g-3">
              <div className="col-md-6 col-sm-12">
                <div className="p-3 bg-light rounded">
                  <label className="form-label"><i className="bi bi-person-circle text-secondary" style={{ fontSize: '1rem' }}></i> First Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="form-control"
                    />
                  ) : (
                    <p className="mb-0">{user.firstName}</p>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="p-3 bg-light rounded">
                  <label className="form-label"><i className="bi bi-person-circle text-secondary" style={{ fontSize: '1rem' }}></i> Last Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="form-control"
                    />
                  ) : (
                    <p className="mb-0">{user.lastName}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="profile-section mb-4">
            <h3 className="h5">Contact Information</h3>
            <div className="row g-3">
              <div className="col-md-6 col-sm-12">
                <div className="p-3 bg-light rounded">
                  <label className="form-label"><i className="bi bi-envelope-fill text-primary"></i> Email</label>
                  <p className="mb-0">{user.email}</p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="p-3 bg-light rounded">
                  <label className="form-label"><i className="bi bi-telephone-fill text-success"></i> Mobile Number</label>
                  <p className="mb-0">{user.mobileNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Avatar Section */}
          {user.avatar && (
            <div className="profile-section mb-4 text-center">
              <h3 className="h5">Avatar</h3>
              <img
                src={user.avatar}
                alt="User Avatar"
                className="img-fluid rounded-circle"
                style={{ maxWidth: '150px' }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="d-flex justify-content-center gap-3 mt-4">
            {editMode ? (
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
            ) : (
              <button className="btn btn-secondary" onClick={handleEdit}>
                Edit Profile
              </button>
            )}
            <button className="btn btn-danger" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>

          {/* Success Alert */}
          {showAlert && (
            <AlertModal message={successMessage} onClose={handleCloseAlert} />
          )}
        </>
      ) : (
        <p className="text-center">Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;