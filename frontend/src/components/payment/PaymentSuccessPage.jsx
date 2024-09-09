import React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import ProgressBar from "../../components/product/ProgressBar"; // Import the ProgressBar component
import PaymentSuccess from "/PaymentSuccess.gif";
import "../../styles/PaymentSuccessPage.css"; // Import the CSS file
import Footer from "../../footer/Footer";
import Navbar from "../../navbar/NavBar";
import SideBar from "../sidebar/SideBar";
import MenuSlider from "../sidebar/MenuSlider";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const receiptData = location.state?.receiptData || {}; // Access receiptData from location state

  return (
    <>
    <Navbar/>
    <SideBar/>
    <MenuSlider/>
   <div className="ps_main">
     <div className="ps-container">
      <div className="ps-gradient-background">
        <ProgressBar currentStep={3} /> {/* Add the ProgressBar component here */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.h1
            className="ps-heading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Payment Successful!
          </motion.h1>
          <motion.img
            src={PaymentSuccess}
            alt="Payment Successful"
            className="ps-image"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          />
          <motion.p
            className="ps_text_thank"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          >
            Thank you for your purchase. Your payment has been processed successfully. You can find the receipt below.
          </motion.p>

          {/* Receipt Section */}
          <motion.div
            className="ps-receipt-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="ps-receipt-title">Receipt</h2>
            <p className="ps-recipt-order">Order Number: <span className="font-bold">{receiptData.orderNumber}</span></p>
            <p className="ps-recipt-order">Date: <span className="font-bold">{receiptData.date}</span></p>
            <ul className="mb-4">
              {receiptData.items && receiptData.items.map((item, index) => (
                <li key={index} className="ps-receipt-item">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
            <hr className="ps-hr" />
            <p className="ps-total">
              <span>Total</span>
              <span>{receiptData.total}</span>
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center mt-6 md:mt-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          >
            <button
              onClick={() => navigate("/")}
              className="ps-button"
            >
              Return to Home
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
   </div>
   <Footer/>
   </>
  );
};

export default PaymentSuccessPage;
