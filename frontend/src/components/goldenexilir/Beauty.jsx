import React, { useEffect, useState } from 'react'
import '../../styles/Beauty.css';
import beautymain from '../../images/beautyback3.jpg'
import Navbar from '../../navbar/NavBar';
import Footer from '../../footer/Footer';
import { useUserContext } from '../../context/MainContext';
import SideBar from '../sidebar/SideBar';
import MenuSlider from '../sidebar/MenuSlider';


function Beauty() {
    const [dish,setDish] =useState("brightning")
    const [anim,setAnim] =useState("brightning")
    const {  setShowNav,setSideBar,setMenuSlider }=useUserContext()
    useEffect(() => {
        setMenuSlider(false)
        setSideBar(false)
      }, [])
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


    function handleClick(val){
        setDish(val)
     
        setTimeout(() => {
            setAnim(val)

            
        }, 50);
        
    }
  return (
    <div>
        <Navbar/>
        <SideBar/>
        <MenuSlider/>
        <div className='culinary_div1' style={{backgroundImage:`url(${beautymain})`}}> 
            <div className='culinary_div11'>
                <h1>BEAUTY USES</h1>
            </div>
        </div>
        <div className={`radio_btton_beauty ${dish}`}>
        <div className='culinary_div21'>



            <h1  onClick={()=>handleClick("brightning")}className={`culinary_div21-h1 ${dish=='brightning'?"true":""}`}>SKIN BRIGHTNING</h1>
                <h1  onClick={()=>handleClick("antiaging")}  className={`culinary_div21-h1 ${dish=='antiaging'?"true":""}`}>ANTI-AGING</h1>
                <h1 onClick={()=>handleClick("skintone")}  className={`culinary_div21-h1 ${dish=='skintone'?"true":""}`}>EVEN SKIN TONE</h1>
                <h1 onClick={()=>handleClick("acne")}  className={`culinary_div21-h1 ${dish=='acne'?"true":""}`}>ACNE TREATMENT</h1>

</div>
        </div>
        {dish == "brightning"&&(
                   <div className={`beauty_div1 ${dish}`}>
                   <h1>Skin Brightening and Radiance</h1>
                   <p>Saffron’s rich antioxidant content helps to lighten skin pigmentation and enhance radiance. Compounds like crocin and safranal work to reduce melanin production, leading to a more even skin tone.</p>
                   <div>
                       <h1>Chemical Composition</h1>
                       <p>This carotenoid pigment is primarily responsible for saffron’s color and has potent antioxidant properties. Crocin helps reduce oxidative stress in skin cells, leading to a more luminous complexion.</p>
                   </div>
                   <div>
                       <h1>Clinical Studies</h1>
                       <p><span className='medicinal_highlighter'>Studies:</span> Some clinical studies and trials suggest that saffron extracts can improve skin brightness and reduce hyperpigmentation. For example, a study published in the "Journal of Cosmetic Dermatology" found that a saffron-based topical formulation improved skin radiance and evenness in participants.</p>
                       <p><span className='medicinal_highlighter'>Consumer Reports:</span> Many users report positive effects, such as a brighter complexion and improved skin tone, after using saffron-infused skincare products.</p>
                   </div>
                   <div>
                       <h1>Mechanism of Action</h1>
                       <p><span className='medicinal_highlighter'>Reduction of Melanin Production: </span>Saffron's active compounds can inhibit the enzyme tyrosinase, which plays a key role in melanin synthesis. By reducing tyrosinase activity, saffron can help lighten dark spots and even out skin tone.</p>
                       <p><span className='medicinal_highlighter'>Improved Circulation:</span> Saffron may enhance blood circulation in the skin, which can contribute to a healthier, more radiant appearance by delivering more nutrients and oxygen to skin cells.</p>
                   </div>
                   <div>
                       <h1>Formulation and Application</h1>
                       <p><span className='medicinal_highlighter'>Topical Products:</span> Saffron is commonly included in creams, serums, and masks. These products can provide direct benefits when applied to the skin.</p>
                       <p><span className='medicinal_highlighter'>DIY Masks:</span> You can create homemade masks using saffron threads steeped in milk or yogurt, which can be applied to the face for a brightening effect.</p>
                   </div>
                   <div>
                       <h1>Considerations</h1>
                       <p>Saffron is generally safe for most skin types, but some individuals may experience sensitivity. Always perform a patch test before using new products.</p>
                   </div>
               </div>
        )}
 


        
        {dish == "antiaging"&&(
                   <div className={`beauty_div1 ${dish}`}>
            <h1>Anti-Aging and Wrinkle Reduction</h1>
            <p>The antioxidants in saffron combat oxidative stress and prevent premature aging. Saffron helps to stimulate collagen production, which improves skin elasticity and reduces the appearance of fine lines and wrinkles.</p>
       <div>
                <h1>Antioxidant Properties</h1>
                <p>Saffron contains powerful antioxidants like crocin, crocetin, and safranal. These antioxidants help neutralize free radicals—unstable molecules that can damage skin cells and accelerate aging. By reducing oxidative stress, saffron helps to prevent premature aging and the formation of wrinkles.</p>
            </div>
            <div>
                <h1>Anti-Inflammatory Effects</h1>
                <p>The anti-inflammatory compounds in saffron can help reduce inflammation and redness in the skin. Chronic inflammation is a factor that can lead to skin aging, so minimizing it helps maintain skin health and elasticity.</p>
                </div>
            <div>
                <h1>Skin Hydration</h1>
                <p>Saffron can enhance skin hydration by improving the skin's ability to retain moisture. Well-hydrated skin is more supple and less prone to developing fine lines and wrinkles.</p>
                   </div>
            <div>
                <h1>Collagen Production</h1>
                <p>Saffron’s antioxidants help protect collagen and elastin fibers, which are essential for skin structure and elasticity. While saffron doesn't directly stimulate collagen production, it helps maintain the integrity of existing collagen, contributing to smoother and more resilient skin.</p>
                    </div>
                    <div>
                <h1>Cell Regeneration</h1>
                <p>Saffron can aid in cell regeneration and turnover, which helps to replace damaged or aged skin cells with newer, healthier ones. This process can reduce the appearance of fine lines and improve skin texture.</p>
                    </div>
        </div>

        )}

        
        {dish == 'skintone'&&(
                   <div className={`beauty_div1 ${dish}`}>
            <h1>Even Skin Tone and Redness Reduction</h1>
            <p>Saffron’s anti-inflammatory properties help to calm irritated skin and reduce redness. It also aids in balancing skin tone and soothing conditions like rosacea or redness.</p>
            <div>
                <h1>Melanin Regulation</h1>
                <p>Saffron contains compounds like crocin and picrocrocin that may inhibit the enzyme tyrosinase, which is crucial for melanin production. By reducing melanin production, saffron helps to lighten hyperpigmentation, dark spots, and uneven skin tone, leading to a more uniform complexion.</p>
            </div>
            <div>
                <h1>Anti-Inflammatory Properties</h1>
                <p>The anti-inflammatory compounds in saffron, such as crocetin and safranal, help calm inflammation and redness in the skin. This can be particularly beneficial for conditions like rosacea or post-acne redness, as reducing inflammation can alleviate the appearance of redness and improve overall skin tone.</p>
            </div>
            <div>
                <h1>Antioxidant Effects</h1>
                <p>Saffron’s antioxidants help protect the skin from oxidative stress and environmental damage, which can exacerbate redness and uneven skin tone. By neutralizing free radicals, saffron helps maintain a more even and healthy complexion.</p>            </div>
            <div>
                <h1>Skin Brightening</h1>
                <p>Saffron has natural skin-brightening properties that can contribute to a more radiant and even skin tone. It helps to reduce dullness and enhance the overall glow of the skin.</p>
            </div>
            <div>
                <h1>Cell Regeneration</h1>
                <p>By aiding in cell turnover and regeneration, saffron helps to replace damaged or uneven skin cells with new, healthy ones. This process can improve skin texture and tone, reducing the appearance of dark spots and redness.</p>
            </div>
        </div>
        )}


        
       {dish =='acne'&&(
                   <div className={`beauty_div1 ${dish}`}>
         <h1>Acne Treatment and Skin Clarity</h1>
         <p>Saffron’s antibacterial and anti-inflammatory properties make it beneficial for treating acne and preventing breakouts. It helps to clear up blemishes and improve overall skin clarity.</p>
         <div>

             <h1>Antimicrobial Properties</h1>
             <p>Saffron contains antimicrobial compounds like crocin and safranal that can help inhibit the growth of acne-causing bacteria, such as Propionibacterium acnes. This can reduce the severity and frequency of breakouts.</p>
         </div>
         <div>
             <h1>Anti-Inflammatory Effects</h1>
             <p>The anti-inflammatory properties of saffron help to reduce redness, swelling, and irritation associated with acne. By calming inflammation, saffron can make acne lesions less noticeable and improve overall skin clarity.</p>
         </div>
         <div>
             <h1>Antioxidant Benefits</h1>
             <p>Saffron’s antioxidants help neutralize free radicals that can cause oxidative stress and damage to skin cells. This can help prevent inflammation and promote healthier skin, contributing to clearer skin over time.</p>
         </div>
         <div>
             <h1>Skin Healing and Repair</h1>
             <p>Saffron promotes cell turnover and regeneration, which helps to heal acne lesions and reduce scarring. By facilitating the repair of damaged skin, saffron can improve skin texture and clarity.</p>
               </div>
               <div>
             <h1>Regulation of Sebum Production</h1>
             <p>While saffron does not directly regulate sebum production, its anti-inflammatory and antimicrobial properties can help manage the effects of excess oil on the skin. By reducing inflammation and bacterial growth, saffron can help alleviate some of the issues associated with oily skin and acne</p>
               </div>
     </div>

       )}

       <Footer/>
    </div>
  )
}

export default Beauty