import React, { useEffect, useState } from 'react'

import '../../styles/CulinaryUse.css'
import culinaryback from "../../images/culinaryback1.jpg"
import Navbar from '../../navbar/NavBar';
import Footer from '../../footer/Footer'
import { culinaryUsesData } from './CulinaryData';
import SideBar from '../sidebar/SideBar';
import MenuSlider from '../sidebar/MenuSlider';
import { useUserContext } from '../../context/MainContext';

function CulinaryUse() { 
    const { setShowNav,setSideBar,setMenuSlider }=useUserContext()

    const [dish,setDish]=useState('biryani')
    function handleDish(val){
        setDish(val)
    }

    useEffect(() => {
        setMenuSlider(false)
        setSideBar(false)
      }, [])
  return (
    <div className='culinarymain'>
        <Navbar/>
        <SideBar/>
        <MenuSlider/>
        <div className='culinary_div1' style={{backgroundImage:`url(${culinaryback})`}}> 
            <div className='culinary_div11'>
                <h1>CULINARY USES</h1>
            </div>
        </div>
        <div className={`culinary_div2 ${dish}`}>
        <div className='culinary_div21'>
                <h1 onClick={()=>handleDish('biryani')} className={`culinary_div21-h1 ${dish=='biryani'?"true":""}`}>BIRYANI</h1>
                <h1 onClick={()=>handleDish('pilafs')}  className={`culinary_div21-h1 ${dish=='pilafs'?"true":""}`}>PILAFS</h1>
                <h1 onClick={()=>handleDish('stew')}  className={`culinary_div21-h1 ${dish=='stew'?"true":""}`}>STEW</h1>
                <h1 onClick={()=>handleDish('icecream')}  className={`culinary_div21-h1 ${dish=='icecream'?"true":""}`}>ICECREAM</h1>
                <h1 onClick={()=>handleDish('gulab')}  className={`culinary_div21-h1 ${dish=='gulab'?"true":""}`}>GULAB JAMUN</h1>

            </div>
        </div>
        {/* ////////////<- splitting -> /////////////// */}
       {dish =="biryani" &&(
        <>
         <div className='culinary_div3'>
            <div className='culinary_div31'>
                <h1>{culinaryUsesData[0].title}</h1>
                <p>Saffron enhances Biryani with its rich flavor and vibrant color.</p>
            </div>
            <div className='culinary_div32'>
                <h2>flavor</h2>
                <p>{culinaryUsesData[0].flavor}</p>
                <h2>AROMA</h2>
                <p>{culinaryUsesData[0].aroma}</p>

                <h2>color</h2>
                <p>{culinaryUsesData[0].color}</p>
            </div>

        </div>
        <div className='culinary_div4'>
            <h1>HOW TO USE SAFFRON IN BIRYANI</h1>
            <h2>INFUSION</h2>
            <p>{culinaryUsesData[0].Infusion}</p>
            <h2>LAYERING</h2>
            <p>{culinaryUsesData[0].layering}</p>
            <h2>QUANTITY</h2>
            <p>{culinaryUsesData[0].quantity}</p>
            </div>
        <div className='culinary_div5'>
            <h1>TIPS</h1>
            <h2>QUALITY</h2>
            <p>{culinaryUsesData[0].quality}</p>
            <h2>Avoid Overuse</h2>
            <p>{culinaryUsesData[0].avoidovercuse}</p>
            </div>
        </>
       )}

{dish =="pilafs" &&(
        <>
         <div className={`culinary_div3 ${dish}`}>
            <div className='culinary_div31'>
                <h1>{culinaryUsesData[1].title}</h1>
                <p>Saffron plays a significant role in pilafs, adding both flavor and visual appeal.</p>
            </div>
            <div className='culinary_div32'>
                <h2>flavor</h2>
                <p>{culinaryUsesData[1].flavor}</p>
                <h2>AROMA</h2>
                <p>{culinaryUsesData[1].aroma}</p>

                <h2>color</h2>
                <p>{culinaryUsesData[1].color}</p>
            </div>

        </div>
        <div className={`culinary_div4 ${dish}`}>
        <h1>HOW TO USE SAFFRON IN Pilaf</h1>
            <h2>INFUSION</h2>
            <p>{culinaryUsesData[1].Infusion}</p>
            <h2>Incorporation</h2>
            <p>{culinaryUsesData[1].Incorporation}</p>
            <h2>QUANTITY</h2>
            <p>{culinaryUsesData[1].quantity}</p>
            </div>
            <div className={`culinary_div5 ${dish}`}>
            <h1>TIPS</h1>
            <h2>QUALITY</h2>
            <p>{culinaryUsesData[1].quality}</p>
            <h2>Avoid Overuse</h2>
            <p>{culinaryUsesData[1].avoidovercuse}</p>
            </div>
        </>
       )}

{dish =="stew" &&(
        <>
         <div className={`culinary_div3 ${dish}`}>
         <div className='culinary_div31'>
                <h1>{culinaryUsesData[2].title}</h1>
                <p>Saffron can add a unique depth to stews, enhancing both flavor and color.</p>
            </div>
            <div className='culinary_div32'>
                <h2>flavor</h2>
                <p>{culinaryUsesData[2].flavor}</p>
                <h2>AROMA</h2>
                <p>{culinaryUsesData[2].aroma}</p>

                <h2>color</h2>
                <p>{culinaryUsesData[2].color}</p>
            </div>

        </div>
        <div className={`culinary_div4 ${dish}`}>
        <h1>HOW TO USE SAFFRON IN stew</h1>
            <h2>INFUSION</h2>
            <p>{culinaryUsesData[2].Infusion}</p>
            <h2>Incorporation</h2>
            <p>{culinaryUsesData[2].Incorporation}</p>
            <h2>QUANTITY</h2>
            <p>{culinaryUsesData[2].quantity}</p>
            </div>
            <div className={`culinary_div5 ${dish}`}>
            <h1>TIPS</h1>
            <h2>QUALITY</h2>
            <p>{culinaryUsesData[2].quality}</p>
            <h2>Avoid Overuse</h2>
            <p>{culinaryUsesData[2].avoidovercuse}</p>
            </div>
        </>
       )}

{dish =="icecream" &&(
        <>
         <div className={`culinary_div3 ${dish}`}>
         <div className='culinary_div31'>
                <h1>{culinaryUsesData[3].title}</h1>
                <p>Saffron-infused ice cream is a luxurious treat that benefits from saffron in several ways.</p>
            </div>
            <div className='culinary_div32'>
                <h2>flavor</h2>
                <p>{culinaryUsesData[3].flavor}</p>
                <h2>AROMA</h2>
                <p>{culinaryUsesData[3].aroma}</p>

                <h2>color</h2>
                <p>{culinaryUsesData[3].color}</p>
            </div>

        </div>
        <div className={`culinary_div4 ${dish}`}>
        <h1>HOW TO USE SAFFRON IN ICecream</h1>
            <h2>Incorporation</h2>
            <p>{culinaryUsesData[3].Incorporation}</p>
            <h2>LAYERING</h2>
            <p>{culinaryUsesData[3].layering}</p>
            <h2>QUANTITY</h2>
            <p>{culinaryUsesData[3].quantity}</p>
            </div>
            <div className={`culinary_div5 ${dish}`}>
            <h1>TIPS</h1>
            <h2>QUALITY</h2>
            <p>{culinaryUsesData[3].quality}</p>
            <h2>balance</h2>
            <p>{culinaryUsesData[3].balance}</p>
            </div>
        </>
       )}

{dish =="gulab" &&(
        <>
         <div className={`culinary_div3 ${dish}`}>
         <div className='culinary_div31'>
                <h1>{culinaryUsesData[4].title}</h1>
                <p>Saffron plays a special role in gulab jamun, a popular Indian sweet made from milk solids and sugar. </p>
            </div>
            <div className='culinary_div32'>
                <h2>flavor</h2>
                <p>{culinaryUsesData[4].flavor}</p>
                <h2>AROMA</h2>
                <p>{culinaryUsesData[4].aroma}</p>

                <h2>color</h2>
                <p>{culinaryUsesData[4].color}</p>
            </div>

        </div>
        <div className={`culinary_div4 ${dish}`}>
        <h1>HOW TO USE SAFFRON IN gulab jamun</h1>
            <h2>INFUSION</h2>
            <p>{culinaryUsesData[4].Infusion}</p>
            <h2>Incorporation</h2>
            <p>{culinaryUsesData[4].Incorporation}</p>
            <h2>QUANTITY</h2>
            <p>{culinaryUsesData[4].quantity}</p>
            </div>
            <div className={`culinary_div5 ${dish}`}>
            <h1>TIPS</h1>
            <h2>QUALITY</h2>
            <p>{culinaryUsesData[4].quality}</p>
            <h2>Avoid Overuse</h2>
            <p>{culinaryUsesData[4].avoidovercuse}</p>
            </div>
        </>
       )}
       <Footer/>
    </div>
  )
}

export default CulinaryUse