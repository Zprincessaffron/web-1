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
  const navigate = useNavigate()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const [loading,setLoading]=useState(true)
  const { setUser }=useContext(userContext)
  const [mobileIcon,setMobileIcon] = useState(false)
  const [values, setValues] = useState({
    "email": "",
    "password": ""
  });
 async function handleLogin(){
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[0-9]{10}$/;

    if(!values.email && !/\S+@\S+\.\S+/.test(values.email)){
      setEmail(true)
      return
    }
    if(!values.password && values.password.length<6){
      setPassword(true)
      return
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
    if(name=='email' ){
      const numberRegex = /^[0-9]+$/; 
        if(numberRegex.test(value)){
          setMobileIcon(true)
        
        }else{
          setMobileIcon(false)

        }
    }
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
            <input placeholder='Enter Email or Phone number' className={`inputemail ${email?"true":""}`} type="email" name="email" value={values.email} onChange={handleChange}  />
            <p>{mobileIcon?(<FaMobileAlt/>):(<IoMailSharp/>)}</p>
          </div>
          <div className='loginpagee_input'>
            <input  placeholder='Enter Password' className={`inputpassword ${password?"true":""}`}  type="password" name="password" value={values.password} onChange={handleChange} />
            <p><IoIosLock/></p>
          </div>
          <button onClick={handleLogin}>{loading?"LOGIN":<AiOutlineLoading3Quarters  className='loading-spinner'/>
          }</button>
          <h3 onClick={()=>{navigate('/register')}}>New User? Create Account</h3>
      </div>
        </div>
    </div>
  )
}

export default LoginPagee