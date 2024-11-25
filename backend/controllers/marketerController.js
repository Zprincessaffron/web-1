import { hashPassword } from "../helpers/auth.js";
import Marketer from "../models/marketer.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import twilio from 'twilio';
import nodemailer from "nodemailer";

dotenv.config();

// OTP generation helper
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP via Email
const sendEmailOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP for Registration',
    text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

// Send OTP via SMS using Twilio
const sendSmsOtp = async (phone, otp) => {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  await client.messages.create({
    body: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+91${phone}`,
  });
};

// Register Marketer Controller
export const registerMarketer = async (req, res) => {
  const { name, emailOrPhone, password, otp } = req.body;

  try {
    const marketer = await Marketer.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });

    if (!marketer || marketer.otp !== otp || marketer.otpExpires < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    marketer.name = name; // Update the name
    // Update the marketer with hashed password and clear OTP
    marketer.password = hashedPassword;
    marketer.otp = undefined;
    marketer.otpExpires = undefined;

    await marketer.save();

    res.status(201).json({ message: 'Marketer registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Send OTP Controller
export const sendOtp = async (req, res) => {
  const { emailOrPhone, isEmail } = req.body;

  try {
    const otp = generateOtp();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    let marketer;
    if (isEmail) {
      marketer = await Marketer.findOneAndUpdate(
        { email: emailOrPhone },
        { email: emailOrPhone, otp, otpExpires },
        { upsert: true, new: true }
      );
      await sendEmailOtp(emailOrPhone, otp);
    } else {
      marketer = await Marketer.findOneAndUpdate(
        { phone: emailOrPhone },
        { phone: emailOrPhone, otp, otpExpires },
        { upsert: true, new: true }
      );
      await sendSmsOtp(emailOrPhone, otp);
    }

    res.status(200).json({ message: `OTP sent to ${isEmail ? 'email' : 'phone'}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending OTP' });
  }
};



export const getMarketer = async (req, res) => {
  try {
    const marketer = await Marketer.findById(req.params.id);
    if (!marketer) {
      return res.status(404).json({ message: "Marketer not found" });
    }
    res.json(marketer);
  } catch (err) {
    console.error("Error fetching marketer:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// getting all the marketer's data

export const getAllMarketers = async(req,res)=> {
  try {
    const marketers = await Marketer.find();
    res.json(marketers);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}