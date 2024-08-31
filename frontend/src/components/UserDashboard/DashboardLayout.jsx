import React, { useContext, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { userContext } from "../../context/UserContext";
import { FaUserCircle, FaShoppingBag, FaHistory, FaCog } from "react-icons/fa";
import '../../styles/UserDashboard.css';
import Navabar from '../../navbar/NavBar'
import axios from "axios";
import userpng from '../../images/user.png'
const DashboardLayout = () => {
  const { user } = useContext(userContext);
  const [ backChange,setBackChange]=useState('profile')

  if (!user) {
    return (
      <div className="dashboard-loading">
        <p>Loading user data...</p>
      </div>
    );
  }
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Fetch the user profile data from the backend
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/profile', {
          withCredentials: true, // To include cookies in the request
        });
        if (response.data) {
          setPersonalInfo(response.data);
        } else {
          console.error('No user data found.');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);
  return (
    <div className="dashboard-main">
      <Navabar/>
     <div className="dashboard-main2">
     <div className="dashboard-welcome">

      <div className="dashboard-welcome-png">
<img src={userpng} alt="" />
      </div>
      <div className="dashboard-welcome-hello">
        <h1>Hello,</h1>
        <h2>{personalInfo.name}</h2>
      </div>
        

      </div>
     <nav className="dashboard-nav">
       
        <ul className="dashboard-menu ">
          <li >
            <Link to="/dashboard/profile" onClick={()=>{setBackChange('profile')}} className={`dashboard-link ${backChange=='profile'?'true':""}`}>
              <FaUserCircle />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/orders" onClick={()=>{setBackChange('orders')}}  className={`dashboard-link ${backChange=='orders'?'true':""}`}>
              <FaShoppingBag />
              <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link to={`/dashboard/history/${user.id}`} onClick={()=>{setBackChange('history')}}  className={`dashboard-link ${backChange=='history'?'true':""}`}>
              <FaHistory />
              <span>History</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/settings" onClick={()=>{setBackChange('settings')}}  className={`dashboard-link ${backChange=='settings'?'true':""}`}>
              <FaCog />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
     </div>

      <main className="dashboard-content">
        <div className="content-box">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
