import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile</h2>
      <div className="bg-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 p-2">
              {personalInfo.name}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 p-2">
              {personalInfo.email}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <p className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 p-2">
              {personalInfo.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
