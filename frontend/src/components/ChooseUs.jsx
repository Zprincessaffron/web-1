import React, { useEffect } from 'react'
import v4 from '../images/v4.mp4'
import '../styles/ChooseUs.css'
import Navbar from '../navbar/NavBar'
import purity from '../images/pickingclose.jpg'
import source from '../images/saffronfulfield.jpg'
import cur from '../images/saffronjasmin.webp'
import skincare from '../images/selffacecare.jpg'
import tea from '../images/saffronteaev.jpg'
import crocusback from '../images/crocusback.jpg'

import whychooseback from '../images/whychooseback.mp4'
import Footer from '../footer/Footer'
import SideBar from './sidebar/SideBar'
import { useUserContext } from '../context/MainContext'
import MenuSlider from './sidebar/MenuSlider'

 

function ChooseUs() {
  const { setShowNav,setMenuSlider,setSideBar } =useUserContext()
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    setMenuSlider(false)
    setSideBar(false)
  }, [])
  return (
    <div className='wc_main'>
      <Navbar/>
      <SideBar/>
      <MenuSlider/>
      <div className='wc_div1'>
        <div className='wc_div11'>
          <video autoPlay muted loop  src={v4}></video>
        </div>
        <div className='wc_div12'>
          <h1>OUR SAFFRON</h1>
          <p>At Z Princess Saffron, we pride ourselves on offering the highest quality saffron sourced from the renowned regions of Kashmir, Iran, and Spain. Each thread is carefully hand-picked and rigorously tested to ensure unmatched purity and potency.</p>

        </div>
      </div>
      <div className='wc_div2'> 
        <div className='wc_div21'>
        <h1>Unmatched Quality and Purity</h1>
        <p>Our saffron is celebrated for its vibrant color, rich flavor, and notable health benefits. The threads' deep crimson hue and potent aroma make it an exceptional ingredient, whether you're enhancing a dish, indulging in beauty routines, or seeking wellness benefits.</p>
   
        </div>
        <div className='wc_div22'>
          <img src={purity} alt="" />

        </div>
          </div>
      <div className='wc_div3'>
        <div className='wc_div21'>
        <h1>Ethical and Sustainable Sourcing</h1>
        <p>We are committed to ethical and sustainable practices. By working directly with local farmers in Kashmir, Iran, and Spain, we ensure fair compensation and support traditional farming methods. Our eco-friendly practices help preserve the environment while maintaining the saffron's exceptional quality.</p>
 
        </div>
        <div className='wc_div22'>
        <img src={source} alt="" />

        </div>
            </div>
      <div className='wc_div4'>
          <h1>Versatile Uses</h1>

      
        <div className='wc_div41'>
            <div>
              <img src={cur} alt="" />
              <h1>
              Culinary Delights
              </h1>
              <p>Our saffron adds a unique depth of flavor and a brilliant golden color to a variety of dishes, from savory meals to sweet treats.

              </p>
            </div>

            <div>
            <img src={skincare} alt="" />

              <h1>
              Skincare and Beauty              </h1>
              <p>Rich in antioxidants, our saffron helps brighten and rejuvenate the skin, making it a popular choice for high-end skincare products</p>

            </div>


            <div>
            <img src={tea} alt="" />

              <h1>
              Wellness and Health           </h1>
              <p>Known for its mood-enhancing and health-boosting properties, saffron can support overall well-being and natural stress relief.
              </p>
            </div>

        </div>

      </div>
      <div className='wc_div5'>
        <div  className='wc_div51'>
          <img src={crocusback} alt="" />

        </div>
        <div  className='wc_div52'>
          <h1>
          Elevate Your Experience
          </h1>
          <p>
Choose Z Princess Saffron to enhance your culinary creations, beauty routines, and wellness practices. Discover the luxury and benefits of our premium saffron and elevate your lifestyle with Z Princess Saffron.
</p>

        </div>
      </div>
      <div className='wc_div6'>
        <h1>Satisfaction Guarantee</h1>
        <p>
We back our saffron with a satisfaction guarantee, ensuring that you receive only the best. Our transparent practices mean you can trust in the quality and authenticity of every product.
</p>
      </div>
      <Footer/>
    </div>
  )
}

export default ChooseUs