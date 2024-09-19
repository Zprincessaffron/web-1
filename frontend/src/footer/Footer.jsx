import React, { useState } from "react";
import "../styles/Footer.css";
import { CgMail } from "react-icons/cg";
import { FaWhatsapp } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { TfiInstagram } from "react-icons/tfi";
import { FaXTwitter } from "react-icons/fa6";
import { PiWhatsappLogoLight } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { RiLinkedinLine } from "react-icons/ri";

function Footer() {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="footer_main">
      <div className="footer-div1">
        <div>Z PRINCESS SAFFRON</div>
      </div>
      <div className="footer-div2"></div>
      <div className="footer-div3">
        <div className="footer-div31">
          <div>
            <div
              onClick={() => {
                navigate("/contactus");
              }}
            >
              Contact
            </div>
            <div
              onClick={() => {
                navigate("/about-us");
              }}
            >
              ABOUT
            </div>
            <div>PRODUCTS</div>
          </div>

          <div>
            <div
              onClick={() => {
                navigate("/termsandcondition");
              }}
            >
              terms and condition
            </div>

            <div
              onClick={() => {
                navigate("/privacy-policy");
              }}
            >
              PRIVACY POLICY
            </div>
            <div
              onClick={() => {
                navigate("/faq");
              }}
            >
              FAQ
            </div>
          </div>

          <div>
            

            <div
              onClick={() => {
                navigate("/cancellation-and-refund");
              }}
            >
              REFUND POLICY
            </div>
            <div
              onClick={() => {
                navigate("/shipping-and-delivery");
              }}
            >
              SHIPPING POLICY
            </div>
            <div
              onClick={() => {
                setShowContent(!showContent);
              }}
              className="corporate-essentials"
            >
              CORPORATE essentials <FaAngleDown />{" "}
            </div>
            <div className={`liscence-con ${showContent ? "true" : ""}`}>
              <div>fssai license no:12423008002367</div>
              <div>gstin:33ABFA6551N1ZZ</div> <div>MSME UAN:TN-02-0006511</div>
            </div>
          </div>
        </div>
        <div className="footer-div32">
          <RiLinkedinLine />
          <CiMail />
          <PiWhatsappLogoLight  className="fontwa"/>
          <TfiInstagram  className="fontinsta"/>
          <FaXTwitter className="fontx"/>
        </div>
      </div>
      <div className="footer-div2"></div>
    </div>
  );
}

export default Footer;
