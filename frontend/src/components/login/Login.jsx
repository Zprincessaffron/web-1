import React, { useState } from "react";
import backvideo from "../../images/backvideo.mp4";
import saffrom_img from "../../images/saffron_img.png";
import "../../styles/Register.css";
import { useUserContext } from "../../context/MainContext";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import Otp from "./Otp";
import LoginForm from "./LoginForm";
function Login() {
  const { navOtp, setNavOtp, isMobile } = useUserContext();

  const [position, setPosition] = useState(true);
  const [positionForm, setPositionForm] = useState("login");

  const navigate = useNavigate();

  function handleContinue() {
    navigate("/user-register");
  }
  function handlePosition() {
    setPosition(!position);
    if (positionForm == "login") {
      setPositionForm("register");
    }
    if (positionForm == "register") {
      setPositionForm("login");
    }
  }
  return (
    <div>
      <div className="video-container">
        <video autoPlay loop muted>
          <source src={backvideo} type="video/mp4" />
        </video>
        {isMobile ? (
          <div className="Landermain">
            <div className="lander_div">
              <div className={`lander_div2`}>
                {positionForm == "register" && (
                  <>
                    {navOtp ? (
                      <Otp />
                    ) : (
                      <>
                        <RegisterForm />
                        <div className="newuser">
                          <h1>Existing User?</h1>
                          <button
                            onClick={() => {
                              setPositionForm("login");
                            }}
                          >
                            Register
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}
                {positionForm == "login" && (
                  <>
                    <LoginForm />
                    <div className="newuser">
                      <h1>Existing User?</h1>
                      <button
                        onClick={() => {
                          setPositionForm("register");
                        }}
                      >
                        Register
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="Landermain">
            <div className="lander_div">
              <div className={`lander_div1 ${position ? "true" : ""}`}>
                <div className="lander_div11">
                  <p> zprincesssaffron</p>
                  <h5>
                    {" "}
                    High quality saffron, best flavour and aroma for our
                    products <br />
                    100% natural products to reach out customers.
                  </h5>
                </div>
                <div className="lander_div12">
                  <img src={saffrom_img} alt="" />
                </div>
                {!navOtp ? (
                  <div className="lander_div13">
                    {positionForm == "login" && <p>New User?</p>}
                    {positionForm == "register" && <p>Existing User?</p>}
                    <button onClick={handlePosition}>
                      {" "}
                      {positionForm == "login" ? "register" : null}{" "}
                      {positionForm == "register" ? "login" : null}
                    </button>
                  </div>
                ) : null}
              </div>

              <div className={`lander_div2 ${position ? "true" : ""}`}>
                {positionForm == "register" && (
                  <>{navOtp ? <Otp /> : <RegisterForm />}</>
                )}
                {positionForm == "login" && <LoginForm />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
