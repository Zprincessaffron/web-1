import React from 'react'
import '../../styles/Gifting.css'
import { IoMdClose } from "react-icons/io";
import { BsWhatsapp } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { PiDeviceMobileLight } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";

function Gifting({ gifting,setGifting }) {
  return (
    <div className={`gifting_main ${gifting?"true":""}`}>
        <div className='ckeck_avail_1'> <p onClick={()=>{setGifting(false)}}><IoMdClose/></p> </div>
        <div className='pd_div1'>
            <h1>Gifting</h1>
        </div>
        <div className='pd_div2'>
            <p>We do our utmost to ensure the most enjoyable gifting experience, both for you and for the person who receives your gift. All orders are delivered in the iconic Louis Vuitton box. The delivery box contains inserts that ensure the gift reaches the recipient in perfect condition. During the checkout process, you may have the option of adding a Louis Vuitton shopping bag to your order, as well as a personalized message that will be printed and inserted in a signature LV envelope. All our purchases (gifts or not) are sent with a receipt that does not indicate the price of the item. This receipt is to be used in case of a return or exchange request. For more details about the Louis Vuitton gifting experience, please refer to our Gifting FAQs. And wherever you are, Louis Vuitton Client Advisors will be delighted to assist you. You can contact us on :</p>
            <div>
                
            <h2> <PiDeviceMobileLight/> +91 72001 50577</h2>
            <h2> <TfiEmail/> Send an Email</h2>
            <h2> <BsWhatsapp/> Whatsapp</h2>
            <h2> <FaInstagram/> Instagram</h2>
            </div>

        </div>

    </div>
  )
}

export default Gifting