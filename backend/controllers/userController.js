import User from "../models/user.js";
import Order from "../models/order.js";
import mongoose from "mongoose";
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from "dotenv";

dotenv.config();


// getting all the User's data
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// updating user profile 

export const updateProfile = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id, name, phone } = req.body;

    // Update the User model
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, phone },
      { new: true, runValidators: true, session }
    );

    if (!updatedUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'User not found' });
    }

    // Update related models (Example: Orders and Comments)
    await Order.updateMany(
      { "user.id" : id },
      { $set: { "user.name": name } },
      { session }
    );

    // await Comment.updateMany(
    //   { userId: id },
    //   { $set: { userName: name } }, 
    //   { session }
    // );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(updatedUser);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

let otpStore = {}; // In-memory store for OTPs

// Endpoint to send OTP
export const sendAdminOTP = async(req,res)=>{
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP

  // Send OTP to email
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or use another email service provider
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    otpStore[email] = otp; // Store OTP for verification
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Endpoint to verify OTP
export const verifyAdminOTP = async(req,res)=>{
  const { email, otp } = req.body;

  if (otpStore[email] === otp) {
    delete otpStore[email]; // Clear the OTP after successful verification
    return res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
};


export const userLogout = async(req,res)=>{
  try {
    // Clear the cookie
    res.clearCookie('token', {
      httpOnly: true, // Secure the cookie
      sameSite: 'none',
      secure: true, // Only send the cookie over HTTPS
    });

    // Send a success response
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
//get user name by unique id
export const userUnique = async (req, res) => {
  try {
    const { uniqueId } = req.params;
    const user = await User.findOne({ uniqueId });
    if (user) {
      res.json({ name: user.name });
    } else {
      res.json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

