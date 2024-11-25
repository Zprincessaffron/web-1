import React from 'react';
import '../styles/Analytics.css'; // Import the external CSS file

const ActiveUsers = ({ users }) => {
  return (
    <div className="au-container">
      <div className="au-card">
        <h2 className="au-heading">Total Users</h2>
        <p className="au-active-users">{users.active}</p>
      </div>
    </div>
  );
};

export default ActiveUsers;
