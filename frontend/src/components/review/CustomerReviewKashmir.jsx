import React, { useState } from 'react'
import '../../styles/CustomerReview.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import CustomerReviewForm from './CustomerReviewForm'
import Lottie from "lottie-react";

import animforreview from '../../images/sucessfroreview.json'
function CustomerReviewKashmir() {
    const [uniqueid,setUniqueId]=useState('')
    const [verify,setVerify]=useState('unverified')
    const [msg,setMsg]=useState('')
    const [scale ,setScale]=useState('')


    function handleSubmit(){
            try {
                axios.get(`/user/${uniqueid}`).then(
                    res=>{
                        if(res.data.name){
                            localStorage.setItem('usernameforreview', res.data.name);
                            setScale('scale')
                            setTimeout(() => {
                                setVerify('success')

                            }, 400);
                            setTimeout(() => {
                                setVerify('verified')

                            }, 1500);
                            setTimeout(() => {
                                setVerify('verified')

                            }, 1500);

                        }
                        else{
                            setMsg('user not found')
                        }
                        
                    }
                )

            } catch (err) {
                console.log(err.response)
            }finally{

            }
    }
    function handleInputChange(e){
        setUniqueId(e.target.value)

    }
  return (
    
    <div className='cus_main'>
        {verify == 'unverified'&&(
            <div className={`cus_div ${scale =='scale' ?'true':''}`}>
            <div>WELCOME USER</div>
            <p className='cus_sub'>Check Your Profile or Check Your Mail to Know Your UniqueID </p>
            <label htmlFor="">Enter UniqueID</label>
            <p className='err-msg'>{msg}</p>
            <input name='uniqueid' onChange={handleInputChange} value={uniqueid} type="text" />
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>)
        }
        {verify == 'verified'&&(
       <CustomerReviewForm product='Kashmir Saffron' setverify={setVerify} />
        )}
        {verify == 'success' &&(
                <div className='lottie-div'>
                <Lottie 
                  animationData={animforreview} 
                  loop={false} // Disables looping
                  autoplay={true} // Optional: Automatically starts the animation
                  style={{ width: 300, height: 300 ,overflow:"hidden" }} // Optional: Set the size of the animation
                />
              </div>
        )

        }

    </div>
  )
}

export default CustomerReviewKashmir