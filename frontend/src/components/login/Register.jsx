import React from 'react'
import backvideo from '../../images/backvideo.mp4'
import saffrom_img from "../../images/saffron_img.png"
import '../../styles/Register.css'
import { useUserContext } from '../../context/MainContext'
import { useNavigate } from 'react-router-dom'
import RegisterForm from './RegisterForm'
import Otp from './Otp'
import back_register from '../../images/back_register.jpg'
function Register() {
  const { navOtp,setNavOtp }=useUserContext()
  const navigate = useNavigate()
  
  function handleContinue(){
    navigate('/user-register')
  }
  return (

    <div >
    <div className="video-container" >
      <video autoPlay loop muted>
        <source src={backvideo} type="video/mp4" />

      </video>
      <div className='Landermain'>
       <div className='lander_div'>
        <div className='lander_div1' >
          <div className='lander_div11'>
              <p>            zprincesssaffron
              </p>
              <h5> High quality saffron, best flavour and aroma for our products <br/>100% natural products to reach out customers.</h5>
          </div>
          <div className='lander_div12'>
            <img src={saffrom_img} alt="" />
          </div>

        </div>
       
        <div className='lander_div2'>
          {navOtp?(<Otp/>):(<RegisterForm/>)}
          

        </div>
       </div>
      </div>
    </div>

  </div>
  )
}

export default Register