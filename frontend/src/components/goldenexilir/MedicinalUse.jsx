import React, { useEffect, useState } from 'react'
import '../../styles/MedicinalUse.css'
import teapic2 from '../../images/saffrontea2.jpg'
import Navbar from '../../navbar/NavBar'
import Footer from '../../footer/Footer'
import { useUserContext } from '../../context/MainContext'
import SideBar from '../sidebar/SideBar'
import MenuSlider from '../sidebar/MenuSlider'

function MedicinalUse() {
    const [dish,setDish] =useState("depression")
    const [anim,setAnim] =useState("depression")
    const {  setShowNav,setSideBar,setMenuSlider }=useUserContext()

    function handleClick(val){
        setDish(val)
     
        setTimeout(() => {
            setAnim(val)

            
        }, 50);
        
    }
    
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
  return (
    <div>
        <Navbar/>
        <SideBar/>
        <MenuSlider/>
        <div className='mu_main'  style={{backgroundImage:`url(${teapic2})`}}><h1>MEDICINAL USES</h1></div>
        <div className={`radio_btton_mu ${dish}`}>
            <div className='culinary_div21'>
                <h1  onClick={()=>handleClick("depression")}className={`culinary_div21-h1 ${dish=='depression'?"true":""}`}>DEPRESSION</h1>
                <h1  onClick={()=>handleClick("health")}  className={`culinary_div21-h1 ${dish=='health'?"true":""}`}>HEALTH AND MEMORY</h1>
                <h1 onClick={()=>handleClick("pain")}  className={`culinary_div21-h1 ${dish=='pain'?"true":""}`}>PAIN REFIEF</h1>
                <h1 onClick={()=>handleClick("digestive")}  className={`culinary_div21-h1 ${dish=='digestive'?"true":""}`}>DIGESTIVE</h1>

            </div>

        </div>

          {dish=="depression"&&(
              <div className={`mu_div1 ${dish}`}>
              <h1>Depression and Anxiety</h1>
              <p>Saffron, a spice derived from the flower of Crocus sativus, has been studied for its potential effects on mood and mental health, including depression and anxiety. Here’s a summary of how saffron may influence these conditions</p>
              <div>
                  <h1>Mood Regulation</h1>
                  <p>Saffron contains several active compounds, such as crocin and safranal, which have been shown to have potential antidepressant and anxiolytic (anxiety-reducing) effects. These compounds may influence neurotransmitter systems in the brain, particularly serotonin and dopamine, which play key roles in regulating mood.</p>
              </div>
              <div>
                  <h1>Clinical Studies</h1>
                  <p><span className='medicinal_highlighter'>Depression:</span> Research has suggested that saffron supplementation may be effective in reducing symptoms of depression. Studies have found that saffron extracts can be as effective as conventional antidepressant medications like selective serotonin reuptake inhibitors (SSRIs) in some cases, with fewer side effects.</p>
                  <p><span  className='medicinal_highlighter'>Anxiety:</span> Saffron has also been studied for its potential anxiolytic effects. Some research indicates that it may help reduce symptoms of anxiety, potentially through its impact on serotonin levels and other neurotransmitter systems.</p>
              </div>
              <div>
                  <h1>Mechanism of Action</h1>
                  <p><span className='medicinal_highlighter'>Neurotransmitter Regulation: </span> Saffron is believed to influence the levels of serotonin, dopamine, and norepinephrine in the brain, which are neurotransmitters involved in mood regulation.</p>
                  <p><span className='medicinal_highlighter'>Antioxidant Properties:</span> Saffron contains antioxidants that may help reduce oxidative stress, which has been linked to mood disorders.</p>
                  <p><span className='medicinal_highlighter'>Anti-inflammatory Effects:</span> Chronic inflammation is associated with depression, and saffron’s anti-inflammatory properties might contribute to its mood-enhancing effects.</p>
              </div>
              <div>
                  <h1>dosage and safety</h1>
                  <p><span  className='medicinal_highlighter'>Dosage:</span> Clinical studies have used varying doses of saffron, typically ranging from 15 to 30 mg per day. It's essential to follow recommended dosages and consult a healthcare professional before starting any new supplement.</p>
                  <p><span  className='medicinal_highlighter'>Safety:</span> Saffron is generally considered safe when used in appropriate amounts. However, high doses can be toxic, and it may interact with certain medications. Consulting a healthcare provider is advisable, especially for individuals with existing health conditions or those taking other medications.</p>
              </div>
          </div>
          )}


{dish=="health"&&(
              <div className={`mu_div1 ${dish}`}>
     <h1>Cognitive Health and Memory Improvement</h1>
     <p>Saffron has been investigated for its potential effects on cognitive health and memory improvement. Here’s a detailed look at how saffron might influence these areas</p>
<div>
         <h1>Active Compounds and Mechanisms</h1>
         <p>Saffron contains several bioactive compounds, including crocin, safranal, and picrocrocin, which are believed to contribute to its cognitive benefits. Here’s how these compounds might work</p>
     </div>
     <div>
         <h1>Clinical Studies</h1>
         <p><span className='medicinal_highlighter'>Alzheimer's Disease:</span> Clinical trials have shown that saffron may improve cognitive function in patients with Alzheimer’s disease. For example, a study published in the journal Phytotherapy Research found that saffron supplementation improved cognitive function and daily living activities in Alzheimer's patients.</p>
         <p><span className='medicinal_highlighter'>Mild Cognitive Impairment:</span> Research also suggests that saffron may benefit individuals with mild cognitive impairment, potentially slowing down cognitive decline and improving overall cognitive performance.</p>
     </div>
     <div>
         <h1>Mechanism of Action</h1>
         <p><span  className='medicinal_highlighter'>Antioxidant Activity:</span> The antioxidant properties of saffron can help neutralize free radicals and reduce oxidative stress, which is linked to cognitive decline.</p>
         <p><span  className='medicinal_highlighter'>Anti-inflammatory Effects: </span>Chronic inflammation is associated with neurodegenerative diseases, and saffron’s anti-inflammatory properties may help mitigate this inflammation.</p>
         <p><span  className='medicinal_highlighter'>Neurogenesis:</span> Some studies suggest that saffron may promote neurogenesis (the growth of new neurons), which can support cognitive function and memory.</p>
     </div>
     <div>
         <h1>dosage and safety</h1>
         <p><span  className='medicinal_highlighter'>Dosage:</span>  Effective doses used in studies typically range from 20 to 30 mg per day. It's important to adhere to recommended dosages and consult with a healthcare provider for personalized advice.</p>
         <p><span  className='medicinal_highlighter'>Safety:</span> Saffron is generally considered safe when used in moderation. However, high doses can be toxic, and it may interact with certain medications. Consultation with a healthcare professional is recommended, especially if you have underlying health conditions or are taking other medications.</p>
     </div>
 </div>

)}

       

        
       {dish == "pain"&&(
              <div className={`mu_div1 ${dish}`}>
         <h1>Anti-Inflammatory and Pain Relief</h1>
         <p>Saffron has been studied for its potential anti-inflammatory and pain-relief properties. Here’s an overview of how saffron might contribute to these effects</p>
         <div>
             <h1>Active Compounds</h1>
             <p>Saffron contains several bioactive compounds that are believed to contribute to its anti-inflammatory and pain-relief properties</p>
         </div>
         <div>
             <h1>Pain relief</h1>
             <p><span className='medicinal_highlighter'>Analgesic Effects:</span> Saffron has been shown to have mild analgesic effects in some studies. Its ability to reduce inflammation can indirectly contribute to pain relief, as inflammation is often a source of pain.</p>
             <p><span className='medicinal_highlighter'>Reduction in Pain Symptoms:</span> Clinical studies have explored saffron’s potential to reduce pain symptoms in conditions such as osteoarthritis and menstrual pain. For example, research has found that saffron supplementation can help reduce pain and improve quality of life in individuals with osteoarthritis.</p>
         </div>
         <div>
             <h1>Clinical studies</h1>
             <p><span className='medicinal_highlighter'>Menstrual Pain:</span> Saffron has also been investigated for its effects on menstrual pain (dysmenorrhea). Research indicates that saffron may help alleviate menstrual cramps and reduce the severity of pain.</p>
             <p><span className='medicinal_highlighter'>Osteoarthritis:</span> Clinical trials have demonstrated that saffron can help reduce pain and improve joint function in people with osteoarthritis. Studies have shown that saffron supplementation can lead to significant improvements in pain and disability scores.</p>
         </div>
         <div>
             <h1>dosage and safety</h1>
             <p> <span className='medicinal_highlighter'>Dosage:</span>Effective dosages for anti-inflammatory and pain-relief effects generally range from 20 to 30 mg per day. It’s important to follow recommended dosages and consult with a healthcare provider for personalized advice.</p>
             <p><span className='medicinal_highlighter'>Safety: </span>Saffron is considered safe when used in moderate amounts. However, high doses can be toxic, and it may interact with certain medications. Consulting with a healthcare professional is advisable, especially if you have existing health conditions or are taking other medications.</p>
         </div>
     </div>
       )}


        
       {dish == 'digestive'&&(
              <div className={`mu_div1 ${dish}`}>
         <h1>Digestive Health</h1>
         <p>Saffron has been studied for its potential benefits to digestive health. Here’s a detailed look at how saffron might contribute to various aspects of digestive wellness:</p>
         <div>

             <h1>Digestive Benefits</h1>
             <p>Saffron's active compounds, such as crocin and safranal, have antioxidant and anti-inflammatory properties. These can help reduce oxidative stress and inflammation in the digestive tract, which may alleviate symptoms of digestive disorders.</p>
         </div>
         <div>
             <h1>Clinical Studies</h1>
             <p><span className='medicinal_highlighter'>Peptic Ulcers:</span> Saffron has been studied for its potential to protect against peptic ulcers. Research has suggested that saffron may help reduce ulcer formation and promote healing of the gastric mucosa. Its anti-inflammatory and antioxidant properties may contribute to this protective effect.</p>
             <p><span className='medicinal_highlighter'>Digestive Health and Appetite Regulation:</span> Saffron may also play a role in appetite regulation and digestive health. Some studies have explored its potential to reduce appetite and improve satiety, which could be beneficial for weight management and digestive health.</p>
         </div>
         <div>
             <h1>Mechanism of Action</h1>
             <p><span className='medicinal_highlighter'>Anti-inflammatory Effects: </span>By reducing inflammation in the digestive tract, saffron may help alleviate conditions such as gastritis and inflammatory bowel diseases.</p>
             <p><span className='medicinal_highlighter'>Antioxidant Properties:</span> Saffron’s antioxidant compounds can help neutralize free radicals, reducing oxidative damage to the digestive tissues.</p>
             <p><span className='medicinal_highlighter'>Gastric Motility: </span>There is some evidence that saffron might influence gastric motility (the movement of food through the digestive tract), which can affect digestion and overall gastrointestinal function.</p>
         </div>
         <div>
             <h1>dosage and safety</h1>
             <p><span className='medicinal_highlighter'>Dosage:</span> For digestive health, doses typically range from 20 to 30 mg per day. It’s important to follow recommended dosages and consult with a healthcare provider for personalized advice.</p>
             <p><span className='medicinal_highlighter'>Safety: </span>Saffron is generally safe when used in moderate amounts. However, high doses can be toxic, and it may interact with certain medications. Always consult a healthcare professional before starting saffron supplementation, especially if you have existing digestive conditions or are taking other medications.</p>
         </div>
     </div>
       )}


    <Footer/>
    </div>
  )
}

export default MedicinalUse