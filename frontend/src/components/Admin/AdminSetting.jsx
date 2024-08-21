import React, { useState } from 'react';
import { FaLock, FaBell } from 'react-icons/fa';

const AdminSetting = () => {
  const [settings, setSettings] = useState({
    password: '',
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = () => {
    // Save settings logic here
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-8 bg-gray-50 shadow-lg rounded-lg max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Account Settings</h2>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaLock className="mr-2 text-gray-500" />
          Change Password
        </h3>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">New Password:</label>
          <input
            type="password"
            name="password"
            value={settings.password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaBell className="mr-2 text-gray-500" />
          Notification Settings
        </h3>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
            className="mr-3 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="text-gray-700">Enable Notifications</label>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={handleSave} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default AdminSetting;
