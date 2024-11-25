import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../../styles/UserDashboard.css'
import { userContext } from '../../context/UserContext';

const Profile = () => {
  const {user} = useContext(userContext)
  console.log(user)
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    setPersonalInfo(user)

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
