import React from 'react'
import '../../styles/LoginPagee.css'
import profile from '../../assets/profile.png'
import { IoMailSharp } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import backvideo from '../../images/backvideo.mp4'
import axios from 'axios';
function LoginPagee() {
 async function handleLogin(){
    try {
      const response = await axios.post('/login', {
        "email":"gokul2@gmail.com",
        "password":"123456"
      });
      console.log('Registration Successful', response.data);
      // Handle successful registration, e.g., redirect to login page
      


    } catch (error) {
      console.error('Registration Error', error.response.data);
      // Handle registration error
    }
  }
  return (
    <div className='loginpageemain'>
       <video loop muted autoPlay>
                <source src={backvideo} type="video/mp4" />
              </video>
      
        <div className='loginpagee_div1'>
        <div className='loginpagee_div11'>
          <img src={profile} alt="" />
          <h1>CUSTOMER LOGIN</h1>
          <div className='loginpagee_input'>
            <input placeholder='Enter Email' type="text" />
            <p><IoMailSharp/></p>

          </div>
          <div className='loginpagee_input'>
            <input  placeholder='Enter Password' type="password" />
            <p><IoIosLock/></p>

          </div>
          <button onClick={handleLogin}>LOGIN</button>
          <h3>New User? Create Account</h3>

      </div>
        </div>
 
    </div>
  )
}

export default LoginPagee