import React from 'react'
import '../../styles/MenuSlider.css'
import { useUserContext } from '../../context/MainContext' 
import { useNavigate } from 'react-router-dom'
// import culinaryslide from '../../images/culinaryuses.jpeg'
import medicinalslider from '../../images/medicinalsidebar.jpeg'
import pregnancyslider from '../../images/pregnancyslider.jpg'
import beautyslider from '../../images/beautysliderold.jpg'
// import culinaryslide from '../../images/culinaryuses3.jpg'
// import culinaryslide from '../../images/foodslider3.jpg'
import culinaryslide from '../../images/saffronpick1.jpg'

 

 
function MenuSlider() {
  const navigate = useNavigate()
  const { goldenElixir,setGoldenElixir,setSideBar,menuSlider,setMenuSlider }=useUserContext()
  function handleNavigate(val){
    navigate(`${val}`)
    setMenuSlider(false)
    setSideBar(false)
  }
  return (
    <div className={`ms_main ${menuSlider? "true":"false"}`}>
       {goldenElixir == 'culinary' &&
       (<div style={{backgroundImage:`url(${culinaryslide})`}} className={`ms_div ${goldenElixir}`}> 
         <h1  style={{fontSize:"3rem"}}>CULINARY USES</h1>
         <button onClick={()=>handleNavigate('/culinary-use')}>DISCOVER</button>
       </div>)
        }
         {goldenElixir == 'medicine' &&
       ( <div style={{backgroundImage:`url(${medicinalslider})`}} className={`ms_div ${goldenElixir}`}>
       <h1  style={{fontSize:"3rem"}}>MEDICINAL USES</h1>
        <button onClick={()=>handleNavigate('/medicine-use')} >DISCOVER</button>
        </div> )
        }
         {goldenElixir == 'beauty' &&
       (<div style={{backgroundImage:`url(${beautyslider})`}} className={`ms_div ${goldenElixir}`}>
         <h1 style={{fontSize:"3rem"}}>BEAUTY USES</h1>
        <button onClick={()=>handleNavigate('/beauty-use')} >DISCOVER</button>
        </div> )
        }
         {goldenElixir == 'pregnancy' &&
       (<div style={{backgroundImage:`url(${pregnancyslider})`}} className={`ms_div ${goldenElixir}`}>
        <h1  style={{fontSize:"3rem"}}>PREGNANT WOMAN</h1>
        <button onClick={()=>handleNavigate('/pregnancy-use')} >DISCOVER</button>
        </div> )
        }
        
    </div>
  )
}

export default MenuSlider