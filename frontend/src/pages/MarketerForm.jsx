import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MarketerForm = () => {
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState(''); // Combined field for email or phone
  const [password, setPassword] = useState(''); // Password field
  const [otp, setOtp] = useState(''); // OTP field for verification
  const [otpSent, setOtpSent] = useState(false); // OTP sent status
  const [isEmail, setIsEmail] = useState(false); // Flag to check if it's email or phone
  const navigate = useNavigate();

  // Function to handle OTP sending
  const sendOtp = async () => {
    try {
      const data = { emailOrPhone, isEmail };
      await axios.post('/send-otp', data); // API to send OTP
      setOtpSent(true); // Update state when OTP is sent
      toast.success(`OTP sent to your ${isEmail ? 'email' : 'phone'}`);
    } catch (err) {
      console.error(err);
      toast.error("Error sending OTP");
    }
  };

  // Function to handle form submission after OTP verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    const marketer = { name, emailOrPhone, password, otp };

    try {
      const response = await axios.post('/marketer', marketer); // Assuming OTP verification is done on the backend
      setName('');
      setEmailOrPhone('');
      setPassword('');
      setOtp('');
      setOtpSent(false);
      toast.success("Marketer enrolled successfully");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Error enrolling marketer");
    }
  };

  // Detect if the input is an email or phone number
  const handleEmailOrPhoneChange = (e) => {
    const value = e.target.value;
    setEmailOrPhone(value);
    // Simple regex to check if it's an email or phone number
    setIsEmail(/\S+@\S+\.\S+/.test(value));
  };

  return (
   <div className='tailwind-container'>
     <div  className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Enroll Marketer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email or Phone</label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={handleEmailOrPhoneChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {otpSent && (
            <div>
              <label className="block text-gray-700">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength="6"
            />
          </div>
          {!otpSent ? (
            <button
              type="button"
              onClick={sendOtp}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Send OTP
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
            >
              Register
            </button>
          )}
        </form>
      </div>
    </div>
   </div>
  );
};

export default MarketerForm;
