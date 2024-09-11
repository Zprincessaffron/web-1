import React from 'react'
import '../../styles/OurProducts.css'
import ourproductback from '../../images/ourproductsback.jpeg'
import ourproductback1 from '../../images/homepageback2.jpg'

import { useNavigate } from 'react-router-dom'
import Arrowbtn from '../button/Arrowbtn'
function OurProducts() {
  const navigate=useNavigate()
  return (
    <div className='unveil_main' style={{backgroundImage:`url(${ourproductback})`}}>
      <div className='unveil_div1'>
        <h1>OUR PRODUCTS</h1>
        <Arrowbtn linkFromMain='/productpage' onMouseEnter={()=>{setIsMouse(false)}} onMouseLeave={()=>{setIsMouse(true)}} name="DISCOVER NOW"/>
        </div>
       </div>
  )
}

export default OurProducts