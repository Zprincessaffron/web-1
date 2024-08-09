import React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const receiptData = location.state?.receiptData || {}; // Access receiptData from location state

  return (
    <div className="container mx-auto my-10 p-5 max-w-7xl">
      <motion.div
        className="bg-green-100 p-8 rounded-lg shadow-lg border border-green-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl font-bold mb-4 text-green-800"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Payment Successful!
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          Thank you for your purchase. Your payment has been processed successfully.
        </motion.p>
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        >
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Return to Home
          </button>
        </motion.div>

        {/* Receipt Section */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md border border-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Receipt</h2>
          <p className="text-lg text-gray-600 mb-2">Order Number: <span className="font-bold">{receiptData.orderNumber}</span></p>
          <p className="text-lg text-gray-600 mb-4">Date: <span className="font-bold">{receiptData.date}</span></p>
          <ul className="mb-4">
            {receiptData.items && receiptData.items.map((item, index) => (
              <li key={index} className="flex justify-between mb-2 text-gray-700">
                <span>{item.name} (x{item.quantity})</span>
                <span>{item.price}</span>
              </li>
            ))}
          </ul>
          <p className="text-xl font-bold text-gray-800">Total: {receiptData.total}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;
