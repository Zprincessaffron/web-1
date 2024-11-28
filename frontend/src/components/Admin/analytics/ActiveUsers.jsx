import React, { useEffect } from 'react';
import '../styles/Analytics.css'; // Import the external CSS file
import { useAnalyticsContext } from './context/AnalyticsContext';
const ActiveUsers = ( ) => {
  const {filteredUsers,users,fetchUsers} = useAnalyticsContext()
  useEffect(() => {
    fetchUsers()
  }, [])
  
  return (
    <div className="au-container">
      <div className="au-card">
        <h2 className="au-heading">Total Users</h2>
        <p className="au-active-users">{filteredUsers?(filteredUsers.length):users.length}</p>
      </div>
    </div>
  );
};

export default ActiveUsers;
