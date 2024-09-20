import React from 'react'
import '../../styles/CheckAvailability.css'
import { IoMdClose } from "react-icons/io";

function Availability({ stock,state,setState,name,price,stockk }) {
  return (
    <div className={`check_availability_main ${state?"true":""}`}>
        <div className='ckeck_avail_1'> <p onClick={()=>{setState(false)}}><IoMdClose/></p> </div>
        <div className='ckeck_avail_2'>
            <div className='ckeck_avail_21'>

            </div>
            <div className='ckeck_avail_22'>
                <h1>{name}</h1>
                <h2>₹ {price}</h2>
                <h3>IN STOCK: {stockk}</h3>
                

            </div>

        </div> 
    </div>
  )
}

export default Availability