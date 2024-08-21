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
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  phone: {
    type: String,
    required: true,
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
  }
});

const Wholesaler = mongoose.model('Wholesaler', WholesalerSchema);
export default Wholesaler;
