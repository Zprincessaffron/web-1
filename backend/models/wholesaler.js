import mongoose from 'mongoose';
import { Schema } from 'mongoose';

// Regular expression for validating phone numbers
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

const WholesalerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  phone: {
    type: String,
    trim: true,
    match: [phoneRegex, 'Please fill a valid phone number']
  },
  additionalMobile: {
    type: String,
    trim: true,
    match: [phoneRegex, 'Please fill a valid phone number']
  },
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    default: 'wholesaler',
    immutable: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  marketerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Marketer',
    required: true
  },
  otp: {
    type: String
  }
});

const Wholesaler = mongoose.model('Wholesaler', WholesalerSchema);
export default Wholesaler;
