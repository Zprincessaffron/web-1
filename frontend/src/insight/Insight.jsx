import React, { useEffect, useRef, useState } from 'react'
import '../styles/Insight.css'
import Navbar from '../navbar/NavBar'
import { useUserContext } from '../context/MainContext'
import Footer from '../footer/Footer'
import saffblack1 from '../images/saff black1.jpg'
import saffronface from '../images/spack.jpg'
import saffronrice from '../images/culinarymilk.jpeg'
import saffrontea from '../images/img2.jpg'
import insightback from '../images/insightback.mp4'

import insight_back from '../images/insight_back.png'

import saffronc from '../images/saffronc.jpg'
import insight1 from '../images/insight1.jpg'
import insight2 from '../images/insight2.jpg'
import SideBar from '../components/sidebar/SideBar'
import MenuSlider from '../components/sidebar/MenuSlider'


 

function Insight() {
    const { setShowNav,setSideBar,setMenuSlider }=useUserContext()
    const [showhealth,setshowHealth]=useState(false)
    const [showbeauty,setshowBeauty]=useState(false)
    const [showculinary,setshowCulinary]=useState(false)
    const [width,setWidth]=useState(70)
    const [width1,setWidth1]=useState(70)


    const [isAtTop, setIsAtTop] = useState(false);
    const [isAtTop1, setIsAtTop1] = useState(false);

    const divRef = useRef(null);
    const divRef1 = useRef(null);

    useEffect(() => {
      const handleScroll = () => {
        if (isAtTop1) {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          // Calculate width based on scrollTop. Starts from 0 width when at the top.
          const newone = scrollTop / 5
          const newagain = newone - 450
          setWidth1(70 - newagain); // Adjust the divisor to control the width change speed
      
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [isAtTop1]);
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
    
            setIsAtTop1(entry.boundingClientRect.top <= 0 && entry.isIntersecting);



        },
        {
          threshold: 0,
          rootMargin: "0px 0px -100% 0px", // Adjusts the observer to detect when div touches the top
        }
      );

      if (divRef1.current) {
        observer.observe(divRef1.current);
      }

      return () => {
        if (divRef1.current) {
          observer.unobserve(divRef1.current);
        }
      };

      
    }, [width]);



    useEffect(() => {
      const handleScroll = () => {
        if (isAtTop) {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          // Calculate width based on scrollTop. Starts from 0 width when at the top.
          const newone = scrollTop / 5
          const newagain = newone - 172
          setWidth(70 - newagain); // Adjust the divisor to control the width change speed
          if(width<0){
            setFixed(false)

          }
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [isAtTop]);
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
    
            setIsAtTop(entry.boundingClientRect.top <= 0 && entry.isIntersecting);



        },
        {
          threshold: 0,
          rootMargin: "0px 0px -100% 0px", // Adjusts the observer to detect when div touches the top
        }
      );

      if (divRef.current) {
        observer.observe(divRef.current);
      }

      return () => {
        if (divRef.current) {
          observer.unobserve(divRef.current);
        }
      };

      
    }, [width]);
    
    useEffect(() => {
      setMenuSlider(false)
      setSideBar(false)
    }, [])
    
  return (
    <div className='insight_main'>
        <Navbar/>
        <SideBar/>
        <MenuSlider/>
        
        <div className='insight_div1'>
          <div className='insight_div11'>
            <video loop autoPlay muted src={insightback}></video>
          </div>
          <div className='insight_div12'>
            <h1>INSIGHT</h1>
            <p>From Ancient Threads to Modern Elixirs</p>
          </div>

        </div>
        <div className='insight_div2'   ref={divRef}>
          <h1>Unveil the Secrets of the Crocus Sativus</h1>
          <div></div>
          <p>Step into a world where history and luxury meet with our premium saffron collection. Cultivated with deep respect for its legendary qualities, each saffron thread tells a story of ancient royalty and offers the promise of vibrant culinary delights, radiant skin, and a touch of well-being magic.</p>
        </div>
        <div className='insight_div3' >
          <div className={`insight_div31 ${isAtTop?'true':""}`}>
            <img src={saffblack1} alt="" />
          </div>
          <div className={`insight_div32 ${isAtTop?'true':""}`} style={{boxShadow:`inset 0 0 0 ${width}px white`}}>
            <div className='insight_div321'>

            </div>

          </div>

        </div>
     

        <div className='insight_div2'   ref={divRef1}>
          <h1>Unveiling the Magic of Saffron </h1>
          <div></div>
          <p>Do you crave a taste of history and a touch of legend? Saffron, known as the "king of spices," is no longer reserved for royalty alone. Each delicate saffron thread, hand-picked at the peak of its potency, promises to elevate your experiences.</p>
        </div>
        <div className='insight_div3' >
          <div className={`insight_div31 ${isAtTop?'true':""}`}>
            <img src={saffronc} alt="" />
          </div>
          <div className={`insight_div32 ${isAtTop?'true':""}`} style={{boxShadow:`inset 0 0 0 ${width1}px white`}}>
            <div className='insight_div321'>

            </div>

          </div>

        </div>
        <div className='insight_div5main'>
        <div className='insight_div5'>
          <div className='insight_div51'>
            <div  className='insight_div511'>
              <img src={saffronrice} alt="" />

            </div>
            <div  className='insight_div512'>
              <h1>Culinary Mastery</h1>
              <p>Imagine adding a single thread of saffron to your dish. The moment it touches your food, the air fills with a rich, honeyed aroma that transports you to distant lands. The vibrant, fiery color spreads through your dish, turning it into a visual and gastronomic masterpiece. Whether you’re preparing a traditional paella, a luxurious risotto, or an exquisite dessert, saffron’s unique flavor and color will elevate your culinary creations to new heights. It’s not just cooking; it’s an art form that dazzles the senses.</p>

            </div>

          </div>
          <div className='insight_div52'>

            
          </div>

        </div>

        <div className='insight_div5'>
          <div className='insight_div51'>
            <div  className='insight_div511'>
              <img src={saffronface} alt="" />

            </div>
            <div  className='insight_div512'>
              <h1>Timeless Beauty</h1>
              <p>Saffron has been cherished for its beauty-enhancing properties. Cleopatra, renowned for her beauty, was said to bathe in saffron-infused milk to maintain her youthful glow. Today, modern science backs these ancient practices, revealing saffron’s potent anti-aging properties. Saffron helps to reduce the appearance of fine lines and wrinkles, improve skin texture, and impart a radiant glow. Integrating saffron into your skincare routine can bring a touch of ancient luxury to your everyday life.</p>

            </div>

          </div>
          <div className='insight_div52'>
            
          </div>

        </div>

        <div className='insight_div5'>
          <div className='insight_div51'>
            <div  className='insight_div511'>
            <img src={saffrontea} alt="" />

            </div>
            <div  className='insight_div512'>
              <h1>Holistic Well-Being</h1>
              <p>Saffron’s magic doesn’t stop at beauty. This golden spice is celebrated for its remarkable health benefits, promoting overall well-being. Historically used in traditional medicine, saffron is known to enhance mood, reduce stress, and support digestion. Recent studies suggest that saffron may help alleviate symptoms of depression and anxiety, offering a natural way to improve mental health. Additionally, its anti-inflammatory properties can aid in digestion and boost the immune system, making saffron a holistic elixir for both mind and body.</p>

            </div>

          </div>
          <div className='insight_div52'>
            
          </div>

        </div>
        </div>
        <div className='insight_div6'>
          <img src={insight1} alt="" />
          <div className='insight_div61'>
            <h1>Quality and Tradition</h1>
            <p>
Our premium saffron is the key to unlocking this ancient magic. Each thread is a result of meticulous hand-picking and drying processes, ensuring the highest quality and potency. Grown in the fertile fields under optimal conditions, our saffron maintains its robust flavor, vibrant color, and aromatic essence. Whether you are a gourmet chef, a skincare enthusiast, or someone seeking natural wellness solutions, our saffron offers a touch of luxury that transcends the ordinary.
</p>

          </div>

        </div>

        <div className='insight_div6'>
          <img className='insigntendimg' src={insight2} alt="" />
          <div className='insight_div61'>
            <h1>Experience the Magic</h1>
            <p>
            Discover the golden threads that have woven their way through history and let saffron’s magic elevate your life in ways you've never imagined. Welcome to a world where every dish dazzles, every beauty routine sparkles, and every moment is infused with a touch of golden luxury. With our premium saffron, experience the richness of history, the purity of nature, and the luxury of the finest spice in the world.</p>

          </div>

        </div>


     

        <Footer/>

    </div>
  )
}

export default Insight
