import React from 'react';

const ActiveUsers = ({ users }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-2">Total Users</h2>
      <p className="text-3xl font-semibold">{users.active}</p>
    </div>
  );
};

export default ActiveUsers;
