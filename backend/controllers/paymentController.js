import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import Order from "../models/order.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, 
  key_secret: process.env.RAZORPAY_KEY_SECRET, 
});

export const createOrder = async (req, res) => {
  const { amount, currency, orderID } = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in paisa
      currency: currency || "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Update the existing order with Razorpay order ID
    await Order.findByIdAndUpdate(
      orderID,
      { 
        receiptData: {
          orderNumber: razorpayOrder.id,
          paymentId: "", // Initial empty paymentId
          signature: "", // Initial empty signature
          date: "", // Initial empty date
        }
      },
      { new: true }
    );

    res.status(200).json(razorpayOrder);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};


export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentMethod } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    try {
      // Find the order by order_number (which is saved in receiptData)
      const order = await Order.findOne({ "receiptData.orderNumber": razorpay_order_id });

      if (!order) {
        return res.status(400).json({ status: "failure", message: "Order not found" });
      }

      // Update order with payment details
      order.payment = {
        paymentId: razorpay_payment_id,
        paymentMethod: paymentMethod || "unknown", // Use the paymentMethod received from the frontend
        paymentStatus: "Completed",
        transactionId: razorpay_payment_id,
        signature: razorpay_signature,
      };

      // Update receiptData with payment details and date
      order.receiptData = {
        ...order.receiptData,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        date: new Date().toISOString(), // Store the current date and time
      };

      await order.save();

      res.status(200).json({ status: "success" });
    } catch (error) {
      res.status(500).json({ status: "failure", message: "Internal server error" });
    }
  } else {
    res.status(400).json({ status: "failure", message: "Signature mismatch" });
  }
};

