import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import bot from "../../images/pngegg.png";

const RecommenderTest = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [scrollStep, setScrollStep] = useState(0); // Tracks the scroll step (0, 1, 2 for three slides)

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     const windowHeight = window.innerHeight;
  //     const newScrollStep = Math.floor(scrollPosition / windowHeight);

  //     // Update scroll step if changed
  //     if (newScrollStep !== scrollStep && newScrollStep <= 2) {
  //       setScrollStep(newScrollStep);

  //       // Determine new position and transformation based on scrollStep
  //       const isOnLeft = newScrollStep % 2 === 1; // Left if on odd step
  //       const newTransform = isOnLeft ? 'scaleX(1)' : 'scaleX(-1)';
  //       const newPosition = isOnLeft ? { left: 0, right: 'auto', marginLeft: '-30px' } : { right: 0, left: 'auto', marginRight: '-30px' };

  //       // Animate the transition
  //       controls.start({
  //         opacity: 0, // Fade out before switching sides
  //         transition: {
  //           duration: 0.5,
  //           ease: "easeInOut",
  //         },
  //       }).then(() => {
  //         controls.start({
  //           ...newPosition, // Apply the new left or right position
  //           opacity: 1, // Fade back in after moving
  //           transition: {
  //             duration: 0.5,
  //             ease: "easeInOut",
  //           },
  //           transitionEnd: {
  //             transform: newTransform, // Apply the new transformation
  //           }
  //         });
  //       });
  //     }
  //   };

  //   // Trigger the handleScroll function initially to set the correct position on page load
  //   handleScroll();

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [controls, scrollStep]);

  //line 11 - 54 temp cmted 

  return (
    <>
    <div className="main-bot-container">
    <motion.div
        className="recommender-test"
        onClick={() => navigate("/chatbot")}
        // animate={controls}  temp cmted
        initial={{ right: 0, left: 'auto', opacity: 1 }} // Initially on the right side
      >
         
      </motion.div>
      {/* <p className={`bot-text ${scrollStep % 2 === 0 ? "right-side" : "left-side"}`}>
         Hello, This is Zyra
      </p> */} 
      {/* temp comented */}
      
      <p className={`bot-text left-side}`}>
         Hello, This is Zyra
      </p>
    </div>
      
    </>
  );
};

export default RecommenderTest;
