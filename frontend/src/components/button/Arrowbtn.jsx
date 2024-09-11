import React, { useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

import './Arrowbtn.css'
function Arrowbtn( {linkFromMain,name} ) {
  const navigate = useNavigate();
    const [mouse,setMouse]=useState(false)
    function handleMouse(){
        setMouse(true)
    }
    function handleLeave(){
        setMouse(false)
    }
    function handleClick(){
      navigate(`${linkFromMain}`)

    }
  return (
    <div className='arrow_div'>
         <button onClick={handleClick} onMouseEnter={handleMouse} onMouseLeave={handleLeave}>{name} <FaArrowRightLong className={`arrow_txt ${mouse?"true":""}`} />
         </button>
    </div>
  )
}

export default Arrowbtn