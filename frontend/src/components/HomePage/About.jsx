import React, { useEffect, useState } from "react";
import crocuses from "../../images/crocuses.jpg";
import { useLocation } from "react-router-dom";
import abtend1 from "../../images/abtend1.jpg";
import "../../styles/About.css";
import Navbar from "../../navbar/NavBar";
import { useUserContext } from "../../context/MainContext";
import SideBar from "../sidebar/SideBar";
import MenuSlider from "../sidebar/MenuSlider";
import Footer from "../../footer/Footer";
import ScrollToTop from "../ScrollToTop";
import AboutUsPage from "../../pages/AboutUsPage";
import bff from '../../images/aboutback1.png'
function About() {
  const { pathname } = useLocation();

  const [trans, setTrans] = useState(120);
  const { isMobile, setMenuSlider, setSideBar, setShowNav } = useUserContext();
  useEffect(() => {
    setMenuSlider(false);
    setSideBar(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      // Calculate width based on scrollTop. Starts from 0 width when at the top.
      const newone = scrollTop / 1;
      const newagain = newone;
      setTrans(120 - newagain); // Adjust the divisor to control the width change speed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(trans);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <SideBar />
      <MenuSlider />
      <div className="about_div1">
        {isMobile ? (
          <div className="about_div1_mobile">
            <div>
              <h1>Z PRINCESS SAFFRON</h1>
            </div>
          </div>
        ) : (
          <>
            <div className="about_div11">
              <h1 style={{ transform: `translateY(${trans}px)` }}>
                Z PRINCESS SAFFRON
              </h1>
            </div>
            <div className="about_div12">
              <img src={bff} alt="" />
            </div>
          </>
        )}
      </div>
      <div className="aboutmain">
        <div className="about_div2">
          <h1>WHO WE ARE</h1>
          <div></div>
          <p>
            Z PRINCESS SAFFRON is a distinguished saffron seller located in
            Chennai, India, dedicated to bringing you the world’s finest
            saffron. Our saffron is meticulously harvested from the most
            prestigious regions known for their superior quality – Kashmir,
            Spain, and Iran. Each strand of our saffron carries the essence of
            these regions, known for their unique climate and traditional
            harvesting
          </p>
        </div>
        <div className="about_div3">
          <div className="about_div31">
            <img src={crocuses} alt="" />
          </div>
          <div className="about_div32">
            <h1>Our Commitment</h1>
            <p>
              we are passionate about offering an authentic saffron experience.
              Our commitment to quality ensures that every thread of saffron you
              purchase from us is pure, unadulterated, and of the highest
              standard.
            </p>
          </div>
        </div>
        <div className="about_div4">
          <div className="about_div41"></div>
          <div className="about_div42">
            <h1>OUR MISSION</h1>
            <div></div>
            <p>
              {" "}
              is to provide our customers with unparalleled service and a
              product that stands out in terms of quality and authenticity. We
              believe that saffron is more than just a spice – it’s a journey
              through tradition, culture, and flavor. Trust Z PRINCESS SAFFRON
              to deliver an exceptional saffron experience, one that enhances
              your cooking, beauty, and health routines.
            </p>
          </div>
        </div>
        <div className="about_div6">
          <div className="about_div61">
            <img src={abtend1} alt="" />
          </div>
          <div className="about_div62">
            <p>
              Join us in celebrating the timeless allure of saffron. With Z
              PRINCESS SAFFRON, every aspect of your life becomes a little more
              luxurious and memorable.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default About;
