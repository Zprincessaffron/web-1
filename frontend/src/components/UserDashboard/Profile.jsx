import React, { useState } from 'react';

const Profile = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main Street, Anytown, USA',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Add logic to save changes
    console.log('Changes saved:', personalInfo);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Reset personalInfo to initial state
    setPersonalInfo({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      address: '123 Main Street, Anytown, USA',
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile</h2>
      <div className="bg-white p-6 rounded-lg ">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={personalInfo.name}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${isEditing ? '' : 'bg-gray-100'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${isEditing ? '' : 'bg-gray-100'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={personalInfo.phone}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${isEditing ? '' : 'bg-gray-100'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={personalInfo.address}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${isEditing ? '' : 'bg-gray-100'}`}
            />
          </div>
        </div>
        {isEditing ? (
          <div className="mt-4 space-x-2">
            <button
              onClick={handleSaveClick}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-600"
            >
              Save
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleEditClick}
            className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-600"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
