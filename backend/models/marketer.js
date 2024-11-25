import mongoose from "mongoose";
import { Schema } from "mongoose";

const marketerSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // Allows either email or phone to be optional
  },
  phone: {
    type: String,
    unique: true,
    sparse: true, // Allows either phone or email to be optional
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String, // To store the OTP temporarily
  },
  otpExpires: {
    type: Date, // OTP expiry time
  },
  role: {
    type: String,
    default: 'marketer',
    immutable: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

const Marketer = mongoose.model("Marketer", marketerSchema);
export default Marketer;