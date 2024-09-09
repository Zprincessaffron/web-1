// import React, { useState } from 'react';
// import axios from 'axios';
 
// const Login = () => {
//   const [step, setStep] = useState(1); // Step 1: Enter email/phone, Step 2: Enter OTP
//   const [emailOrPhone, setEmailOrPhone] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [role, setRole] = useState('');

//   const handleEmailOrPhoneChange = (e) => {
//     setEmailOrPhone(e.target.value);
//   };

//   const handleOtpChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const handleSendOtp = async () => {
//     try {
//       const response = await axios.post('/api/send-otp', { emailOrPhone });
//       setRole(response.data.role);
//       setStep(2);
//     } catch (err) {
//       setError('Failed to send OTP. Please try again.');
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       const response = await axios.post('/api/verify-otp', { emailOrPhone, otp });
//       // Redirect to the appropriate dashboard based on the role
//       switch (role) {
//         case 'user':
//           window.location.href = '/user-dashboard';
//           break;
//         case 'marketer':
//           window.location.href = '/marketer-dashboard';
//           break;
//         case 'wholesaler':
//           window.location.href = '/wholesaler-dashboard';
//           break;
//         case 'admin':
//           window.location.href = '/admin-dashboard';
//           break;
//         default:
//           setError('Invalid role.');
//       }
//     } catch (err) {
//       setError('Invalid OTP. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-4 text-gray-800">Login</h1>
//         {step === 1 ? (
//           <>
//             <input
//               type="text"
//               placeholder="Enter Email or Phone"
//               value={emailOrPhone}
//               onChange={handleEmailOrPhoneChange}
//               className="w-full p-2 mb-4 border rounded-lg"
//             />
//             <button
//               onClick={handleSendOtp}
//               className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
//             >
//               Send OTP
//             </button>
//           </>
//         ) : (
//           <>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={handleOtpChange}
//               className="w-full p-2 mb-4 border rounded-lg"
//             />
//             <button
//               onClick={handleVerifyOtp}
//               className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
//             >
//               Verify OTP
//             </button>
//           </>
//         )}
//         {error && <p className="mt-4 text-red-500">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   const loginUser = async (e) => {
//     e.preventDefault();
//     const { email, password } = data;

//     try {
//       const { data: response } = await axios.post("/login", { email, password });

//       if (response.error) {
//         toast.error(response.error);
//       } else {
//         // Clear input fields
//         setData({ email: "", password: "" });

//         // Store the token (you can store it in localStorage or cookies)
//         localStorage.setItem("token", response.token);

//         // Show success message
//         toast.success("Login successful");
//         // Navigate based on role and include marketer ID if the role is 'marketer'
//         const { role, id } = response;
//         console.log(response);
//         if (role === "admin") {
//           navigate("/admin/dashboard");
//           window.location.reload();
//         } else if (role === "marketer" && id) {
//           navigate(`/marketer-dashboard/${id}`);
//           window.location.reload();
//         } else if (role === "wholesaler") {
//           navigate("/");
//           window.location.reload();
//         } else {
//           navigate("/");
//           window.location.reload();
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("An error occurred during login.");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={loginUser}>
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           placeholder="Type your email"
//           value={data.email}
//           onChange={(e) => setData({ ...data, email: e.target.value })}
//           required
//         />
//         <br />
//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           id="password"
//           placeholder="Type your password"
//           value={data.password}
//           onChange={(e) => setData({ ...data, password: e.target.value })}
//           required
//         />
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from 'react'
import backvideo from '../../images/backvideo.mp4'
import saffrom_img from "../../images/saffron_img.png"
import '../../styles/Register.css'
import { useUserContext } from '../../context/MainContext'
import { useNavigate } from 'react-router-dom'
import RegisterForm from './RegisterForm'
import Otp from './Otp'
import back_register from '../../images/back_register.jpg'
import LoginForm from './LoginForm'
function Login() {
  const { navOtp,setNavOtp,isMobile }=useUserContext()
  
  const [position,setPosition]=useState(true) 
  const [positionForm,setPositionForm]=useState('login') 

  const navigate = useNavigate()
  
  function handleContinue(){
    navigate('/user-register')
  }
 function handlePosition(){
  setPosition(!position)
  if(positionForm=="login"){
    setPositionForm('register')
  }
  if(positionForm=="register"){
    setPositionForm('login')
  }
 }
  return (

    <div >
    <div className="video-container" >
      <video autoPlay loop muted>
        <source src={backvideo} type="video/mp4" />

      </video>
     {isMobile?(
 <div className='Landermain'>
 <div className='lander_div'>
 
  <div className={`lander_div2`}>
      {positionForm=='register' &&(<>
    {navOtp?(<Otp/>):( <>
        <RegisterForm/>
        <div className='newuser'>
          <h1>Existing User?</h1>
          <button onClick={()=>{setPositionForm('login')}} >Register</button>
        </div>
       </>)}
    </> )}
       {positionForm=='login' &&(
       <>
        <LoginForm/>
        <div className='newuser'>
          <h1>Existing User?</h1>
          <button onClick={()=>{setPositionForm('register')}} >Register</button>
        </div>
       </>
      )}
    

  </div>
 </div>
</div>

     ):(
       <div className='Landermain'>
       <div className='lander_div'>
        <div className={`lander_div1 ${position?'true':""}`} >
          <div className='lander_div11'>
              <p>            zprincesssaffron
              </p>
              <h5> High quality saffron, best flavour and aroma for our products <br/>100% natural products to reach out customers.</h5>
          </div>
          <div className='lander_div12'>
            <img src={saffrom_img} alt="" />
          </div>
         {!navOtp?(
           <div className='lander_div13'>
           {positionForm=='login' &&(
             <p>New User?</p>
           )}
            {positionForm=='register' &&(
             <p>Existing User?</p>
           )}
           <button onClick={handlePosition}> {positionForm=='login'?('register'):null}  {positionForm=='register'?('login'):null}</button>

         </div>
         ):(null)}

        </div>
       
        <div className={`lander_div2 ${position?'true':""}`}>
            {positionForm=='register' &&(<>
          {navOtp?(<Otp/>):(<RegisterForm/>)}
          </> )}
             {positionForm=='login' &&(
              <LoginForm/>
            )}
          

        </div>
       </div>
      </div>
     )}
    </div>

  </div>
  )
}

export default Login