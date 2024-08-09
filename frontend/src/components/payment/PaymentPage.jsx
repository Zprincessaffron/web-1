import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || []; // Access cartItems from location state

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePayment = () => {
    // Logic for processing the payment goes here
    // For example, you might make an API call to complete the payment

    // Sample receipt data
    const receiptData = {
      orderNumber: "123456",
      date: new Date().toLocaleDateString(),
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: `₹${item.price.toFixed(2)}`,
      })),
      total: `₹${calculateTotal().toFixed(2)}`,
    };

    // On successful payment, navigate to the PaymentSuccessPage with receipt data
    navigate("/payment-success", { state: { receiptData } });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto my-10 p-5 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Payment</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Payment Method and Form */}
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl text-center font-semibold mb-6 text-gray-900">
            Select Payment Method
          </h2>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
            >
              <option value="">Select an option</option>
              <option value="creditCard">Credit Card</option>
              <option value="debitCard">Debit Card</option>
              <option value="upi">UPI</option>
              <option value="cashOnDelivery">Cash on Delivery</option>
            </select>
          </div>

          {/* Payment Method Details */}
          {paymentMethod === "creditCard" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9123 4567"
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="expiryDate"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Expiry Date
                  </label>
                  <input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    CVV
                  </label>
                  <input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="nameOnCard"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Name on Card
                </label>
                <input
                  id="nameOnCard"
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
                  required
                />
              </div>
            </motion.div>
          )}

          {paymentMethod === "debitCard" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <label
                  htmlFor="debitCardNumber"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Card Number
                </label>
                <input
                  id="debitCardNumber"
                  type="text"
                  placeholder="1234 5678 9123 4567"
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="debitExpiryDate"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Expiry Date
                  </label>
                  <input
                    id="debitExpiryDate"
                    type="text"
                    placeholder="MM/YY"
                    className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="debitCvv"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    CVV
                  </label>
                  <input
                    id="debitCvv"
                    type="text"
                    placeholder="123"
                    className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="debitNameOnCard"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Name on Card
                </label>
                <input
                  id="debitNameOnCard"
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
                  required
                />
              </div>
            </motion.div>
          )}

          {paymentMethod === "upi" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <label
                  htmlFor="upiId"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  UPI ID
                </label>
                <input
                  id="upiId"
                  type="text"
                  placeholder="example@upi"
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
                  required
                />
              </div>
            </motion.div>
          )}

          {paymentMethod === "cashOnDelivery" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-700">
                You will pay in cash on delivery of the product.
              </p>
            </motion.div>
          )}

          <div className="flex justify-center mt-8">
            <button
              onClick={handlePayment}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Pay Now
            </button>
          </div>
        </motion.div>

        {/* Cart Items Summary */}
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl text-center font-semibold mb-6 text-gray-900">
            Order Summary
          </h2>
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-700">No items in the cart.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b border-gray-300 py-4"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-800">Price: ₹{(item.price)*(item.quantity)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;
