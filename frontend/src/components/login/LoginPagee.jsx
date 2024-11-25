import React, { useContext, useState } from 'react'
import '../../styles/LoginPagee.css'
import profile from '../../assets/profile.png'
import { IoMailSharp } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import backvideo from '../../images/backvideo.mp4'
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaMobileAlt } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { userContext } from '../../context/UserContext';
function LoginPagee() {
  const navigate = useNavigate();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [loading,setLoading]=useState(true);
  const { setUser }=useContext(userContext)
  const [mobileIcon,setMobileIcon] = useState(false);
  const [forgotPassword,setForgotPassword] = useState(false); // Track state for forgot password
  const [otpSent, setOtpSent] = useState(false); // Track OTP state
  const [otp, setOtp] = useState(""); // OTP input state
  const [newPassword, setNewPassword] = useState(""); // New password state
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password state

  const [values, setValues] = useState({
    "email": "",
    "password": ""
  });

  async function handleLogin() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if(!values.email) {
      toast("Enter your email or phone");
      return;
    }
    if (!values.password && values.password.length < 6) {
      setPassword(true);
      return;
    }
    if (emailRegex.test(values.email)) {
      setMobileIcon(false)
          try {
            setLoading(false)
            await axios.post('/login',{
              email:values.email,
              password:values.password
            }).then((res)=>{
              localStorage.setItem("token",res.data.token)
              console.log('tokken',res.data.token)
              
              const decodedToken = jwtDecode(res.data.token);
              setUser(decodedToken)
              if(res.data.role){
                setLoading(true)
              setTimeout(() => {
                navigate('/')
              }, 1000);
              }

              // Extract relevant information from the token
              const { name,email,role,id  } = decodedToken;
              
              toast("Successfully Loged")
            })
      
      
          } catch (error) {
            console.error('Registration Error', error.response.data);
            if(error.response.data.msg){
              setLoading(false)
              toast(error.response.data.msg)
             
      
            }}
          
    } else if (phoneRegex.test(values.email)) {
      setMobileIcon(true)

      try {
        setLoading(false)
        await axios.post('/login',{
          phone:values.email,
          password:values.password
        }).then((res)=>{
          setLoading(true)
          console.log("tryna")
          
          
          toast("Successfully Loged")
        })
  
        
  
  
      } catch (error) {
        console.error('Registration Error', error.response.data);
        if(error.response.data.msg){
          setLoading(true)
          toast(error.response.data.msg)
         
  
        }
        }

      return 'phone';
    } else {
      toast("Enter a valid email or phone")


      return 'invalid';
    
    }
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  // Handle Forgot Password request
  async function handleForgotPassword() {
    if (!values.email) {
      toast("Please enter your email or phone");
      return;
    }
    try {
      const response = await axios.post('/forgot-password', { emailOrPhone: values.email });
      toast("OTP sent to your email/phone");
      setOtpSent(true); // OTP sent, show the OTP input
    } catch (error) {
      toast("Only user and wholesaler can change password");
    }
  }

  // Handle OTP verification and password reset
  async function handleVerifyOtp() {
    if (otp.length !== 6 || newPassword !== confirmPassword) {
      toast("Please enter a valid OTP or passwords don't match");
      return;
    }
  
    try {
      const response = await axios.post('/verify-password-otp', {
        emailOrPhone: values.email,
        otp,
        newPassword
      });
  
      if (response.status === 200) {
        toast("Password successfully reset");
        setForgotPassword(false); // Reset flow complete, return to login
        setOtpSent(false);
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast(response.data.msg || "Something went wrong");
      }
    } catch (error) {
      toast("OTP verification failed or reset failed");
    }
  }
  

  return (
    <div className='loginpageemain'>
      <div className='loginpageemain23'>
      <video loop muted autoPlay>
        <source src={backvideo} type="video/mp4" />
      </video>
      </div>
      <div className='loginpagee_div1'>
        <div className='loginpagee_div11'>
          <img src={profile} alt="" />
          <h1>{forgotPassword ? "RESET PASSWORD" : "CUSTOMER LOGIN"}</h1>

          {!forgotPassword ? (
            <>
              <div className='loginpagee_input'>
                <input placeholder='Enter Email or Phone number' className={`inputemail ${email?"true":""}`} type="email" name="email" value={values.email} onChange={handleChange} />
                <p>{mobileIcon?(<FaMobileAlt/>):(<IoMailSharp/>)}</p>
              </div>
              <div className='loginpagee_input'>
                <input  placeholder='Enter Password' className={`inputpassword ${password?"true":""}`}  type="password" name="password" value={values.password} onChange={handleChange} />
                <p><IoIosLock/></p>
              </div>
              <div className='loginpagee_fp'>
                <h3 onClick={() => setForgotPassword(true)}>Forgot Password ?</h3>
              </div>
              <button onClick={handleLogin}>{loading ? "LOGIN" : <AiOutlineLoading3Quarters  className='loading-spinner'/>}</button>
            </>
          ) : (
            <>
              {!otpSent ? (
                <>
                  <div className='loginpagee_input'>
                    <input placeholder='Enter Email or Phone number' className={`inputemail ${email?"true":""}`} type="email" name="email" value={values.email} onChange={handleChange} />
                    <p>{mobileIcon?(<FaMobileAlt/>):(<IoMailSharp/>)}</p>
                  </div>
                  <button onClick={handleForgotPassword}>Send OTP</button>
                </>
              ) : (
                <>
                  <div className='loginpagee_input'>
                    <input placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)} />
                  </div>
                  <div className='loginpagee_input'>
                    <input placeholder='New Password' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  </div>
                  <div className='loginpagee_input'>
                    <input placeholder='Confirm Password' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </div>
                  <button onClick={handleVerifyOtp}>Reset Password</button>
                </>
              )}
            </>
          )}
          <h3 onClick={()=>{navigate('/register')}}>New User ? Create Account</h3>
        </div>
      </div>
    </div>
  )
}

export default LoginPagee;
