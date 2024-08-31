import React, { useState } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { GrFormCheckmark } from "react-icons/gr";


import "../../styles/CardProduct.css"
function CardProduct() {
    const [select,setSelect]=useState('kashmir')
    const [kashmirCart,setKashmirCart]=useState(true)
    const[ KashmirItemCount,setKashmirItemCount]=useState(1)
    
    const [spainCart,setSpainCart]=useState(true)
    const[ spainItemCount,setSpainItemCount]=useState(1)

    function handleClick(val){
        setSelect(val)

    }
    function handleSpainTick(){
        setSpainCart(true)
    }
    function handleSpainTickStart(){
        if(select=='spain'){

            setSpainCart(false)
        }
    }

    function handleKashmirTick(){
        
        setKashmirCart(true)
    }
    function handleKashmirTickStart(){
        if(select=='kashmir'){

            setKashmirCart(false)
        }

    }
    

    function handleInceDec(val){
        if(val =='inc'){
            setSpainItemCount(spainItemCount+1)
        }    
        if(val =='dec'){
            if(spainItemCount>1){
                setSpainItemCount(spainItemCount-1)
            }
        }  
        if(val =='dec'){
            if(spainItemCount==1){
                setKashmirCart(true)
                setSpainCart(true)
            }
        }       
    }
  return (

    <div className='cp_main'>
        <div className='cp_div1'>
            <div>
                <h1>Z PRINCESSAFFRON</h1>
            </div>
            
        </div>
        <div className='cp_div2'>
            <div className='cp_div21'>
                <h1>EXPERIENCE OUR SAFFRON</h1>
            </div>
            <div className='cp_div22'>
            <div className='cp_div22_3'>
                    <h1>Description</h1>
                    {select=='kashmir'&&(
                          <p>High-quality saffron threads handpicked from the finest flowers. Premium Quality, Exquisite Flavor: Discover the luxury
                          of Indian Kashmiri Saffron, renowned for its vibrant color, delicate aroma, and unparalleled flavor.</p>
                        
                    )}
                     {select=='spain'&&(
                         <p>Unmatched quality with vibrant color and rich flavor from the heart of Spain. Discover the exquisite flavor and vibrant color
                         our Premium Spanish Saffron. Sourced from the sun-drenched fields of Spain, this high-quality saffron is known for its intense aroma, rich flavor,
                         and deep red hue. Each strand is carefully hand-harvested to ensure the highest standards
                         of quality and authenticity.</p> 
                    )}
                    <div className='cp_div22_31'>
                        <button>5gm</button>
                        <button>2gm</button>

                    </div>
                
                </div>
            <div className={`cp_div22_1 ${select}`}>
            <img src="" alt="" />
                    <div className='cp_div22_11'>
                        <div className='cp_div22_11_1'><h1>KASHMIR SAFFRON</h1></div>
                        <div className='cp_div22_11_2'>
                        {kashmirCart?(<button onClick={handleKashmirTickStart}>ADD TO CART</button>):(
                                    <div className='cp_cart_hover'>
                                        <div><button onClick={()=>handleInceDec('dec')}>-</button> <p>{spainItemCount}</p> <button  onClick={()=>handleInceDec('inc')}>+</button></div> <button onClick={handleKashmirTick}><GrFormCheckmark/></button>
                                    </div>
                                )
                            }
                        
                         <button>BUY</button></div>
                    </div>

                </div>
                <div className={`cp_div22_2 ${select}`}>
                <img src="" alt="" />
                    <div className='cp_div22_11'>
                        <div className='cp_div22_11_1'><h1>SPAIN SAFFRON</h1></div>
                        <div className='cp_div22_11_2'>
                            {spainCart?(<button onClick={handleSpainTickStart}>ADD TO CART</button>):(
                                    <div className='cp_cart_hover'>
                                        <div><button onClick={()=>handleInceDec('dec')}>-</button> <p>{spainItemCount}</p> <button  onClick={()=>handleInceDec('inc')}>+</button></div> <button onClick={handleSpainTick}><GrFormCheckmark/></button>
                                    </div>
                                )
                            }
                             <button>BUY</button></div>
                    </div>
                </div>
               

            </div>
            <div className='cp_div23'>

            </div>
            <div className='cp_div3'>
            <div className='cp_div31'>
                <div className='cp_div31_1'>
                    <div className={`cp_div31_11 ${select}`}>

                    </div>

                </div>
            </div>
            <div className='cp_div32'>
                <button onClick={()=>handleClick('kashmir')}><FaArrowLeft/></button>
                <button onClick={()=>handleClick('spain')}><FaArrowRight/></button>

            </div>

        </div>
            
        </div>
        

        
    </div>
  )
}
export default CardProduct