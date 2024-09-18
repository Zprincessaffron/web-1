// transporter.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

// Create the Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export default transporter;
