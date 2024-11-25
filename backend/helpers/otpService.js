import nodemailer from 'nodemailer';
import twilio from 'twilio';
import dotenv from "dotenv";

dotenv.config();


// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // Example: use your email service
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

// Generate a random OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

// Send OTP via email
const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP sent to email:', email);
  } catch (error) {
    console.error('Error sending OTP via email:', error);
    throw new Error('Failed to send OTP via email');
  }
};

// Send OTP via SMS (Twilio)
const sendOtpSms = async (phone, otp) => {
  try {
    await client.messages.create({
      body: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: `+91${phone}`
    });
    console.log('OTP sent to phone:', phone);
  } catch (error) {
    console.error('Error sending OTP via SMS:', error);
    throw new Error('Failed to send OTP via SMS');
  }
};

// Determine if the input is email or phone and send OTP accordingly
const sendOtp = async (emailOrPhone) => {
  const otp = generateOtp();
  
  if (/\S+@\S+\.\S+/.test(emailOrPhone)) { // Check if it's an email
    await sendOtpEmail(emailOrPhone, otp);
  } else if (/^[0-9]{10}$/.test(emailOrPhone)) { // Check if it's a phone number
    await sendOtpSms(emailOrPhone, otp);
  } else {
    throw new Error('Invalid email or phone number');
  }

  return otp; // Optionally return the OTP for further processing (e.g., storing it)
};

export default {
  sendOtp
};
