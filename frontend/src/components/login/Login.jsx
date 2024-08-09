import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [step, setStep] = useState(1); // Step 1: Enter email/phone, Step 2: Enter OTP
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  const handleEmailOrPhoneChange = (e) => {
    setEmailOrPhone(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('/api/send-otp', { emailOrPhone });
      setRole(response.data.role);
      setStep(2);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('/api/verify-otp', { emailOrPhone, otp });
      // Redirect to the appropriate dashboard based on the role
      switch (role) {
        case 'user':
          window.location.href = '/user-dashboard';
          break;
        case 'marketer':
          window.location.href = '/marketer-dashboard';
          break;
        case 'wholesaler':
          window.location.href = '/wholesaler-dashboard';
          break;
        case 'admin':
          window.location.href = '/admin-dashboard';
          break;
        default:
          setError('Invalid role.');
      }
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Login</h1>
        {step === 1 ? (
          <>
            <input
              type="text"
              placeholder="Enter Email or Phone"
              value={emailOrPhone}
              onChange={handleEmailOrPhoneChange}
              className="w-full p-2 mb-4 border rounded-lg"
            />
            <button
              onClick={handleSendOtp}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
              className="w-full p-2 mb-4 border rounded-lg"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Verify OTP
            </button>
          </>
        )}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
