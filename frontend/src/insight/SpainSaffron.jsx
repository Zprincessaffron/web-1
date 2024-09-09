import React, { useEffect,useState } from 'react'
import { Parallax } from 'react-scroll-parallax';
import '../styles/KashmiriSaffron.css'
import kashmirback4 from '../images/kashmir_back4.jpg'
import cult from '../images/cult.jpg'
import { useUserContext } from '../context/MainContext'
 
import saffronculinary from '../images/saffronculinary.jpg'
import saffronhim from '../images/saffranhim.jpg'
import saffronserum from '../images/beautyback.jpg'
import saffronchai from '../images/saffronchai.jpg'
import Navbar from '../navbar/NavBar';
import Footer from '../footer/Footer';
import spainquality from '../images/crocuspurity.jpeg'
import spaintraditional from '../images/saffronspainculture.jpg'
import beautyspain from '../images/saffronfacemix.jpeg'
import KesariRasmalai from '../images/KesariRasmalai.jpg'
import spainharvesting from '../images/saffronfield2.jpg'
import SideBar from '../components/sidebar/SideBar';
import MenuSlider from '../components/sidebar/MenuSlider';

function SpainSaffron() {
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
       <h1>SPAIN SAFFRON</h1>
       <h2 className='ks_thegolden'>The Crown Jewel of La Mancha</h2>
        <p className='ks_secondp'>Cultivated in the historic region of La Mancha, Spanish saffron is synonymous with authenticity and excellence. This variety, often referred to as "the best in the world," is celebrated for its distinctive floral notes, striking golden hue, and unmatched quality. Spanish saffron has a rich history that intertwines with the cultural heritage of La Mancha, a region renowned for its agricultural prowess and dedication to producing the finest saffron.</p>
  
        
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
          <h1 id='ks_cultandhar' className='ks_cultandhar'>A Culinary Masterpiece</h1>
<p>Spanish saffron is an indispensable ingredient in some of the world’s most iconic dishes. Its unique blend of sweetness and earthiness makes it the perfect complement to traditional Spanish paella, adding depth of flavor and a vibrant golden color that is unmistakable. In Italian cuisine, saffron is a key component of creamy risottos, where its subtle floral notes elevate the dish to new culinary heights. Beyond these classics, Spanish saffron can enhance a wide range of recipes, from savory stews and soups to delicate pastries and desserts, making it a versatile addition to any kitchen.</p>        
          </div>
          <img src={KesariRasmalai} alt="" />
           </div>
            </Parallax>
            <Parallax speed={10} className="custom-class" y={[-40, 40]} tagOuter="figure">

        <div  style={{display:'flex',justifyContent:`${isMobile?"centre":"right"}`,flexDirection:`${isMobile?"column-reverse":"row-reverse"}`,alignItems:`${isMobile?"center":"end"}`}}  className='ks_div31' >
          <div>
          <h1>Beauty and Skincare Marvel</h1>
          <p>The benefits of Spanish saffron extend far beyond the culinary world. In the realm of cosmetics, Spanish saffron is highly prized for its high content of antioxidants, which help protect the skin from environmental damage and the signs of aging. When incorporated into skincare products, saffron can improve skin texture, reduce the appearance of fine lines and wrinkles, and impart a radiant glow. Its anti-inflammatory and antibacterial properties also make it effective in treating acne and other skin conditions, ensuring that your skin remains healthy and luminous.</p>
      
          </div>
          <img src={beautyspain} alt="" />

            </div>
        </Parallax>
            <Parallax speed={10} className="custom-class" y={[-40, 40]} tagOuter="figure">

        <div  className='ks_div31' >
          <div>
          <h1>Meticulous Harvesting Process</h1>
          <p>What sets Spanish saffron apart is the meticulous hand-harvesting process that has been perfected over centuries. Each saffron crocus blooms for a short period in the autumn, and the delicate stigmas must be harvested by hand at dawn to ensure their potency and freshness. This labor-intensive process involves carefully plucking the crimson threads from each flower, then drying them to preserve their flavor and color. The dedication and craftsmanship involved in this process make every strand of Spanish saffron a true testament to the skill and tradition of La Mancha’s farmers.</p>
       
          </div>
          <img src={spainharvesting} alt="" />

          </div>
        </Parallax>
            <Parallax speed={10} className="custom-class" y={[-40, 40]} tagOuter="figure">

         <div  style={{display:'flex',justifyContent:`${isMobile?"centre":"right"}`,flexDirection:`${isMobile?"column-reverse":"row-reverse"}`,alignItems:`${isMobile?"center":"end"}`}}   className='ks_div31' >
           <div>
           <h1>The Essence of Tradition and Quality</h1>
           <p>La Mancha’s saffron is more than just a spice; it is a symbol of tradition, quality, and Spanish craftsmanship. The region’s unique climate and soil conditions provide the perfect environment for cultivating saffron, resulting in a product that is unparalleled in flavor, aroma, and color. Each thread of Spanish saffron embodies the rich cultural heritage of La Mancha, making it a valuable addition to both culinary and cosmetic applications.</p>

           </div>
           <img src={spaintraditional} alt="" />

           </div>

       </Parallax>
       <Parallax speed={10} className="custom-class" y={[-40, 40]} tagOuter="figure">

<div  className='ks_div31' >
  <div>
  <h1>A Touch of Luxury</h1>
  <p>Incorporating Spanish saffron into your cooking or skincare routine adds a touch of luxury and sophistication. Its complex flavor profile enhances a wide variety of dishes, while its potent antioxidant properties benefit the skin in numerous ways. Whether you are a gourmet chef looking to elevate your culinary creations or a skincare enthusiast seeking natural and effective beauty solutions, Spanish saffron offers a world of possibilities.</p>

  </div>
  <img src={spainquality} alt="" />

  </div>
</Parallax>
        </div>

      </div>
      
     
      
     
     <Footer/>


      
    </div>
  )
}

export default SpainSaffron