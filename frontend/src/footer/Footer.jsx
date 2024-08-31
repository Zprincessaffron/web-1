import React from 'react'
import '../styles/Footer.css'
import { CgMail } from "react-icons/cg";
import { FaWhatsapp } from "react-icons/fa6";

function Footer() {
  return (
    <div className='footer_main'>
        <div className='footer_div1'>
            <h3>
            Corporate Essentials
            </h3>
            
            <p>FSSAI License No: 12423008002367 </p>
            <p>GSTIN: 33ABFA6551N1ZZ</p>
            <p>MSME UAN: TN-02-0006511</p>
        </div>

        <div className='footer_div1'>
            <h3>
                ABOUT ZPRINCESS
            </h3>
            <p>Our Products</p>
            <p>Terms And Conditions</p>
            <p>Privacy Policy</p>
        </div>

        <div className='footer_div1'>
            <h3>
                CONTACT US
            </h3>
            <p> You can call or email us </p>
            <p></p>
            <div className='footer_div11'>
                <p> <CgMail/></p> <p><FaWhatsapp/> </p>
            </div>

        </div>
     

    </div>
  )
}

export default Footer