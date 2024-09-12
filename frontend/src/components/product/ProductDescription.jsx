import React from 'react'
import '../../styles/ProductDescription.css'
import { IoMdClose } from "react-icons/io";

function ProductDescription({ state,setSate,description,content }) {
  return (
    <div className={`productd_main ${state?"true":""}`}>
        <div className='ckeck_avail_1'> <p onClick={()=>{setSate(false)}}><IoMdClose/></p> </div>
        <div className='pd_div1'>
            <h1>Product Details</h1>
        </div>
        <div className='pd_div2'>
            <h3>{description}</h3>
            <h4>{content}</h4>


        </div>


    </div>
  )
}

export default ProductDescription