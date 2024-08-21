import mongoose from "mongoose";
import { Schema } from "mongoose";

const orderSchema = new Schema({
  shippingDetails: {
    name: String,
    address: String,
    landmark: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    mobile: String,
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
    enum: ['Processed', 'Accepted' ,'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processed',
  },
  user: {
    id: String,
    name: String,
    email: String,
    role: String
  },
  payment: {
    paymentId: String,           // Payment ID from payment gateway
    paymentMethod: {
      type: String,
      enum: ['creditCard', 'debitCard', 'upi'],
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending',
    },
    transactionId: String,       // Transaction ID from payment gateway (if applicable)
    signature: String,           // Payment signature (if applicable)
  },
  receiptData: {
    orderNumber: String,          // Receipt order number
    paymentId: String,            // Payment ID
    signature: String,            // Payment signature
    date: String,                 // Payment date
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
