import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);  // Step 1: Request OTP, Step 2: Verify OTP and Reset Password
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle sending OTP
  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await axios.post('/send-otp', { emailOrPhone });
      setStep(2);
      toast('OTP sent successfully');
    } catch (error) {
      toast('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification and password reset
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast('Passwords do not match');
      return;
    }
    try {
      setLoading(true);
      await axios.post('/reset-password', { emailOrPhone, otp, newPassword });
      toast('Password reset successfully');
      navigate('/login');
    } catch (error) {
      toast('Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      {step === 1 ? (
        <div>
          <h1>Forgot Password</h1>
          <input
            type="text"
            placeholder="Enter Email or Phone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
          <button onClick={handleSendOtp}>
            {loading ? <AiOutlineLoading3Quarters className='loading-spinner' /> : 'Send OTP'}
          </button>
        </div>
      ) : (
        <div>
          <h1>Reset Password</h1>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleResetPassword}>
            {loading ? <AiOutlineLoading3Quarters className='loading-spinner' /> : 'Reset Password'}
          </button>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordPage;
