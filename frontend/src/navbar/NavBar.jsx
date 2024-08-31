import React from 'react'
import "../styles/Navbar.css"
import { PiUser } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/MainContext';
import logo from '../images/logo.png'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
 

function Navbar() {

  const { showMenuSub,setShowMenuSub,profileHover,setProfileHover,mainItems,setMainItems,menuItems,setMenuItems,menuSubItems,setMenuSubItems,sideBar,setSideBar,showNav,setShowNav,showLogin,setShowLogin } =useUserContext()
  const navigate = useNavigate()
  function handleLogin(e){
    setShowLogin(true)

  }
  function handleAbout(e){
    navigate('/about')

  }
  function handleMouseEnter(){
    setShowLogin(true)
  }
  function handelMenu(){
    setSideBar(true)
    setMenuItems(true)
    setMenuSubItems('mainitem')
  }
 function handleProfileEnter(){
  setProfileHover(true)

 }
 function handleProfileLeave(){
    setProfileHover(false)
 

 }

  return (
    <div className={`Navbar_main ${showNav?"true":""}`}>
        <div className='Navbar_div1'> 
          <AiOutlineMenu onClick={handelMenu}/>
          

        </div>
        <div className={`Navbar_div2 ${showNav?"true":""}`}   >
          Z PRINCESS SAFFRON
            
        </div>
        {/* <div className={`Navbar_div3 ${showNav?"true":""}`} >
            <div onMouseEnter={handleProfileEnter} onMouseLeave={handleProfileLeave} className='profile_div'>PREMKUMAR</div>
            <button onClick={()=>navigate('/products')}><HiOutlineShoppingBag/></button>
            <button onClick={()=>{navigate('/cart')}}><BsCart/></button>
        </div> */}

        <div className={`Navbar_div3 ${showNav?"true":""}`} >
            <button onMouseEnter={handleMouseEnter} onClick={handleLogin}><PiUser className='piUser' /> </button>
            <button onClick={()=>navigate('/products')}><HiOutlineShoppingBag/></button>
            <button onClick={()=>{navigate('/cart')}}><BsCart/></button>
        </div>

    </div>
  )
}

export default Navbar