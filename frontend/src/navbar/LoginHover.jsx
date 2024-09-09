import React from 'react'
import '../styles/LoginHover.css'
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/MainContext'; 
function LoginHover() {
    const { showLogin,setShowLogin }=useUserContext()
    const navigate = useNavigate()
    function handleClose(){
        setShowLogin(false)
    }
    function handelMouseLeave(){
        setShowLogin(false)

    } 
  return (
    <div onMouseLeave={handelMouseLeave} className='loginhover_main'>
        <div  className='loginhover_div1'>
        <IoMdClose onClick={handleClose} />
        </div>
        <div className='loginhover_div2'>
            <div>
            ALREADY HAVE AN ACCOUNT?
            </div>
            <p>
            Log in for a personalised experience and benefit from all your advantages and offers.
            </p>
            <button onClick={()=>{navigate('/login')}}>
                LOGIN
            </button>
        </div>
        <div className='loginhover_div3'>
            <div>NOT REGISTERED YET?</div>
            <p>Join and take advantage of exclusive benefits!</p>
            <button  onClick={()=>{navigate('/register')}}>REGISTER</button>
        </div>
    </div>
  )
}

export default LoginHover