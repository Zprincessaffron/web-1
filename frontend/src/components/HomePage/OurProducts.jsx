import React, { useState } from 'react'
import '../../styles/OurProducts.css'
import ourproductback from '../../images/ourproductsback.jpeg'
import ourproductback1 from '../../images/homepageback2.jpg'
import { FaArrowRightLong } from "react-icons/fa6";

import { useNavigate } from 'react-router-dom'
import Arrowbtn from '../button/Arrowbtn'
function OurProducts({ setFinalProduct,showFinalProduct }) {
  const navigate=useNavigate()
  const [mouse,setMouse]=useState(false)
  function handleMouse(){
      setMouse(true)
  }
  function handleLeave(){
      setMouse(false)
  }
  function handleClick(){
    setFinalProduct(true)
  }
  return (
    <div className='unveil_main' style={{backgroundImage:`url(${ourproductback})`}}>
      <div className='unveil_div1'>
        <h1>OUR PRODUCTS</h1>
        <div className='arrow_div'>
         <button onClick={handleClick} onMouseEnter={handleMouse} onMouseLeave={handleLeave}>DISCOVER NOW <FaArrowRightLong className={`arrow_txt ${mouse?"true":""}`} />
         </button>
    </div>        </div>
       </div>
  )
}

export default OurProducts