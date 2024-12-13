import React, { useContext, useEffect, useState } from "react";
import "../../styles/SideBar.css";
import { IoCloseSharp } from "react-icons/io5";
import { useUserContext } from "../../context/MainContext";
import { useSpring, animated } from "react-spring";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/UserContext";
import { delay, motion } from "framer-motion";

import axios from "axios";

function SideBar() {
  const navigate = useNavigate();
  const [showStyle, setShowStyle] = useState();
  const [products, setProducts] = useState([]);
  const { user } = useContext(userContext);
  const {
    setMainPageItems,
    isMobile,
    setIsMobile,
    singleProduct,
    setSingleProduct,
    showMenuSub,
    setShowMenuSub,
    mainItems,
    setMainItems,
    setGoldenElixir,
    menuSlider,
    setMenuSlider,
    menuItems,
    setMenuItems,
    menuSubItems,
    setMenuSubItems,
    sideBar,
    setSideBar,
  } = useUserContext();
  useEffect(() => {
    setMainPageItems(false);
    // Fetch products from your API
    axios.get("/products").then((res) => {
      // Split the products into four based on variants
      const data = res.data;
      const splitProducts = [
        {
          _id: data[0]._id + "-0", // Unique ID for variant 1 of product 1
          name: `${data[0].name} `,
          price: data[0].variants[0].price,
          weight: data[0].variants[0].weight,
          fullProduct: data[0],
          stock: data[0].variants[0].stock,
        },
        {
          _id: data[0]._id + "-1", // Unique ID for variant 2 of product 1
          name: `${data[0].name}`,
          price: data[0].variants[1].price,
          weight: data[0].variants[1].weight,
          fullProduct: data[0],
          stock: data[0].variants[1].stock,
        },
        {
          _id: data[1]._id + "-0", // Unique ID for variant 1 of product 2
          name: `${data[1].name} `,
          price: data[1].variants[0].price,
          weight: data[1].variants[0].weight,
          fullProduct: data[1],
          stock: data[1].variants[0].stock,
        },
        {
          _id: data[1]._id + "-1", // Unique ID for variant 2 of product 2
          name: `${data[1].name} `,
          price: data[1].variants[1].price,
          weight: data[1].variants[1].weight,
          fullProduct: data[1],
          stock: data[1].variants[1].stock,
        },
      ];
      setProducts(splitProducts);
    });
  }, []);

  const parentVariants = {
    hidden: { x: "-100vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        staggerChildren: 0.3, // Stagger animation for children
      },
    },
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 40 },
    },
  };
  


  const handleProductClick = (val) => {
    // Navigate to product details page with the full product data
    const product = products[val];
    navigate(`/product/${product._id}`, { state: { product } });
    setMenuItems(false);
    setSideBar(false);
    setMenuSlider(false);
  };

  const itemAnimation1 = useSpring({
    opacity: menuItems ? 1 : 0,
    transform: menuItems ? "translateX(0)" : "translateX(-100%)",
    delay: 1000,
  });
  const itemAnimation2 = useSpring({
    opacity: menuItems ? 1 : 0,
    transform: menuItems ? "translateX(0)" : "translateX(-100%)",
    delay: 900,
  });
  const itemAnimation3 = useSpring({
    opacity: menuItems ? 1 : 0,
    transform: menuItems ? "translateX(0)" : "translateX(-100%)",
    delay: 800,
  });
  const itemAnimation4 = useSpring({
    opacity: menuItems ? 1 : 0,
    transform: menuItems ? "translateX(0)" : "translateX(-100%)",
    delay: 700,
  });
  const itemAnimation5 = useSpring({
    opacity: menuItems ? 1 : 0,
    transform: menuItems ? "translateX(0)" : "translateX(-100%)",
    delay: 600,
  });
  const itemAnimation6 = useSpring({
    opacity: menuItems ? 1 : 0,
    transform: menuItems ? "translateX(0)" : "translateX(-100%)",
    delay: 500,
  });

  const itemAnimation7 = useSpring({
    opacity: menuItems ? 1 : 0,
    transform: menuItems ? "translateX(0)" : "translateX(-100%)",
    delay: 400,
  });
  const itemAnimation8 = useSpring({
    opacity: menuSubItems ? 1 : 0,
    transform: menuSubItems ? "translateX(0)" : "translateX(-100%)",
    delay: 200,
  });
  const itemAnimation9 = useSpring({
    opacity: menuSubItems ? 1 : 0,
    transform: menuSubItems ? "translateX(0)" : "translateX(-100%)",
    delay: 300,
  });
  const itemAnimation10 = useSpring({
    opacity: menuItems ? 1 : 0,
    transform: menuItems ? "translateX(0)" : "translateX(-100%)",
    delay: 400,
  });

  const itemAnimation11 = useSpring({
    opacity: menuSubItems ? 1 : 0,
    delay: 600,
  });
  const itemAnimation12 = useSpring({
    opacity: menuSubItems ? 1 : 0,
    delay: 200,
  });
  const itemAnimation13 = useSpring({
    opacity: menuSubItems ? 1 : 0,
    delay: 100,
  });
  const itemAnimation14 = useSpring({
    opacity: menuSubItems ? 1 : 0,
    delay: 400,
  });

  function handleClose() {
    setMenuItems(false);
    setSideBar(false);
    setMenuSlider(false);
    setMainPageItems(true);
  }
  function handleBack() {
    setMenuSubItems("mainitem");
  }
  function handleKasmir() {
    setMenuItems(false);
    setMenuSubItems("");

    setMenuSubItems("kashmir");

    setTimeout(() => {
      setMenuItems(true);
    }, 600);
  }
  function handleSpain() {
    setMenuItems(false);
    setMenuSubItems("");

    setMenuSubItems("spain");

    setTimeout(() => {
      setMenuItems(true);
    }, 600);
  }
  function handleBackGolden() {
    setMenuSubItems("mainitem");
    setMenuSlider(false);
  }
  function handleKnowledgw() {
    setMenuItems(false);
    setMenuSubItems("");

    setMenuSubItems("knowledgehub");

    setTimeout(() => {
      setMenuItems(true);
    }, 600);
  }
  function handleProduct() {
    setMenuItems(false);
    setMenuSubItems("");

    setMenuSubItems("products");

    setTimeout(() => {
      setMenuItems(true);
    }, 600);
  }
  function handleWhyChooseUs() {
    setMenuItems(false);
    setSideBar(false);
    setMenuSlider(false);
    navigate("/choose-us");
  }
  function handleContactUs() {
    setMenuItems(false);
    setSideBar(false);
    setMenuSlider(false);
    navigate("/contactus");
  }
  function handleGoldenElixir() {
    setMenuItems(false);
    setMenuSubItems("");
    setMenuSlider(true);

    setMenuSubItems("goldenelixir");

    setTimeout(() => {
      setMenuItems(true);
    }, 600);
  }
  function handleGoldenElixerChange(val) {
    setGoldenElixir(val);
  }
  function handleMouseEnter(e) {
    setShowStyle(e);
  }
  function handleProductBack() {
    setMenuSubItems("products");
  }

  return (
    <div className={`sidebar_main ${sideBar ? "true" : "false"}`}>
      <div className="sidebar_div1">
        <IoCloseSharp onClick={handleClose} />
      </div>
      <div className="sidebar_div2">
        {menuItems ? (
          <>
            {menuSubItems == "knowledgehub" && (
              <>
                <animated.div
                  id="sidebar_kh"
                  className="menu-item"
                  onClick={handleBack}
                  style={itemAnimation4}
                >
                  <IoMdArrowRoundBack className="sidebar_arrow" />
                   KNOWLEDGE HUB
                </animated.div>
                <animated.div
                  className="menu-item"
                  onClick={() => navigate("/insight")}
                  style={itemAnimation3}
                >
                {isMobile? <>&nbsp;</>:""} INSIGHT{" "}
                </animated.div>
                <animated.div
                  className="menu-item"
                  onClick={() => navigate("/kashmiri-saffron")}
                  style={itemAnimation2}
                >
                 {isMobile? <>&nbsp;</>:""} KASHMIRI SAFFRON
                </animated.div>
                <animated.div
                  className="menu-item"
                  onClick={() => navigate("/spain-saffron")}
                  style={itemAnimation1}
                >
                  {isMobile? <>&nbsp;</>:""}  SPAIN SAFFRON
                </animated.div>
              </>
            )}
            {menuSubItems == "products" && (
              <>
                <animated.div
                  id="sidebar_kh"
                  className="menu-item"
                  onClick={handleBack}
                  style={itemAnimation3}
                >
                  <IoMdArrowRoundBack className="sidebar_arrow" />
                   PRODUCTS
                </animated.div>
                <animated.div
                  onClick={handleKasmir}
                  className="menu-item"
                  style={itemAnimation2}
                >
                  {" "}
                  {isMobile? <>&nbsp;</>:""}  KASHMIRI SAFFRON
                </animated.div>
                <animated.div
                  onClick={handleSpain}
                  className="menu-item"
                  style={itemAnimation1}
                >
                {isMobile? <>&nbsp;</>:""}   SPAIN SAFFRON
                </animated.div>
              </>
            )}
            {menuSubItems == "kashmir" && (
              <>
                <animated.div
                  id="sidebar_kh"
                  className="menu-item"
                  onClick={handleProductBack}
                  style={itemAnimation3}
                >
                  <IoMdArrowRoundBack className="sidebar_arrow" />
                  KASHMIRI SAFFRON
                </animated.div>
                <animated.div
                  onClick={() => handleProductClick(2)}
                  className="menu-item"
                  style={itemAnimation2}
                >
                  {" "}
                  {isMobile? <>&nbsp;</>:""}  2 GRAMS{" "}
                </animated.div>
                <animated.div
                  onClick={() => handleProductClick(3)}
                  className="menu-item"
                  style={itemAnimation1}
                >
                 {isMobile? <>&nbsp;</>:""}  5 GRAMS
                </animated.div>
              </>
            )}
            {menuSubItems == "spain" && (
              <>
                <animated.div
                  id="sidebar_kh"
                  className="menu-item"
                  onClick={handleProductBack}
                  style={itemAnimation3}
                >
                  <IoMdArrowRoundBack className="sidebar_arrow" />
                  SPAIN SAFFRON
                </animated.div>
                <animated.div
                  onClick={() => handleProductClick(0)}
                  className="menu-item"
                  style={itemAnimation2}
                >
                  {" "}
                  {isMobile? <>&nbsp;</>:""}  2 GRAMS{" "}
                </animated.div>
                <animated.div
                  onClick={() => handleProductClick(1)}
                  className="menu-item"
                  style={itemAnimation1}
                >
                 {isMobile? <>&nbsp;</>:""}  5 GRAMS
                </animated.div>
              </>
            )}

            {menuSubItems == "goldenelixir" && (
              <>
                <animated.div
                  id="sidebar_kh"
                  className="menu-item"
                  onClick={handleBackGolden}
                  style={itemAnimation1}
                >
                  <IoMdArrowRoundBack className="sidebar_arrow" />
                  GOLDEN ELIXIR
                </animated.div>
                {isMobile ? (
                  <>
                   <motion.div
      className="parent"
      variants={parentVariants}
      initial="hidden"
      animate="visible"
      
    >
                    <motion.div
                      onClick={() => {
                        navigate("/culinary-use");
                      }}
                      className="menu-img-item culinary"
                      variants={
                        {
                          hidden: { opacity: 0, x: -100 },
                          visible: {
                            opacity: 1,
                            x: 0,
          
                            transition: { type: "spring", stiffness: 40, delay:0 },
                          },
                        }
                      }
                    >
                      <div>CULINARY USES</div>
                    </motion.div>
                    <motion.div
                      onClick={() => {
                        navigate("/medicine-use");
                      }}
                      className="menu-img-item medicine"
                      variants={
                        {
                          hidden: { opacity: 0, x: -100 },
                          visible: {
                            opacity: 1,
                            x: 0,
          
                            transition: { type: "spring", stiffness: 40, delay:0.3 },
                          },
                        }
                      }
                    >
                      <div>MEDICINAL USES</div>
                    </motion.div>
                    <motion.div
                      onClick={() => {
                        navigate("/beauty-use");
                      }}
                      className="menu-img-item beauty"
                      variants={
                        {
                          hidden: { opacity: 0, x: -100 },
                          visible: {
                            opacity: 1,
                            x: 0,
          
                            transition: { type: "spring", stiffness: 40, delay:0.6 },
                          },
                        }
                      }
                    >
                      <div>BEAUTY USES</div>
                    </motion.div>
                    <motion.div
                      onClick={() => {
                        navigate("/pregnancy-use");
                      }}
                      className="menu-img-item pregnancy"
                      variants={
                        {
                          hidden: { opacity: 0, x: -100 },
                          visible: {
                            opacity: 1,
                            x: 0,
          
                            transition: { type: "spring", stiffness: 40, delay:0.9 },
                          },
                        }
                      }
                    >
                      <div>PREGNANT WOMAN</div>
                    </motion.div>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <animated.div
                      onClick={() => handleGoldenElixerChange("beauty")}
                      className="menu-item"
                      style={itemAnimation4}
                    >
                      BEAUTY USES
                    </animated.div>
                    <animated.div
                      onClick={() => handleGoldenElixerChange("culinary")}
                      className="menu-item"
                      style={itemAnimation2}
                    >
                      CULINARY
                    </animated.div>
                    <animated.div
                      onClick={() => handleGoldenElixerChange("medicine")}
                      className="menu-item"
                      style={itemAnimation3}
                    >
                      MEDICINAL USES
                    </animated.div>
                    <animated.div
                      onClick={() => handleGoldenElixerChange("pregnancy")}
                      className="menu-item"
                      style={itemAnimation5}
                    >
                      PREGNANCY
                    </animated.div>
                  </>
                )}
              </>
            )}
            {menuSubItems == "mainitem" && (
              <>
                <animated.div
                  onClick={handleKnowledgw}
                  className="menu-item"
                  style={itemAnimation1}
                  onMouseEnter={() => handleMouseEnter("knowlegdehub")}
                >
                  {" "}
                  <span
                    className={`menu_main_right ${
                      showStyle == "knowlegdehub" ? "true" : ""
                    }`}
                  >
                    Z
                  </span>
                  <span
                    className={`menu_main_items ${
                      showStyle == "knowlegdehub" ? "true" : ""
                    }`}
                  >
                    KNOWLEDGE HUB
                  </span>
                </animated.div>
                <animated.div
                  onClick={handleProduct}
                  className="menu-item"
                  style={itemAnimation2}
                  onMouseEnter={() => handleMouseEnter("products")}
                >
                  <span
                    className={`menu_main_right ${
                      showStyle == "products" ? "true" : ""
                    }`}
                  >
                    Z
                  </span>
                  <span
                    className={`menu_main_items ${
                      showStyle == "products" ? "true" : ""
                    }`}
                  >
                    PRODUCTS
                  </span>
                </animated.div>
                <animated.div
                  onClick={handleWhyChooseUs}
                  className="menu-item"
                  style={itemAnimation3}
                  onMouseEnter={() => handleMouseEnter("whychoose")}
                >
                  {" "}
                  <span
                    className={`menu_main_right ${
                      showStyle == "whychoose" ? "true" : ""
                    }`}
                  >
                    Z
                  </span>
                  <span
                    className={`menu_main_items ${
                      showStyle == "whychoose" ? "true" : ""
                    }`}
                  >
                    WHY CHOOSE US
                  </span>
                </animated.div>
                <animated.div
                  onClick={handleGoldenElixir}
                  className="menu-item"
                  style={itemAnimation4}
                  onMouseEnter={() => handleMouseEnter("golden")}
                >
                  <span
                    className={`menu_main_right ${
                      showStyle == "golden" ? "true" : ""
                    }`}
                  >
                    Z
                  </span>
                  <span
                    className={`menu_main_items ${
                      showStyle == "golden" ? "true" : ""
                    }`}
                  >
                    GOLDEN EXILIR
                  </span>
                </animated.div>
                <animated.div
                  onClick={() => {
                    navigate("/chatbot");
                  }}
                  className="menu-item"
                  style={itemAnimation5}
                  onMouseEnter={() => handleMouseEnter("recommendar")}
                >
                  <span
                    className={`menu_main_right ${
                      showStyle == "recommendar" ? "true" : ""
                    }`}
                  >
                    Z
                  </span>
                  <span
                    className={`menu_main_items ${
                      showStyle == "recommendar" ? "true" : ""
                    }`}
                  >
                    RECOMMENDAR
                  </span>
                </animated.div>
                {user ? (
                  <animated.div
                    onClick={() => {
                      navigate("/dashboard/profile");
                    }}
                    className="menu-item"
                    style={itemAnimation6}
                    onMouseEnter={() => handleMouseEnter("profile")}
                  >
                    {" "}
                    <span
                      className={`menu_main_right ${
                        showStyle == "profile" ? "true" : ""
                      }`}
                    >
                      Z
                    </span>
                    <span
                      className={`menu_main_items ${
                        showStyle == "profile" ? "true" : ""
                      }`}
                    >
                      PROFILE
                    </span>
                  </animated.div>
                ) : null}
                <animated.div
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="menu-item"
                  style={itemAnimation7}
                  onMouseEnter={() => handleMouseEnter("login")}
                >
                  {" "}
                  <span
                    className={`menu_main_right ${
                      showStyle == "login" ? "true" : ""
                    }`}
                  >
                    Z
                  </span>
                  <span
                    className={`menu_main_items ${
                      showStyle == "login" ? "true" : ""
                    }`}
                  >
                    LOGIN
                  </span>
                </animated.div>
              </>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default SideBar;
