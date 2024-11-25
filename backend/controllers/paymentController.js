import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
import crypto from "crypto";
import nodemailer from 'nodemailer';
import twilio from 'twilio';
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


// Configure Twilio
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});


export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentMethod } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    try {
      const order = await Order.findOne({ "receiptData.orderNumber": razorpay_order_id });

      if (!order) {
        return res.status(400).json({ status: "failure", message: "Order not found" });
      }

      // Update order with payment details
      order.payment = {
        paymentId: razorpay_payment_id,
        paymentMethod: paymentMethod || "unknown",
        paymentStatus: "Completed",
        transactionId: razorpay_payment_id,
        signature: razorpay_signature,
      };

      order.receiptData = {
        ...order.receiptData,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        date: new Date().toISOString(),
      };

      await order.save();

      // Send confirmation message
      const user = order.shippingDetails; // Assuming user details are in the order
      const message = `Dear ${user.name}, your payment for order ${order.cartItems[0].name} has been successfully processed. Thank you for your purchase!`;
      console.log(message);

      // Send confirmation based on available contact method
      if (order.user.email) {
        // Send Email
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: order.user.email,
          subject: 'Payment Confirmation',
          text: message,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
      } 

      if (order.user.phone) {
        // Send SMS
        twilioClient.messages.create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
          to: `+91${order.user.phone}`,
        })
        .then(message => console.log("SMS sent:", message.sid))
        .catch(error => console.error("Error sending SMS:", error));
      }

      res.status(200).json({ status: "success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "failure", message: "Internal server error" });
    }
  } else {
    res.status(400).json({ status: "failure", message: "Signature mismatch" });
  }
};