import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/UserDashboard.css'

const Profile = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Fetch the user profile data from the backend
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/profile', {
          withCredentials: true, // To include cookies in the request
        });
        if (response.data) {
          setPersonalInfo(response.data);
        } else {
          console.error('No user data found.');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h3 className="profile-subtitle">Personal Information</h3>
        <div className="profile-info">
          <div className="profile-field">
            <label className="profile-label">Name</label>
            <p className="profile-value">
              {personalInfo.name}
            </p>
          </div>
          <div className="profile-field">
            <label className="profile-label">Email</label>
            <p className="profile-value">
              {personalInfo.email}
            </p>
          </div>
          <div className="profile-field">
            <label className="profile-label">Phone</label>
            <p className="profile-value">
              {personalInfo.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
