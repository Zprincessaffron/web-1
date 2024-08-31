import React from 'react'
import '../../styles/Newsletter.css'
function NewsLetter() {
  return (
    <div className='nwsletter_main'>
               <div className='nwsletter_container'>
             <div className='sub_txt'>SUBSCRIBE TO OUR NEWSLETTER</div>
        <div className='newsletter_container'>
            <input type="text" placeholder='Email Address' /><button>SUBSCRIBE</button>
        </div>
        </div>
    </div>
  )
}

export default NewsLetter