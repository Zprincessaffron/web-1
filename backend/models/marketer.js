import mongoose from "mongoose";
import { Schema } from "mongoose";

const marketerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  phone: {
    type: String,
    required: true
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