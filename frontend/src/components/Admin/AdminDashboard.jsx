// src/components/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-8 text-center">Admin Dashboard</h1>
        <div className="flex flex-col space-y-4">
          <button
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            <Link to={'/register-marketer'}>Enroll a Marketer</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
