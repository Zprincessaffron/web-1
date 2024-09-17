import React, { useState } from 'react'
import '../../styles/LoginPagee.css'
import profile from '../../assets/profile.png'
import { IoMailSharp } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import backvideo from '../../images/backvideo.mp4'
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function LoginPagee() {
  const navigate = useNavigate()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const [loading,setLoading]=useState(true)
  const [values, setValues] = useState({
    "email": "",
    "password": ""
  });
 async function handleLogin(){

    if(!values.email && !/\S+@\S+\.\S+/.test(values.email)){
      setEmail(true)
      return
    }
    if(!values.password && values.password.length<6){
      setPassword(true)
      return
    }
    try {
      setLoading(false)
      await axios.post('/login',{
        email:values.email,
        password:values.password
      }).then((res)=>{
        setLoading(true)
        navigate("/")
      })

      


    } catch (error) {
      console.error('Registration Error', error.response.data);
    }

  }
console.log(values)
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value 
    }));
  };

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
            <input placeholder='Enter Email' className={`inputemail ${email?"true":""}`} type="email" name="email" value={values.email} onChange={handleChange}  />
            <p><IoMailSharp/></p>

          </div>
          <div className='loginpagee_input'>
            <input  placeholder='Enter Password' className={`inputpassword ${password?"true":""}`}  type="password" name="password" value={values.password} onChange={handleChange} />
            <p><IoIosLock/></p>

          </div>
          <button onClick={handleLogin}>{loading?"LOGIN":<AiOutlineLoading3Quarters  className='loading-spinner'/>
          }</button>
          <h3>New User? Create Account</h3>

      </div>
        </div>
 
    </div>
  )
}

export default LoginPagee