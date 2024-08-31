// src/RegisterForm.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';
import { useUserContext } from '../../context/MainContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Snackbar } from '@mui/material';
const RegisterForm = () => {
  const { navOtp,setNavOtp,userEmail,setUserEmail }=useUserContext()
  const [opendata,setOpendata]=useState(true)
  const [loading,setLoading]=useState(false)
  const initialValues = {
    name: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setUserEmail(values.email)
    setLoading(true)
    try {
      const response = await axios.post('/register', values);
      console.log('Registration Successful', response.data);
      toast('Registration Successful', response.data)
      // Handle successful registration, e.g., redirect to login page
      setNavOtp(true)
      setLoading(false)

      resetForm();

    } catch (error) {
      console.error('Registration Error', error.response.data);
      toast(error.response.data.msg)
      // Handle registration error
    } finally {
      setSubmitting(false);
      setLoading(false)

    }
  };
  return (
    <div className='rform_main'>
      <Snackbar opendata={opendata}/>
      <h1>CREATE ACCOUNT</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form className='rform_form'>
            <div className='rf_form1'>

              <label className='label-form' htmlFor="name">Name</label>
              <div className='rf_form11'>

              <Field
                type="text"
                id="name"
                name="name"
              />
              <div>
                <AiOutlineUser/>
              </div>
              </div>
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className='rf_form1'>
              <label htmlFor="email">Email</label>
              <div className='rf_form11'>
              <Field
                type="email"
                id="email"
                name="email"
              />
              <div>
                <MdOutlineMailOutline/>
              </div>
              
              </div>
              <ErrorMessage name="email" component="div" className="error" />
              

            </div>

            <div className='rf_form1'>
              <label htmlFor="password">Password</label>
              <div className='rf_form11'>
              <Field
                type="password"
                id="password"
                name="password"
              />
              <div>
                <RiLockPasswordLine/>
              </div>
              </div>
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" className='sub_button' disabled={!formik.isValid || formik.isSubmitting}>
              {loading?( <FontAwesomeIcon icon={faSpinner} spin />):"Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
