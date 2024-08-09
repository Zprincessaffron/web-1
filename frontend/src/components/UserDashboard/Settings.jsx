import React, { useState } from "react";

const Settings = () => {
  const [notifications, setNotifications] = useState("Email");
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleNotificationChange = (e) => {
    setNotifications(e.target.value);
  };

  const handleSave = () => {
    // Add logic to save changes
    console.log("Changes saved:", { notifications, personalInfo });
  };

  const handleLogout = () => {
    // Add logic to handle logout
    console.log("User logged out");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      <div className="bg-white p-6 rounded-lg space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={personalInfo.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={personalInfo.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">
            Notification Preferences
          </h3>
          <select
            value={notifications}
            onChange={handleNotificationChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleSave}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-600"
          >
            Save Changes
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 mt-4"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
