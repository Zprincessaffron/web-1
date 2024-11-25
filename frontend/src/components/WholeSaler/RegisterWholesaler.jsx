import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast'; // Import toast for notifications

const RegisterWholesaler = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    additionalMobile: '',
    businessName: '',
    password: '', 
  });
  
  const [otp, setOtp] = useState(''); // OTP state
  const [otpSent, setOtpSent] = useState(false); // To check if OTP has been sent
  const [wholesalerId, setWholesalerId] = useState(null); // Store wholesalerId after form submission
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      navigate('/'); // Redirect to home if marketerId is missing
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otpSent) {
      // If OTP was sent, verify it
      try {
        const response = await axios.post('/wholesaler/verify-otp', { wholesalerId, otp });

        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          toast.success("OTP verified and wholesaler registered successfully!");
          navigate("/login"); // Redirect to login page after successful registration
        }
      } catch (err) {
        setError('Error verifying OTP.');
        console.error('Error verifying OTP:', err);
      }
    } else {
      // Send OTP first by registering the wholesaler
      try {
        const response = await axios.post('/wholesaler', { ...formData, marketerId: id });

        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          setWholesalerId(response.data.wholesalerId); // Store the wholesalerId for OTP verification
          setOtpSent(true); // OTP is sent
          toast.success("OTP sent to your email/phone!");
        }
      } catch (err) {
        setError('Error registering wholesaler.');
        console.error('Error registering wholesaler:', err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 text-center uppercase tracking-widest">Register Wholesaler</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!otpSent ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="additionalMobile" className="block text-gray-700">Additional Mobile</label>
              <input
                type="tel"
                id="additionalMobile"
                name="additionalMobile"
                value={formData.additionalMobile}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="businessName" className="block text-gray-700">Business Name</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Register
              </button>
            </div>
          </form>
        ) : (
          // OTP Verification Form
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-gray-700">Enter OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={handleOtpChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
              >
                Verify OTP
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterWholesaler;
