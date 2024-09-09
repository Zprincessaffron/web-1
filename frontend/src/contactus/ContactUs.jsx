import React, { useEffect } from 'react'
import '../styles/ContactUs.css'
import contactusback from '../images/contactbackpink.jpg'
import { IoLogoWhatsapp } from "react-icons/io5";
import { CgMail } from "react-icons/cg";
import { IoMdCall } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import Navbar from '../navbar/NavBar';
import { useUserContext } from '../context/MainContext';
import Footer from '../footer/Footer';

function ContactUs() {
    const { setShowNav }=useUserContext()
    useEffect(() => {
       
        setShowNav(true);

       
      }, []);
  return (
    <div>
        <Navbar/>
        <div className='contact_div1' style={{backgroundImage:`url(${contactusback})`}}>
   
            <div className='contact_div12'>
                <h1>CONTACT DETAILS</h1>
                <p>Our office hours are Monday to Saturday, 9 AM to 6 PM.</p>
                <p><MdLocationOn/>Chennai,India</p>
                <p><IoMdCall/>+91 72001 50577</p>
                <p><CgMail/>zprincessaffron@gmail.com</p>
                <div className='contact_div121'>
                    <div className='contact_needhlp'>Need Help? We're Here</div>
                    <div className='contact_div121_1'>
                    <input type="text" placeholder='Name'  />
                    <input type="text" placeholder='Email'  />
                    <textarea name="message" rows="5" cols="40" placeholder="Message"></textarea>
                    <button>Submit</button>
                    </div>

                </div>

            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default ContactUs