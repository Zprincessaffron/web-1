import React, { useContext, useState } from "react";
import "../styles/NavBar.css";
import { PiUser } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/MainContext";
import { BsCart } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { userContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { IoBagOutline } from "react-icons/io5";

function Navbar({ itemCount, adjustScrollPosition, showproduct }) {
  const { addToCart, cartItems } = useContext(CartContext);
  const [showline, setShowLine] = useState(false);
  const {
    setMainPageItems,
    isMobile,
    showMenuSub,
    setShowMenuSub,
    profileHover,
    setProfileHover,
    mainItems,
    setMainItems,
    menuItems,
    setMenuItems,
    menuSubItems,
    setMenuSubItems,
    sideBar,
    setSideBar,
    showNav,
    setShowNav,
    showLogin,
    setShowLogin,
  } = useUserContext();
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  function handleLogin(e) {
    setShowLogin(true);
  }
  function handleAbout(e) {
    navigate("/about");
  }
  function handleMouseEnter() {
    setShowLogin(true);
  }
  function handelMenu() {
    setSideBar(true);
    setMenuItems(true);
    setMenuSubItems("mainitem");
    setMainPageItems(false);
  }
  function handleProfileEnter() {
    setProfileHover(true);
  }
  function handleProfileLeave() {
    setProfileHover(false);
  }

  return (
    <div className={`Navbar_main ${showNav ? "true" : ""}`}>
      <div className="Navbar_div1">
        <div className={`Navbar_div11 ${showNav ? "true" : ""}`}>
          <AiOutlineMenu
            className="menuicon"
            onMouseEnter={() => {
              setShowLine(true);
            }}
            onMouseLeave={() => {
              setShowLine(false);
            }}
            onClick={handelMenu}
          />{" "}
          {!isMobile ? (
            <span
              className={`menutext ${showline ? "true" : ""}`}
              onClick={handelMenu}
            >
              Menu
            </span>
          ) : null}
        </div>
      </div>
      <div className={`Navbar_div2 ${showNav ? "true" : ""}`}>
        <span
          onClick={() => {
            navigate("/");
          }}
        >
          Z PRINCESS SAFFRON
        </span>
      </div>

      <div className={`Navbar_div3 ${showNav ? "true" : ""}`}>
        {user ? (
          <button
            className="button_user"
            onClick={() => {
              navigate("/dashboard/profile");
            }}
          >
            {!isMobile ? (
              <span>{user.name} </span>
            ) : (
              <PiUser className="piUser" />
            )}
          </button>
        ) : (
          <button onMouseEnter={handleMouseEnter} onClick={handleLogin}>
            <PiUser className="piUser" />{" "}
          </button>
        )}
        {showproduct ? (
          <button onClick={() => adjustScrollPosition(500)}>
            <IoBagOutline />
          </button>
        ) : null}
        <button
          style={{ position: "relative", overflow: "hidden", padding: "5px" }}
          onClick={() => {
            navigate("/cart");
          }}
        >
          <BsCart />{" "}
          <p
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "#fd625e",
              color: "#ffe8e8",
              height: "15px",
              width: "15px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              fontSize: "10px",
            }}
          >
            {cartItems.length}
          </p>{" "}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
