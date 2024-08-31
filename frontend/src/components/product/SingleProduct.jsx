import React, { useEffect, useState } from 'react'
import '../../styles/SingleProduct.css'
import StarProduct from './StarProduct'
import { FaChevronRight } from "react-icons/fa";
import { useUserContext } from '../../context/MainContext';
import Navbar from '../../navbar/NavBar';
import SideBar from '../sidebar/SideBar';
import MenuSlider from '../sidebar/MenuSlider';

function SingleProduct() {
    const { singleProduct,setSingleProduct,setShowNav,setSideBar,setMenuSlider }=useUserContext()
    useEffect(() => {
        setMenuSlider(false)
        setSideBar(false)
      }, [])
  return (
    <>
    <Navbar/>
    <SideBar/>
    <MenuSlider/>
    {singleProduct?(
         <div className={`sp_main ${singleProduct?"true":'false'}`}>
        <div className='sp_div1'>
            <button className={`st ${singleProduct?'true':'false'}`} onClick={()=>{setSingleProduct(true)}}>KASHMIRI SAFFRON</button>
            <button className={`nd ${singleProduct?'true':'false'}`}  onClick={()=>{setSingleProduct(false)}}>SPAIN SAFFRON</button>

        </div>
        <div className='sp_div2'>
            <div className='sp_div2_1'>
                <h1>KASHMIRI SAFFRON</h1>
                <p>High-quality saffron threads handpicked from the finest flowers.
             
              <br/> Origin: Kashmir, India<br/>
      Type: Saffron Threads (Grade 1)<br/>
      Flavor Profile: Sweet, floral, with a subtle earthy undertone<br/>
      Color: Deep red with orange-yellow hues<br/>
      Aroma: Rich, aromatic, and heady <br/>
      Purity: 100% pure, with no additives or artificial color <br/>
                
                
                </p>
                <p></p>
                <div className='sp_star'>
                    <StarProduct/>
                </div>
                <div className='sp_selectgram'>
                    <button>5Gm</button>
                    <button>2Gm</button>

                </div>
            </div>
            <div className='sp_div2_2'>
                <div className='sp_div2_21'>
                    <button>-</button> 1 <button>+</button>

                </div>
                <div className='sp_div2_22' onClick={()=>{setSingleProduct(!singleProduct)}} >
                    <h1 ><FaChevronRight/></h1>

                </div>

            </div>

        </div>
        <div className='sp_div3'>
            <button>ADD TO CART</button>
            <h1>Rs.1500</h1>
            <button>BUY NOW</button>

        </div>

    </div>
    ):(
        <div className={`sp_main ${singleProduct?"true":'false'}`}>
       <div className='sp_div1'>
            <button className={`st ${singleProduct?'true':'false'}`} onClick={()=>{setSingleProduct(true)}}>KASHMIRI SAFFRON</button>
            <button className={`nd ${singleProduct?'true':'false'}`}  onClick={()=>{setSingleProduct(false)}}>SPAIN SAFFRON</button>

        </div>
        <div className='sp_div2'>
            <div className='sp_div2_1'>
                <h1>SPAIN SAFFRON</h1>
              <p>Unmatched quality with vibrant color and rich flavor from the heart of Spain.
             
                <br/>Origin: Spain<br/>
    Type: Spanish Saffron, Grade A+ (highest quality)<br/>
    Flavor Profile: Sweet and floral with a hint of earthy richness<br/>
    Color: Deep crimson red, indicative of purity and potency<br/>
    Aroma: Intense and floral with subtle earthy undertones <br/>
    Purity: 100% pure saffron with no additives or fillers <br/>
                
                
                </p>
                <p></p>
                <div className='sp_star'>
                    <StarProduct/>
                </div>
                <div className='sp_selectgram'>
                    <button>5Gm</button>
                    <button>2Gm</button>

                </div>
            </div>
            <div className='sp_div2_2'>
                <div className='sp_div2_21'>
                    <button>-</button> 1 <button>+</button>

                </div>
                <div  className='sp_div2_22' onClick={()=>{setSingleProduct(!singleProduct)}} >
                    <h1 ><FaChevronRight/></h1>

                </div>

            </div>

        </div>
        <div className='sp_div3'>
            <button>ADD TO CART</button>
            <h1>Rs.1500</h1>
            <button>BUY NOW</button>

        </div>

    </div>
    
    )}</>
  )
}

export default SingleProduct