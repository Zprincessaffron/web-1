import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  phone: {
    type: String,
    required: false,
    unique: true
  },
  uniqueId: { type: String, unique: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: "user",
    immutable: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  otp: { type: String },
  otpExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
