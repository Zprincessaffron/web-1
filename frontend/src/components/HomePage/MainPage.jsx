import React, { useEffect, useState, useRef } from 'react'
import "../../styles/MainPage.css"
import backvideo from '../../images/backvideo.mp4'
import Navbar from '../../navbar/NavBar'
import Footer from '../../footer/Footer'
import { useUserContext } from '../../context/MainContext'
import LoginHover from '../../navbar/LoginHover'
import { GrNext } from "react-icons/gr";
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NewsLetter from './NewsLetter'
import OurProducts from './OurProducts'
import SideBar from '../sidebar/SideBar'
import { useNavigate } from 'react-router-dom'
import MenuSlider from '../sidebar/MenuSlider'
import ProfileHover from '../../navbar/ProfileHover'
import Review from '../review/Review'

gsap.registerPlugin(ScrollTrigger);
function MainPageTrial() {
  const navigate = useNavigate()
  const { profileHover, setProfileHover, menuSlider, setMenuSlider, sideBar, setSideBar, setShowNav, showLogin } = useUserContext()
  const [showEnd, setShowEnd] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0);
  const [height, setHeight] = useState(false)
  const [translateX, setTranslateX] = useState(0);
  const [zPrinces, setZPrincess] = useState(true)


  ///////////////////////////
  useEffect(() => {
    setMenuSlider(false)
    setSideBar(false)
  }, [])


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollRatio = scrollPosition / maxScroll;

      // Adjust this calculation as needed
      const maxTranslateX = 500;  // maximum translate value in pixels
      const newTranslateX = maxTranslateX * scrollRatio;

      setTranslateX(newTranslateX);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  ///////////////////////
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
      if (window.scrollY > 500) {
        setHeight(true);
      } else {
        setHeight(false);
      }



    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  function handleEndShow() {
    setShowEnd(!showEnd)
  }
  function handleDiscoverNow() {
    navigate('/about-us')
  }
  return (
    <div className='mainpage_main'>
      <Navbar />
      <SideBar />
      <MenuSlider />
      {profileHover ? (
        <ProfileHover />) : (null)}
      {showLogin ? (<LoginHover />) : ' '}
      <div className={`mainpagecon ${height ? "true" : ''}`}>
        <div style={{ transform: `translateY(${scrollPosition * 0.2}px)` }} className='mainpage_con1'>
          <div className='mainpage_container'>
            <div className="video-container">
              <video autoPlay loop muted>
                <source src={backvideo} type="video/mp4" />
              </video>
              <div className='mainpage_div'>
                <div className={`mainpage_div1 ${zPrinces ? "true" : ""}`}>
                  {/* //////////////// */}
                  Z PRINCESS SAFFRON
                  {/* /////////////// */}
                </div>
                <div className='line_l'>
                </div>
                <div className='mainpage_div2'>
                  World's Finest Saffron
                </div>
                <div className='mainpage_div3'>
                  <button onClick={handleDiscoverNow} >DISCOVER NOW </button>
                </div>
                <div className='mainpage_end'>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mainpage_con2' style={{ transform: `translateY(${scrollPosition * -0.2}px)` }}>
          <OurProducts />
        </div>
      </div>
      <div className='mainpagetrialdiv'>
        <div className='setus_div1'>
          WHAT SET US APART
        </div>
        <div className='setus_div2'>
          <div >
            <h1>Transparency</h1>
            <p>We provide detailed information about the origin and processing of our saffron, so you know exactly what you're buying.</p>
          </div>
          <div>
            <h1>Innovation</h1>
            <p>We continuously explore new ways to enhance the quality and usability of our saffron, ensuring we stay ahead of the market.</p>
          </div>
          <div>
            <h1>Passion</h1>
            <p>Our passion for saffron drives us to maintain the highest standards and share this incredible spice with the world.</p>
          </div>
        </div>
      </div>
      <div className='footer_plus'>
        <NewsLetter />
        <Footer />
      </div>
    </div>
  )
}

export default MainPageTrial