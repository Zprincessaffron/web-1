import mongoose from "mongoose";
import { Schema } from "mongoose";

const orderSchema = new Schema({
  shippingDetails: {
    name: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    mobile: String,
    landmark: String,
  },
  cartItems: [{
    id: String,
    name: String,
    price: Number,
    quantity: Number,
    img: String,
  }],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: [ 'Processed', 'Shipped', 'Delivered', 'Cancelled' ],
    default: 'Processed',
  },
  user: {
    id: String,
    name: String,
    email: String
  },
}, {
  timestamps: true,
})

const Order = mongoose.model("Order", orderSchema);
export default Order;