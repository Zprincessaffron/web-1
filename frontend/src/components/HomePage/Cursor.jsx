import React, { useEffect, useRef, useState } from 'react'
import { useUserContext } from '../../context/MainContext'


function Cursor() {
  const { CustomCuser,setCustomCuser,isMouse,setIsMouse,isMobile } =useUserContext()
  const cursorRoundedRef = useRef(null);
  const cursorPointedRef = useRef(null);

  useEffect(() => {
    // Function to move the cursor
    const moveCursor = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Update the transform of both cursor elements
      if (cursorRoundedRef.current) {
        cursorRoundedRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      if (cursorPointedRef.current) {
        cursorPointedRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    // Add event listener on component mount
    window.addEventListener('mousemove', moveCursor);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div style={{
        left: `${position.x}px`,
        top: `${position.y}px`}} className='containerv'>
    <div className='circle'>Z
    </div>
  </div>
  )
}

export default Cursor