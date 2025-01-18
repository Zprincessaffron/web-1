import React, { useEffect, useState } from "react";
import "../styles/ContactUs.css";
import contactusback from "../images/contactbackpink.jpg";
import { CgMail } from "react-icons/cg";
import { IoMdCall } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import Navbar from "../navbar/NavBar";
import { useUserContext } from "../context/MainContext";
import Footer from "../footer/Footer";
import ScrollToTop from "../components/ScrollToTop";
import MenuSlider from "../components/sidebar/MenuSlider";
import SideBar from "../components/sidebar/SideBar";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

function ContactUs() {
  const { setShowNav } = useUserContext();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  useEffect(() => {
    setShowNav(true);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 0) {
      setError("");
    }
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  //handle submit
  async function handleSubmit() {
    if (!values.name) {
      setLoading(false);
      setError("name");
      setLoading(true);

      return;
    }
    if (!values.email && !/\S+@\S+\.\S+/.test(values.email)) {
      setLoading(false);

      setError("email");
      setLoading(true);

      return;
    }
    if (!values.message) {
      setLoading(false);

      setError("message");
      setLoading(true);

      return;
    }
    try {
      setLoading(false);

      await axios
        .post("/sendmail", {
          name: values.name,
          email: values.email,
          message: values.message,
        })
        .then((res) => {
          setValues({
            name: "",
            email: "",
            message: "",
          });
          setLoading(true);
          setShowForm(false);
          toast("Message sent");
        });
    } catch (error) {
      console.error("Registration Error", error.response);
    }
  }
  console.log(error);
  return (
    <div>
      <ScrollToTop />
      <MenuSlider />
      <SideBar />
      <Navbar />
      <div
        className="contact_div1"
        style={{ backgroundImage: `url(${contactusback})` }}
      >
        <div className="contact_div12">
          <div className="contact_div111">
            <h1>ASK US A QUESTION</h1>
            <button
              onClick={() => {
                setShowForm(true);
              }}
            >
              CONTACT US
            </button>
          </div>
          <h1>CONTACT DETAILS</h1>
          <p>
            Our office hours are Monday to Saturday<br></br> 9 AM to 6 PM.
          </p>
          <p>
            <MdLocationOn />
            Chennai,India
          </p>
          <p>
            <IoMdCall />
            +91 72001 50588
          </p>
          <p>
            <CgMail />
            zprincessaffron07@gmail.com
          </p>
        </div>
        <div className={`contact_div121 ${showForm ? "true" : ""}`}>
          <div className="contact_div121_close">
            <IoIosCloseCircleOutline
              onClick={() => {
                setShowForm(false);
              }}
            />
          </div>
          <div className="contact_needhlp">
            Need Help <span className="numbersfont">?</span> We're Here
          </div>
          <div className="contact_div121_1">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className={`contact-input ${error == "name" ? "true" : ""}`}
              value={values.name}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className={`contact-input ${error == "email" ? "true" : ""}`}
              value={values.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Message"
              className={`contact-textarea ${error == "message" ? "true" : ""}`}
              value={values.message}
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>
              {loading ? (
                "SUBMIT"
              ) : (
                <AiOutlineLoading3Quarters className="loading-spinnerca" />
              )}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactUs;
