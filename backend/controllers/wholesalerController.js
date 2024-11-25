import { hashPassword } from "../helpers/auth.js";
import mongoose from "mongoose";
import Wholesaler from "../models/wholesaler.js";
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import dotenv from "dotenv";
dotenv.config();


// Twilio Credentials (get these from your Twilio account)
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

// Create a transporter for Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or use another email service provider
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Helper function to generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
};

// Function to send Email
const sendEmail = async ({ to, subject, text }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL, // Sender address
      to,                            // Receiver address
      subject,                       // Subject of the email
      text,                          // Text content
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Function to send SMS via Twilio
const sendSMS = async ({ to, message }) => {
  try {
    const client = twilio(accountSid, authToken);
    await client.messages.create({
      body: message,
      from: twilioPhoneNumber, // Your Twilio phone number
      to: `+91${to}`,                      // The phone number to send to
    });
    console.log(`SMS sent to ${to}`);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

export const registerWholesaler = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    additionalMobile,
    businessName,
    marketerId,
  } = req.body;

  try {
    // Check for required fields
    if (!name) {
      return res.json({ error: "Name is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password is required and should be at least 6 characters" });
    }
    if (!phone && !email) {
      return res.json({ error: "At least one contact method (email or phone) is required" });
    }

    // Check if email already exists
    const existingWholesaler = await Wholesaler.findOne({ email });
    if (existingWholesaler) {
      return res.json({ error: "Email already exists" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Send OTP to email if provided
    if (email) {
      await sendEmail({
        to: email,
        subject: "Your OTP for Wholesaler Registration",
        text: `Your OTP is ${otp}`,
      });
    }

    // Send OTP to phone if provided
    if (phone) {
      await sendSMS({
        to: phone,
        message: `Your OTP is ${otp}`,
      });
    }

    // Store OTP temporarily (e.g., in Redis or add OTP to the database model)
    const hashedPassword = await hashPassword(password);
    const wholesaler = new Wholesaler({
      name,
      email,
      password: hashedPassword,
      phone,
      additionalMobile,
      businessName,
      marketerId,
      otp, // Store the generated OTP for verification
    });

    await wholesaler.save();

    res.json({ message: "OTP sent to your email/phone. Please verify.", wholesalerId: wholesaler._id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const verifyOTPWholesaler = async (req, res) => {
  const { wholesalerId, otp } = req.body;

  try {
    const wholesaler = await Wholesaler.findById(wholesalerId);

    if (!wholesaler) {
      return res.json({ error: "Wholesaler not found" });
    }

    if (wholesaler.otp === otp) {
      // OTP is valid, mark the wholesaler as verified
      wholesaler.otp = null; // Clear the OTP after verification
      await wholesaler.save();
      return res.json({ message: "OTP verified successfully" });
    } else {
      return res.json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



// Get wholesalers registered by a specific marketer

export const getWholeSaler = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

  if (!id) {
    return res.status(400).json({ error: "Marketer ID is required" });
  }

  // Validate the ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid marketer ID" });
  }

  try {
    const wholesalers = await Wholesaler.find({
      marketerId: new mongoose.Types.ObjectId(id),
    })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const totalCount = await Wholesaler.countDocuments({
      marketerId: new mongoose.Types.ObjectId(id),
    });
    const totalPages = Math.ceil(totalCount / limit);

    res.json({ wholesalers, totalPages });
  } catch (err) {
    console.error("Error fetching wholesalers:", err);
    res.status(500).json({ error: "Error fetching wholesalers" });
  }
};

// getting all the Wholesaler's data

export const getAllWholesalers = async (req, res) => {
  try {
    const wholesalers = await Wholesaler.find();
    res.json(wholesalers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
