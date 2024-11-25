import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { userContext } from '../../context/UserContext';

const AdminProfile = () => {
  const { user, setUser } = useContext(userContext);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(user);
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    setProfileData(user);
  }, [user]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      // Step 1: Send OTP to the user's email
      const otpResponse = await axios.post("/admin/send-otp", { email: profileData.email });
      if (otpResponse.status === 200) {
        setOtpSent(true);
        setShowOtpInput(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      // Step 2: Verify OTP
      const verifyResponse = await axios.post("/admin/verify-otp", { email: profileData.email, otp });
      if (verifyResponse.status === 200) {
        // Step 3: Update user information
        const response = await axios.put("/profile", profileData, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUser(response.data);
          setEditMode(false);
          setShowOtpInput(false);
          setOtpSent(false);
          setOtp(''); // Clear OTP input
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // Optionally show an error message
    }
  };

  return (
    <div className="tailwind-container">
    <div className="p-8 bg-gray-50 shadow-lg rounded-lg max-w-md mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
          <FaUserCircle size={80} className="text-gray-400" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">Admin Profile</h2>
        </div>
      </div>
      {editMode ? (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email:</label>
            <input
              disabled
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Phone:</label>
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {otpSent && showOtpInput && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Enter OTP:</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleVerifyOtp}
                className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
              >
                Verify OTP
              </button>
            </div>
          )}
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              {otpSent ? 'Resend OTP' : 'Save'}
            </button>
            <button
              onClick={handleEditToggle}
              className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <p className="text-gray-700 text-lg font-medium"><strong>Name:</strong> {profileData.name}</p>
            <p className="text-gray-700 text-lg font-medium"><strong>Email:</strong> {profileData.email}</p>
            <p className="text-gray-700 text-lg font-medium"><strong>Phone:</strong> {profileData.phone || 'Not Provided'}</p>
          </div>
          <button
            onClick={handleEditToggle}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default AdminProfile;
