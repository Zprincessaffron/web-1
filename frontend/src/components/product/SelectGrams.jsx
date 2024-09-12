import React from 'react'
import '../../styles/SelectGrams.css'
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function SelectGrams({ grams,showGram,setShowGram,product }) {
    const navigate= useNavigate()
    const handleProductClick = (product,id) => {
        navigate(`/product/${id}`, { state: { product } });
      };
  return (
    <div className={`selectgram_main ${showGram?"true":""}`}>
         <div className='ckeck_avail_1'> <p onClick={()=>{setShowGram(false)}}><IoMdClose/></p> </div>
        <div className='pd_div1'>
            <h1>Grams</h1>
        </div>
        <div className='grams_div2'>
             
            <div>
                <div className='grams_div21' onClick={() => handleProductClick(product,"66d2e6ed20b726ac685d264c")}>

                </div>
                <h3>2Grams</h3>
            </div>
            <div>
                <div className='grams_div21'>

                </div>
                <h3>5Grams</h3>
            </div>
                
        </div>
        
    </div>
  )
} 

export default SelectGrams