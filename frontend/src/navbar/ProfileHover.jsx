import React from 'react'
import { CgProfile } from "react-icons/cg";
import { BsBoxSeam } from "react-icons/bs";
import { BsCart } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/MainContext';

function ProfileHover() {
    const navigate = useNavigate()
    const { setProfileHover }=useUserContext()
    function handleNavigate(val){
        navigate(val)
    }
    function handleProfileEnter(){
      setProfileHover(true)
    
     }
     function handleProfileLeave(){
      setProfileHover(false)
    
     }
  return (
    <div className='ph_main' onMouseEnter={handleProfileEnter} onMouseLeave={handleProfileLeave} >
        <div onClick={()=>handleNavigate('/userprofile')}> <CgProfile/> Profile</div>
        <div onClick={()=>handleNavigate('/userorder')}><BsBoxSeam/> Orders</div>
        <div onClick={()=>handleNavigate('/usercart')}> <BsCart/> Cart</div>
        <div onClick={()=>handleNavigate('/userlogout')}><CiLogout/> Logout</div>

    </div>
  )
}

export default ProfileHover