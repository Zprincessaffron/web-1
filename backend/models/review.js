import mongoose from "mongoose";
import { Schema } from "mongoose";

const reviewSchema = new Schema({
  name: { type: String, required: true },
  star: { type: String, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
  product: { type: String, required: true, enum: ['Kashmir Saffron', 'Spain Saffron'] },
  date: { type: Date, default: Date.now }
});


const Review = mongoose.model('Review', reviewSchema);

export default Review;
