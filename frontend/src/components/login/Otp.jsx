import React, { useEffect, useState } from 'react';
import '../../styles/otp.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TbPasswordMobilePhone } from "react-icons/tb";

const Otp = ({ setNavOtp, navOtp, userEmail, userPhone }) => {
  const identifier = userEmail || userPhone; // Declare identifier here

  const initialValues = {
    identifier, // Use identifier in initial values
    otp: ''
  };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .required('OTP is required')
      .matches(/^\d{6}$/, 'OTP must be exactly 6 digits')
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values); // This should now show 'identifier' correctly
    try {
      const response = await axios.post('/verify-otp', values);
      setNavOtp(true);
      resetForm();
      navigate('/login');
    } catch (error) {
      console.error('Verification Error', error.response?.data);
    } finally {
      setSubmitting(false);
    }
  };

  const [seconds, setSeconds] = useState(59);
  const [reSend, setReSend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setReSend(true);
    }
  }, [seconds]);

  async function handleResend() {
    setSeconds(59);
    setReSend(false);
    try {
      const response = await axios.post('/resend-otp', {
        identifier, // Pass either the email or phone number
      });
      console.log('OTP resent', response.data);
    } catch (error) {
      console.error('Resend Error', error.response?.data || error.message);
    }
  }

  return (
    <div className='otp_main'>
      <h1>Verification Required</h1>
      <p>{`We have sent a verification code to ${identifier}`}</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form className='otp_form'>
            <div className='rf_form1'>
              <label className='label-form' htmlFor="otp">Enter OTP</label>
              <div className='rf_form11'>
                <Field
                  type="text"
                  id="otp"
                  name="otp"
                />
                <div>
                  <TbPasswordMobilePhone className='password-icon' />
                </div>
              </div>
              <ErrorMessage name="otp" component="div" className="error" />
            </div>
            <div className='otp_btn_div'>
              <button type="submit" className='sub_button' disabled={!formik.isValid || formik.isSubmitting}>
                Verify
              </button>
            </div>
            <div className='resend_div'>
              <p>Didn't receive the code?</p>
              {reSend ? (
                <h4 onClick={handleResend}>Resend</h4>
              ) : (
                <h5>{`Resend OTP in 0:${seconds}`}</h5>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Otp;
