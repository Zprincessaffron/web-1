import React, { useEffect, useState } from 'react'
import { Parallax } from 'react-scroll-parallax';
import { useUserContext } from '../context/MainContext'

import '../styles/KashmiriSaffron.css'
import kashmirback4 from '../images/kashmir_back4.jpg'
import cult from '../images/cult.jpg'
import saffronculinary from '../images/saffronculinary.jpg'
import saffronhim from '../images/saffranhim.jpg'
// import saffronserum from '../images/beautyback.jpg'
import saffronserum from '../images/beautyback1.jpeg'

import saffronchai from '../images/saffronchai.jpg'
import Navbar from '../navbar/NavBar';
import Footer from '../footer/Footer';
import SideBar from '../components/sidebar/SideBar';
import MenuSlider from '../components/sidebar/MenuSlider';

function KashmiriSaffron() {
  const { setShowNav,setSideBar,setMenuSlider }=useUserContext()
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
      // Function to check if the viewport width is less than or equal to 600px
      const checkViewportWidth = () => {
          if (window.matchMedia('(max-width: 600px)').matches) {
              setIsMobile(true); // Set state to true for mobile devices
          } else {
              setIsMobile(false); // Set state to false for larger screens
          }
      };

      // Initial check
      checkViewportWidth();

      // Add an event listener to detect window resize
      window.addEventListener('resize', checkViewportWidth);

      // Cleanup the event listener on component unmount
      return () => {
          window.removeEventListener('resize', checkViewportWidth);
      };
  }, []);


  useEffect(() => {
    setMenuSlider(false)
    setSideBar(false)
  }, [])
  return (
    <div className='ks_main'>
      <Navbar/>
      <SideBar/>
      <MenuSlider/>
     
     <div className='ks_div1' > 
       <div className='ks_div11'>
       <h1>KASHMIR SAFFRON</h1>
       <h2 className='ks_thegolden'>The Golden Essence of the Himalayas</h2>
        <p className='ks_secondp'>Nestled in the heart of the enchanting Kashmir Valley, Kashmiri saffron is a treasure of unparalleled beauty and potency. Known for its deep crimson threads, this "Red Gold" is celebrated worldwide for its rich flavor, vibrant color, and remarkable medicinal properties. Each thread of Kashmiri saffron is a testament to the fertile soils and pristine climate of the Himalayan region, where it is meticulously hand-harvested to ensure the highest quality.</p>
  
        
       </div>
         
      </div>
      <div className='ks_divsep'>
        <img src={kashmirback4} alt="" />
        <div className='ks_divsep2'
        ></div>
        <div className='ks_divsep1'>
        <Parallax speed={10} className="custom-class" y={[-40, 40]} tagOuter="figure">
        <div className='ks_div31' >
          <div>
          <h1 id='ks_cultandhar' className='ks_cultandhar'>Cultivation and Harvesting</h1>
        <p>The cultivation of Kashmiri saffron is an art passed down through generations. The saffron crocus blooms for a short period in the autumn, and each flower must be hand-picked at dawn to preserve its delicate stigmas. These stigmas are then carefully dried to produce the saffron threads that are prized for their potency and purity. The labor-intensive process and the limited geographical area where it can be grown contribute to its rarity and value.</p>
        
          </div>
          <img src={cult} alt="" />
           </div>
            </Parallax>
            <Parallax speed={10} className="custom-class" y={[-40, 40]} tagOuter="figure">

        <div style={{display:'flex',justifyContent:`${isMobile?"centre":"right"}`,flexDirection:`${isMobile?"column-reverse":"row-reverse"}`,alignItems:`${isMobile?"center":"end"}`}}  className='ks_div31' >
          <div>
          <h1>Beauty and Wellness</h1>
          <p>Beyond the kitchen, Kashmiri saffron is a revered component in luxurious beauty rituals. Its high antioxidant content makes it a powerful ally in skincare, capable of brightening and rejuvenating the skin. Used in face masks, creams, and serums, saffron helps to diminish dark spots, even out skin tone, and impart a radiant glow. The benefits of saffron in beauty treatments have been cherished since ancient times, with royal families using it to maintain their timeless allure.</p>
      
          </div>
          <img src={saffronserum} alt="" />

            </div>
        </Parallax>
            <Parallax speed={10} className="custom-class" y={[-40, 40]} tagOuter="figure">

        <div  className='ks_div31' >
          <div>
          <h1>Medicinal Marvel</h1>
          <p>Kashmiri saffron is not just a culinary and cosmetic wonder; it is also celebrated for its medicinal properties. Rich in antioxidants, vitamins, and minerals, saffron has been used in traditional medicine to boost overall health. It is known to improve digestion, support heart health, and enhance mood. Studies have shown that saffron may help alleviate symptoms of depression and anxiety, making it a natural remedy for mental well-being. Its anti-inflammatory and antibacterial properties further contribute to its status as a holistic health booster.</p>
       
          </div>
          <img src={saffronchai} alt="" />

          </div>
        </Parallax>
            <Parallax speed={10} className="custom-class" y={[-40, 40]} tagOuter="figure">

         <div  style={{display:'flex',justifyContent:`${isMobile?"centre":"right"}`,flexDirection:`${isMobile?"column-reverse":"row-reverse"}`,alignItems:`${isMobile?"center":"end"}`}}   className='ks_div31' >
           <div>
           <h1>A Culinary Gem</h1>
          <p>Kashmiri saffron’s high crocin content not only enhances dishes with its unique aroma but also imbues them with a brilliant golden hue. When added to biryanis, pilafs, and stews, it elevates these dishes to a new level of culinary excellence, providing a depth of flavor that is both robust and delicate. Desserts, too, are transformed by its presence, from the creamy richness of saffron-infused ice creams to the delicate sweetness of traditional Indian sweets like kheer and gulab jamun. The versatility of Kashmiri saffron in the kitchen makes it a beloved ingredient among chefs and home cooks alike.</p>

           </div>
           <img src={saffronculinary} alt="" />

           </div>

       </Parallax>
            <Parallax speed={10} className="custom-class" y={[-40, 40]} tagOuter="figure">

          <div  className='ks_div31' >
          <div>
          <h1>The Essence of Opulence</h1>
          <p>Kashmiri saffron epitomizes opulence and wellness. Whether enhancing the flavors of a gourmet dish, adding a golden touch to desserts, or revitalizing the skin, this golden essence from the Himalayas offers a touch of luxury and a myriad of benefits. It is more than just a spice; it is a symbol of tradition, quality, and the timeless beauty of nature.

Embrace the magic of Kashmiri saffron and let its rich heritage and exceptional qualities elevate your culinary, beauty, and wellness routines. Experience the golden essence of the Himalayas and discover why this exquisite spice is cherished around the world.
</p>
          </div>
          <img src={saffronhim} alt="" />

        </div>
      </Parallax>
        </div>

      </div>
      
     
      
     
     <Footer/>


      
    </div>
  )
}

export default KashmiriSaffron