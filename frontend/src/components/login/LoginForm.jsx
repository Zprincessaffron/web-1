// src/RegisterForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import axios from 'axios';
import { useUserContext } from '../../context/MainContext';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const { navOtp,setNavOtp,userEmail,setUserEmail }=useUserContext()
  const initialValues = {
    email: '',
    password: ''
  };
  const navigate =useNavigate()
  
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setUserEmail(values.email)
    try {
      const response = await axios.post('/login', values);
      console.log('Registration Successful', response.data);
      // Handle successful registration, e.g., redirect to login page
      resetForm();
      navigate('/')


    } catch (error) {
      console.error('Registration Error', error.response.data);
      // Handle registration error
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className='rform_main'>
      <h1> Welcome Back!</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form className='rform_form'>

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
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
