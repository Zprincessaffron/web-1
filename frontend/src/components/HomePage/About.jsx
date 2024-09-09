import React, { useEffect, useState } from 'react'
import bff from '../../images/aboutback1.png'
import crocuses from '../../images/crocuses.jpg'
import abt_back from '../../images/abt_back.png'
import basundi from '../../images/basundi.png';
import saffronmask from '../../images/saffronmask.jpg';
import pregnancywmen from '../../images/pregnancywmen.jpg';

import abtend1 from '../../images/abtend1.jpg';

import culinarymedi from '../../images/culinarymedi.jpg';

import '../../styles/About.css'
import Navbar from '../../navbar/NavBar';


 
function About() {
    const [trans,setTrans]=useState(120)
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            // Calculate width based on scrollTop. Starts from 0 width when at the top.
            const newone = scrollTop / 1
            const newagain = newone 
            setTrans(120 - newagain); // Adjust the divisor to control the width change speed
        
          }
    
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);
      console.log(trans)

    return (
        <div className='aboutmain'>
            <Navbar/>
            <div className='about_div1'>
                <div className='about_div11'>
                    <h1 style={{transform:`translateY(${trans}px)`}}>Z PRINCES SAFFRON</h1>
                </div>
                <div className='about_div12'>
                    <img src={bff} alt="" />
                </div>
            </div>
            <div className='about_div2'>
                <h1>WHO WE ARE</h1>
                <div></div>
                <p>Z PRINCESS SAFFRON is a distinguished saffron seller located in Chennai, India, dedicated to bringing you the world’s finest saffron. Our saffron is meticulously harvested from the most prestigious regions known for their superior quality – Kashmir, Spain, and Iran. Each strand of our saffron carries the essence of these regions, known for their unique climate and traditional harvesting</p>
            </div>
            <div className='about_div3'>
                <div className='about_div31'>
                <img src={crocuses} alt="" />

                </div>
                <div className='about_div32'>
                    <p>we are passionate about offering an authentic saffron experience. Our commitment to quality ensures that every thread of saffron you purchase from us is pure, unadulterated, and of the highest standard.</p>
                </div>

            </div>
            <div className='about_div4'>
                <div className='about_div41'>
                    

                </div>
                <div className='about_div42'>
                    <h1>OUR MISSION</h1>
                    <div></div>
                    <p> is to provide our customers with unparalleled service and a product that stands out in terms of quality and authenticity. We believe that saffron is more than just a spice – it’s a journey through tradition, culture, and flavor. Trust Z PRINCESS SAFFRON to deliver an exceptional saffron experience, one that enhances your cooking, beauty, and health routines.</p>

                </div>

            {/* </div>
            <div className='about_div5'>
                <div className='about_div51'>
                    <div className='about_div511'>
                        <img src={basundi} alt="" />
                    </div>
                    <div className='about_div512'>
                        <h1>FOR Culinary Uses</h1>
                        <p>Whether you are a professional chef aiming to elevate your dishes or a home cook looking to add a touch of luxury to your culinary creations, our saffron is perfect for adding depth and richness to a variety of dishes.</p>
                    </div>
                </div>

                <div className='about_div51'>
                    <div className='about_div511'>
                        <img src={saffronmask} alt="" />
                    </div>
                    <div className='about_div512'>
                        <h1>For beauty and skincare </h1>
                        <p>our saffron offers natural anti-inflammatory and antioxidant properties, perfect for brightening the skin, reducing pigmentation, and enhancing your overall complexion with a radiant glow.</p>
                  </div>
                </div>

                <div className='about_div51'>
                    <div className='about_div511'>
                        <img src={culinarymedi} alt="" />
                    </div>
                    <div className='about_div512'>
                        <h1>HEALTH - BENEFITS</h1>
                        <p>Health-conscious individuals can benefit from the numerous health properties of saffron, including improved mood, digestion, and overall well-being. Our saffron is ideal for incorporating a natural, health-boosting ingredient into your daily routine</p>
                    </div>
                </div>

                <div className='about_div51'>
                    <div className='about_div511'>
                        <img src={pregnancywmen} alt="" />
                    </div>
                    <div className='about_div512'>
                        <h1>For pregnant women</h1>
                        <p>saffron has traditionally been used to support well-being, offering benefits such as improved digestion and mood enhancement. However, it should be used in moderation, and we always recommend consulting with a healthcare professional before use.</p>
                    </div>
                </div> */}
            </div>
            <div className='about_div6'>
                <div className='about_div61'>
                    <img src={abtend1} alt="" />

                </div>
                <div className='about_div62'>
                    <p>Join us in celebrating the timeless allure of saffron. With Z PRINCESS SAFFRON, every aspect of your life becomes a little more luxurious and memorable.</p>
                </div>


            </div>
        </div>
    )
}

export default About