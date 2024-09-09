import React, { useContext, useState } from 'react'
import '../../styles/SideBar.css'
import { IoCloseSharp } from "react-icons/io5";
import { useUserContext } from '../../context/MainContext'; 
import { useSpring, animated } from 'react-spring';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaL } from 'react-icons/fa6';
import culinaryslide from '../../images/culinaryslide.jpg'
import medicinalslider from '../../images/medicinalslider.jpg'
import pregnancyslider from '../../images/pregnancyslider.jpg'
import beautyslider from '../../images/beautyslider.jpg'
import { userContext } from '../../context/UserContext';

function SideBar() {
  const navigate = useNavigate()
  const { user } =useContext(userContext)
    const { isMobile, setIsMobile,singleProduct,setSingleProduct,showMenuSub,setShowMenuSub,mainItems,setMainItems,setGoldenElixir,menuSlider,setMenuSlider,menuItems,setMenuItems,menuSubItems,setMenuSubItems,sideBar,setSideBar }=useUserContext()


    const itemAnimation1 = useSpring({
        opacity: menuItems ? 1 : 0,
        transform: menuItems ? 'translateX(0)' : 'translateX(-100%)',
        delay: 1000,
      });
      const itemAnimation2 = useSpring({
        opacity: menuItems ? 1 : 0,
        transform: menuItems ? 'translateX(0)' : 'translateX(-100%)',
        delay: 900,
      });
      const itemAnimation3 = useSpring({
        opacity: menuItems ? 1 : 0,
        transform: menuItems ? 'translateX(0)' : 'translateX(-100%)',
        delay: 800,
      });
      const itemAnimation4 = useSpring({
        opacity: menuItems ? 1 : 0,
        transform: menuItems ? 'translateX(0)' : 'translateX(-100%)',
        delay: 700,
      });
      const itemAnimation5 = useSpring({
        opacity: menuItems ? 1 : 0,
        transform: menuItems ? 'translateX(0)' : 'translateX(-100%)',
        delay: 600,
      });
      const itemAnimation6 = useSpring({
        opacity: menuItems ? 1 : 0,
        transform: menuItems ? 'translateX(0)' : 'translateX(-100%)',
        delay: 500,
      });

      
      const itemAnimation7 = useSpring({
        opacity: menuItems ? 1 : 0,
        transform: menuItems ? 'translateX(0)' : 'translateX(-100%)',
        delay: 400,
      });
      const itemAnimation8 = useSpring({
        opacity: menuSubItems ? 1 : 0,
        transform: menuSubItems ? 'translateX(0)' : 'translateX(-100%)',
        delay: 200,
      });
      const itemAnimation9 = useSpring({
        opacity: menuSubItems ? 1 : 0,
        transform: menuSubItems ? 'translateX(0)' : 'translateX(-100%)',
        delay: 300,
      });
      const itemAnimation10 = useSpring({
        opacity: menuItems ? 1 : 0,
        transform: menuItems ? 'translateX(0)' : 'translateX(-100%)',
        delay: 400,
      });

      
      const itemAnimation11 = useSpring({
        opacity: menuSubItems ? 1 : 0,
        transform: menuSubItems ? 'translateX(0)' : 'translateX(-100%)',
        delay: 300,
      });
      const itemAnimation12 = useSpring({
        opacity: menuSubItems ? 1 : 0,
        transform: menuSubItems ? 'translateX(0)' : 'translateX(-100%)',
        delay: 200,
      });
      const itemAnimation13 = useSpring({
        opacity: menuSubItems ? 1 : 0,
        transform: menuSubItems ? 'translateX(0)' : 'translateX(-100%)',
        delay: 100,
      });
      const itemAnimation14 = useSpring({
        opacity: menuSubItems ? 1 : 0,
        transform: menuSubItems ? 'translateX(0)' : 'translateX(-100%)',
        delay: 500,
      });
      
      
 function handleClose(){
  setMenuItems(false)
  setSideBar(false)
  setMenuSlider(false)

 }
 function handleBack(){
  setMenuSubItems('mainitem')
  
 }
 function handleKasmir(){
  setMenuItems(false)
  setSideBar(false)
  setMenuSlider(false)
  setSingleProduct(true)

  navigate('/singleproduct')
  
 }
 function handleSpain(){
  setMenuItems(false)
  setSideBar(false)
  setMenuSlider(false)
  setSingleProduct(false)
  navigate('/singleproduct')
  
 }
 function handleBackGolden(){
  setMenuSubItems('mainitem')
  setMenuSlider(false)



 }
 function handleKnowledgw(){
  setMenuItems(false)
  setMenuSubItems('')
  
  setMenuSubItems('knowledgehub')

  setTimeout(() => {
    
  setMenuItems(true)
  }, 600);

  
 }
 function handleProduct(){
  setMenuItems(false)
  setMenuSubItems('')
  
  setMenuSubItems('products')

  setTimeout(() => {
    
  setMenuItems(true)
  }, 600);
  
  
 }
 function handleWhyChooseUs(){
  setMenuItems(false)
  setSideBar(false)
  setMenuSlider(false)
  navigate('/choose-us')
  
 }
 function handleContactUs(){
  setMenuItems(false)
  setSideBar(false)
  setMenuSlider(false)
  navigate('/contactus')
  
 }
 function handleGoldenElixir(){
  setMenuItems(false)
  setMenuSubItems('')
  setMenuSlider(true)
  
  setMenuSubItems('goldenelixir')

  setTimeout(() => {
    
  setMenuItems(true)
  }, 600);
  
 }
 function handleGoldenElixerChange(val){
  
  setGoldenElixir(val)
 }
 console.log(menuItems)
 console.log(menuSubItems)

  return (
    <div className={`sidebar_main ${sideBar?"true":"false"}`}>
        <div className='sidebar_div1'>
            <IoCloseSharp onClick={handleClose}/>

        </div>
        <div className='sidebar_div2'>
            {menuItems?(
                <>
                   {menuSubItems == 'knowledgehub' && (
                    <>
                    <animated.div id="sidebar_kh" className="menu-item" onClick={handleBack} style={itemAnimation1}><IoMdArrowRoundBack className='sidebar_arrow'/>KNOWLEDGE HUB</animated.div>
                   <animated.div className="menu-item" onClick={()=>navigate('/insight')} style={itemAnimation2}>INSIGHT </animated.div>
        <animated.div className="menu-item" onClick={()=>navigate('/kashmiri-saffron')}  style={itemAnimation3}>KASHMIRI SAFFRON</animated.div>
        <animated.div className="menu-item" style={itemAnimation9}>SPAIN SAFFRON</animated.div>
                    </>)
                   }
                    {menuSubItems == 'products' && (
                    <>
                    <animated.div id="sidebar_kh" className="menu-item" onClick={handleBack} style={itemAnimation1}><IoMdArrowRoundBack className='sidebar_arrow'/>PRODUCTS</animated.div>
        <animated.div onClick={handleKasmir} className="menu-item" style={itemAnimation2}>KASHMIRI SAFFRON</animated.div>
        <animated.div  onClick={handleSpain}  className="menu-item" style={itemAnimation3}>SPAIN SAFFRON</animated.div>
                    </>)
                   }
                    
                    {menuSubItems == 'goldenelixir' && (
                    <>
                    <animated.div id="sidebar_kh" className="menu-item" onClick={handleBackGolden} style={itemAnimation1}><IoMdArrowRoundBack className='sidebar_arrow'/>GOLDEN ELIXIR</animated.div>
                    {isMobile?( <>
                      <animated.div onClick={()=>{navigate('/culinary-use')}}  className="menu-img-item culinary" style={itemAnimation2} >
                        <div>CULINARY USES</div>
                      </animated.div>
                      <animated.div onClick={()=>{navigate('/medicine-use')}}  className="menu-img-item medicine" style={itemAnimation3}><div>MEDICINE</div></animated.div>
                      <animated.div onClick={()=>{navigate('/beauty-use')}}  className="menu-img-item beauty" style={itemAnimation4}><div>FACE CARE</div></animated.div>
                      <animated.div onClick={()=>{navigate('/pregnancy-use')}}   className="menu-img-item pregnancy" style={itemAnimation5}><div>PREGNANCY</div></animated.div>
                      </>):(
                      <>
                      <animated.div onClick={()=> handleGoldenElixerChange('culinary')}  className="menu-item" style={itemAnimation2}>CULINARY</animated.div>
                      <animated.div onClick={()=> handleGoldenElixerChange('medicine')} className="menu-item" style={itemAnimation3}>MEDICINE</animated.div>
                      <animated.div onClick={()=> handleGoldenElixerChange('beauty')}  className="menu-item" style={itemAnimation4}>FACE CARE</animated.div>
                      <animated.div onClick={()=> handleGoldenElixerChange('pregnancy')}  className="menu-item" style={itemAnimation5}>PREGNANCY</animated.div>
                      </>
                    )}

                    </>)
                   }
                    {menuSubItems == 'mainitem' && (
              <><animated.div onClick={handleKnowledgw} className="menu-item" style={itemAnimation1}>KNOWLEDGE HUB</animated.div>
              <animated.div  onClick={handleProduct} className="menu-item" style={itemAnimation2}>PRODUCTS</animated.div>
              <animated.div onClick={handleWhyChooseUs} className="menu-item" style={itemAnimation3}>WHY CHOOSE US</animated.div>
              <animated.div  onClick={handleGoldenElixir} className="menu-item" style={itemAnimation4}>GOLDEN EXILIR</animated.div>
              <animated.div  onClick={()=>{navigate('/chatbot')}} className="menu-item" style={itemAnimation5}> RECOMMENDAR</animated.div>
              {user?(              <animated.div  onClick={()=>{navigate('/dashboard/profile')}} className="menu-item" style={itemAnimation6}> PROFILE</animated.div>
):(null)}
              <animated.div onClick={handleContactUs}  className="menu-item" style={itemAnimation7}>CONTACT US</animated.div>
              <animated.div onClick={()=>{navigate('/login')}}  className="menu-item" style={itemAnimation7}>LOGIN</animated.div></>
             )
                   }
    </>
              
             ):(null)}
            
        </div>
       
    </div>
  )
}

export default SideBar