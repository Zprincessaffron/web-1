import React, { useState } from 'react';
import '../../styles/OurProducts.css';
import ourproductback from '../../images/ourproductsback.jpeg';
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function OurProducts({ setFinalProduct }) {
  const navigate = useNavigate();
  const [mouse, setMouse] = useState(false);

  function handleMouse() {
    setMouse(true); 
  }
  
  function handleLeave() {
    setMouse(false);
  }

  function handleClick() {
    setFinalProduct(true);

    // Check if the user has already visited the chatbot
    const hasVisited = localStorage.getItem("hasVisitedChatBot");

    if (!hasVisited) {
      // Set the flag so the chatbot only opens once per user
      localStorage.setItem("hasVisitedChatBot", "true");

      // Navigate to the chatbot with a 3-second delay
      setTimeout(() => {
        navigate("/chatbot");
      }, 2000); 
    } 
  }

  return (
    <div className='unveil_main' style={{ backgroundImage: `url(${ourproductback})` }}>
      <div className='unveil_div1'>
        <h1>OUR PRODUCTS</h1>
        <div className='arrow_div'>
          <button style={{marginTop:"2rem"}}
            onClick={handleClick}
            onMouseEnter={handleMouse}
            onMouseLeave={handleLeave}
          >
            DISCOVER NOW <FaArrowRightLong className={`arrow_txt ${mouse ? "true" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default OurProducts;
