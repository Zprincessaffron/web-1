import React, { useEffect, useState, useRef, useContext } from "react";
import "../../styles/MainPage.css";
import backvideo from "../../images/backvideo.mp4";
import Navbar from "../../navbar/NavBar";
import Footer from "../../footer/Footer";
import { useUserContext } from "../../context/MainContext";
import LoginHover from "../../navbar/LoginHover";
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
import Arrowbtn from '../button/Arrowbtn'
import FinalProduct from '../product/FinalProduct'
import Cursor from './Cursor'
import ReactSlick from '../product/ReactSlick'
import RecommenderTest from "./RecommenderTest";
import { userContext } from "../../context/UserContext";

gsap.registerPlugin(ScrollTrigger); 
function MainPageTrial() {
  const navigate = useNavigate()
  const showproduct = true 
  const { mainpageItems,setMainPageItems,CustomCuser,setCustomCuser,isMouse,setIsMouse,isMobile,profileHover, setProfileHover, menuSlider, setMenuSlider, sideBar, setSideBar, setShowNav, showLogin } = useUserContext()
  const [showEnd, setShowEnd] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0);
  const [height, setHeight] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [zPrinces, setZPrincess] = useState(true);
  const [videoPlay, setVideoPlay] = useState(true);
  const [showFinalProduct, setFinalProduct] = useState(false);

  ///////////////////////////
  useEffect(() => {
    setMenuSlider(false);
    setSideBar(false);
    setTimeout(() => {
      setMainPageItems(true)
    }, 300);
  }, []);

  const cursorRoundedRef = useRef(null);
  const cursorPointedRef = useRef(null);
  const secondDivRef = useRef(null);

  // Function to handle the scroll
  const scrollToSecondDiv = () => {
    // Use scrollIntoView to scroll to the second div
    secondDivRef.current.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      
      setFinalProduct(true);
    }, 800);
  };


  useEffect(() => {
    // Function to move the cursor
    // scrollToSecondDiv()
    const moveCursor = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Update the transform of both cursor elements
      if (cursorRoundedRef.current) {
        cursorRoundedRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      if (cursorPointedRef.current) {
        cursorPointedRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    // Add event listener on component mount
    window.addEventListener("mousemove", moveCursor);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollRatio = scrollPosition / maxScroll;

      // Adjust this calculation as needed
      const maxTranslateX = 500; // maximum translate value in pixels
      const newTranslateX = maxTranslateX * scrollRatio;

      setTranslateX(newTranslateX);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
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

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  function handleEndShow() {
    setShowEnd(!showEnd);
  }
  function handleDiscoverNow() {
    navigate("/about-us");
  }
  const videoRef = useRef(null);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();

      setVideoPlay(false);
    }
  };
  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      console.log("clicked");

      setVideoPlay(true);
    }
  };
  console.log("video", videoPlay);

  const handleDemoRedirect = () => {
    if (user) {
      // Assuming user object contains necessary information
      const demoParams = new URLSearchParams({
        userId: user.id, // Pass user ID or any necessary information
        demo: 'true' // Add demo parameter if needed
      }).toString();
      
      window.open(`/home?${demoParams}`, '_blank', 'noopener,noreferrer');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
       {/* <RecommenderTest/> */}
       <Navbar adjustScrollPosition={scrollToSecondDiv}  showproduct={showproduct}/>
      <SideBar />
      <MenuSlider />  
      {profileHover ? (
        <ProfileHover />) : (null)}
      {showLogin ? (<LoginHover />) : ' '}
  
    <div className='mainpage_main'>
      <div   className={`mainpagecon ${height ? "true" : ''}`}>
        <div style={{ transform: `translateY(${scrollPosition * 0.2}px)` }} className='mainpage_con1'>
          <div  onClick={videoPlay?(playVideo):(pauseVideo)}  className='mainpage_container'>
            <div className="video-container">
            
              <video ref={videoRef} loop muted autoPlay>
                <source src={backvideo} type="video/mp4" />
              </video>
              <div className="mainpage_div">
                <div className={`mainpage_div1 ${mainpageItems ? "true" : "false"}`}>
                  {/* //////////////// */}Z PRINCESS SAFFRON
                  {/* /////////////// */}
                </div>
                <div className={`line_l ${mainpageItems?"true":""}`}></div>
                <div className={`mainpage_div2 ${mainpageItems?"true":"false"}`}>World's Finest Saffron</div>
                <div className={`mainpage_div3 ${mainpageItems?"true":"false"}`} >
                  <Arrowbtn
                    linkFromMain="/about-us"
                    onMouseEnter={() => {
                      setIsMouse(false);
                    }}
                    onMouseLeave={() => {
                      setIsMouse(true);
                    }}
                    name="DISCOVER NOW"
                  />
                  {/* <a onClick={handleDemoRedirect} className="arrow-btn">
                    <Arrowbtn name="Web 2" linkFromMain="/" />
                  </a> */}
                </div>
                <div className="mainpage_end"></div>
              </div>
            </div>
          </div>
        </div>
        <div ref={secondDivRef}
          onMouseLeave={() => {
            setFinalProduct(false);
          }}
          className="mainpage_con2"
          style={{ transform: `translateY(${scrollPosition * -0.2}px)` }}
        >
          <OurProducts  
            showFinalProduct={showFinalProduct}
            setFinalProduct={setFinalProduct}
          />
            <div  
              className={`mainpage_con212 ${showFinalProduct ? "true" : ""}`}
            >
              <FinalProduct />
            </div>
        </div>
      </div>

      <div  className="mainpagetrialdiv">
        <div className="setus_div1">WHAT SET US APART</div>
        <div className="setus_div2">
          <div>
            <h1>Transparency</h1>
            <p>
              We provide detailed information about the origin and processing of
              our saffron, so you know exactly what you're buying.
            </p>
          </div>
          <div>
            <h1>Innovation</h1>
            <p>
              We continuously explore new ways to enhance the quality and
              usability of our saffron, ensuring we stay ahead of the market.
            </p>
          </div>
          <div>
            <h1>Passion</h1>
            <p>
              Our passion for saffron drives us to maintain the highest
              standards and share this incredible spice with the world.
            </p>
          </div>
        </div>
      </div>
      <div className='footer_plus'>
        <NewsLetter />
      </div>
    </div>
    <Footer />

    </>
  )
}

export default MainPageTrial;
