import React, { useEffect, useState } from 'react'

import '../../styles/CulinaryUse.css'
import culinaryback from "../../images/culinarymainnew.jpeg"
import Navbar from '../../navbar/NavBar';
import Footer from '../../footer/Footer'
import { culinaryUsesData } from './CulinaryData';
import SideBar from '../sidebar/SideBar';
import MenuSlider from '../sidebar/MenuSlider';
import { useUserContext } from '../../context/MainContext';
import ScrollToTop from '../ScrollToTop';
function CulinaryUse() { 
    const { setShowNav,setSideBar,setMenuSlider }=useUserContext()
    const [dish,setDish]=useState('biryani')
 
    function handleDish(val){
        setDish(val) 
    }

 
    useEffect(() => {
        setMenuSlider(false)
        setSideBar(false)
        setShowNav(true)
       
      }, [])

   
      


  return (
    <>
      <div>
        <ScrollToTop/>
  <Navbar/>
        <SideBar/>
        <MenuSlider/>
    <div className='culinarymain'>
      
        <div className='culinary_div1' style={{backgroundImage:`url(${culinaryback})`}}> 
            <div className='culinary_div11'>
                <h1>CULINARY USES</h1>
            </div>
        </div>
        <div>
        <div className={`culinary_div2 ${dish}`}>
        <div className='culinary_div21'>
                <h1 onClick={()=>handleDish('biryani')} className={`culinary_div21-h1 ${dish=='biryani'?"true":""}`}>BIRYANI</h1>
                <h1 onClick={()=>handleDish('pilafs')}  className={`culinary_div21-h1 ${dish=='pilafs'?"true":""}`}>PILAF</h1>
                <h1 onClick={()=>handleDish('stew')}  className={`culinary_div21-h1 ${dish=='stew'?"true":""}`}>STEWS</h1>
                <h1 onClick={()=>handleDish('icecream')}  className={`culinary_div21-h1 ${dish=='icecream'?"true":""}`}>ICECREAM</h1>
                <h1 onClick={()=>handleDish('gulab')}  className={`culinary_div21-h1 ${dish=='gulab'?"true":""}`}>GULAB JAMUN</h1>

            </div>
        </div>
        </div>
       
        {/* ////////////<- s plitting -> /////////////// */}
       {dish =="biryani" &&(
        <>
         <div className='culinary_div3'>
            <div className='culinary_div31'>
                <h1>{culinaryUsesData[0].title}</h1>
                <p>Saffron enhances Biryani with its rich flavor and vibrant color.</p>
            </div>
            <div className='culinary_div32'>
              
                <p> <span className='medicinal_highlighter'>flavor: </span>{culinaryUsesData[0].flavor}</p>
                <p> <span className='medicinal_highlighter'>Aroma: </span>{culinaryUsesData[0].aroma}</p>

                <p> <span className='medicinal_highlighter'>color: </span>{culinaryUsesData[0].color}</p>
            </div>

        </div>
        <div className='culinary_div4'>
            <h1>HOW TO USE SAFFRON IN BIRYANI</h1>
            <p> <span className='medicinal_highlighter'>Infusion: </span>{culinaryUsesData[0].Infusion}</p>
            <p> <span className='medicinal_highlighter'>Layering: </span>{culinaryUsesData[0].layering}</p>
            <p> <span className='medicinal_highlighter'>Quantity: </span>{culinaryUsesData[0].quantity}</p>
            </div>
        <div className='culinary_div5'>
            <h1>TIPS</h1>
            <p><span className='medicinal_highlighter'>Quality: </span>{culinaryUsesData[0].quality}</p>
            <h2>Avoid Overuse</h2>
            <p className='avoid_overcuse'>{culinaryUsesData[0].avoidovercuse}</p>
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
            <p> <span className='medicinal_highlighter'>flavor: </span>{culinaryUsesData[1].flavor}</p>
                <p> <span className='medicinal_highlighter'>Aroma: </span>{culinaryUsesData[1].aroma}</p>

                <p> <span className='medicinal_highlighter'>color: </span>{culinaryUsesData[1].color}</p>
            </div>

        </div>
        <div className={`culinary_div4 ${dish}`}>
        <h1>HOW TO USE SAFFRON IN Pilaf</h1>
        <p> <span className='medicinal_highlighter'>Infusion: </span>{culinaryUsesData[1].Infusion}</p>
            <p> <span className='medicinal_highlighter'>Incorporation: </span>{culinaryUsesData[1].Incorporation}</p>
            <p> <span className='medicinal_highlighter'>Quantity: </span>{culinaryUsesData[1].quantity}</p>
            </div>
            <div className={`culinary_div5 ${dish}`}>
            <h1>TIPS</h1>
            <p><span className='medicinal_highlighter'>Quality: </span>{culinaryUsesData[1].quality}</p>

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
            <p> <span className='medicinal_highlighter'>Flavor: </span>{culinaryUsesData[2].flavor}</p>
                <p> <span className='medicinal_highlighter'>Aroma: </span>{culinaryUsesData[2].aroma}</p>

                <p> <span className='medicinal_highlighter'>Color: </span>{culinaryUsesData[2].color}</p>
               
            </div>

        </div>
        <div className={`culinary_div4 ${dish}`}>
        <h1>HOW TO USE SAFFRON IN stew</h1>
        <p> <span className='medicinal_highlighter'>Infusion: </span>{culinaryUsesData[2].Infusion}</p>
            <p> <span className='medicinal_highlighter'>Incorporation: </span>{culinaryUsesData[2].Incorporation}</p>
            <p> <span className='medicinal_highlighter'>Quantity: </span>{culinaryUsesData[2].quantity}</p>
            </div>
            <div className={`culinary_div5 ${dish}`}>
            <h1>TIPS</h1>
            <p><span className='medicinal_highlighter'>Quality: </span>{culinaryUsesData[2].quality}</p>

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
            <p> <span className='medicinal_highlighter'>flavor: </span>{culinaryUsesData[3].flavor}</p>
                <p> <span className='medicinal_highlighter'>Aroma: </span>{culinaryUsesData[3].aroma}</p>

                <p> <span className='medicinal_highlighter'>color: </span>{culinaryUsesData[3].color}</p>
            </div>

        </div>
        <div className={`culinary_div4 ${dish}`}>
        <h1>HOW TO USE SAFFRON IN ICecream</h1>
        <p> <span className='medicinal_highlighter'>Incorporation: </span>{culinaryUsesData[3].Incorporation}</p>
            <p> <span className='medicinal_highlighter'>Layering: </span>{culinaryUsesData[3].layering}</p>
            <p> <span className='medicinal_highlighter'>Quantity: </span>{culinaryUsesData[3].quantity}</p>
            </div>
            <div className={`culinary_div5 ${dish}`}>
            <h1>TIPS</h1>
            <p><span className='medicinal_highlighter'>Quality: </span>{culinaryUsesData[3].quality}</p>
            <p><span className='medicinal_highlighter'>balance: </span>{culinaryUsesData[3].balance}</p>
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
            <p> <span className='medicinal_highlighter'>flavor: </span>{culinaryUsesData[4].flavor}</p>
                <p> <span className='medicinal_highlighter'>Aroma: </span>{culinaryUsesData[4].aroma}</p>

                <p> <span className='medicinal_highlighter'>color: </span>{culinaryUsesData[4].color}</p>
            </div>

        </div>
        <div className={`culinary_div4 ${dish}`}>
        <h1>HOW TO USE SAFFRON IN gulab jamun</h1>
        <p> <span className='medicinal_highlighter'>Infusion: </span>{culinaryUsesData[4].Infusion}</p>
            <p> <span className='medicinal_highlighter'>Incorporation: </span>{culinaryUsesData[4].Incorporation}</p>
            <p> <span className='medicinal_highlighter'>Quantity: </span>{culinaryUsesData[4].quantity}</p>
            </div>
            <div className={`culinary_div5 ${dish}`}>
            <h1>TIPS</h1>
            <p><span className='medicinal_highlighter'>Quality: </span>{culinaryUsesData[4].quality}</p>

            <h2>Avoid Overuse</h2>
            <p>{culinaryUsesData[4].avoidovercuse}</p>
            </div>
        </>
       )}

       
    </div>
  
    </div>
    <Footer/>

           </>
  )
}

export default CulinaryUse