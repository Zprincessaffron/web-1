import React, { useEffect, useState } from 'react'
import '../../styles/otp.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useUserContext } from '../../context/MainContext';
import { useNavigate } from 'react-router-dom';
import { TbPasswordMobilePhone } from "react-icons/tb";


const Otp = () => {
  const { navOtp,setNavOtp,userEmail }=useUserContext()
  const initialValues = {
    email: userEmail,
    otp: ''
  };

  const validationSchema = Yup.object({
    otp: Yup.string()
    .required('OTP is required')
    .matches(/^\d{6}$/, 'OTP must be exactly 6 digits')

  });

  const [seconds, setSeconds] = useState(59);
  const [reSend, setReSend] = useState(false);
  const navigate = useNavigate()



  useEffect(() => {
      if (seconds > 0) {
          const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
          return () => clearTimeout(timer);
      } else {
        setReSend(true)
      }
  }, [seconds]);
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('/verify-otp', values);
      console.log('Registration Successful', response.data);
      // Handle successful registration, e.g., redirect to login page
      setNavOtp(true)
      resetForm();
      navigate('/login')


    } catch (error) {
      console.error('Registration Error', error.response.data);
      // Handle registration error
    } finally {
      setSubmitting(false);
    }
  };
  async function handleResend() {
    setSeconds(59)
    setReSend(false)
    try {
        const response = await axios.post('/resend-otp', {
            email:userEmail
        });
        console.log('Opt resent', response.data);
        
    } catch (error) {
        
    }
    
  }
  return (
    <div className='otp_main'>
      <h1>Verification Required</h1>
      <p>{`we have sent a verification code to ${userEmail} `}</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form className='otp_form'>
            <div className='rf_form1'>

              <label className='label-form' htmlFor="name">Enter OTP</label>
              <div className='rf_form11'>

              <Field
                type="text"
                id="name"
                name="otp"
              />
              <div>
              <TbPasswordMobilePhone />
              </div>
              </div>
              <ErrorMessage name="otp" component="div" className="error" />
            </div>
            <div className='otp_btn_div'>
            <button type="submit" className='sub_button' disabled={!formik.isValid || formik.isSubmitting}>
              Register
            </button>
            </div>
            <div className='resend_div'>
                <p>Didn't receive the code?</p>
               {reSend?(<h4 onClick={handleResend}>Resend</h4>):( <h5>{`Resend OTP in 0:${seconds}`}</h5>)}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Otp;






