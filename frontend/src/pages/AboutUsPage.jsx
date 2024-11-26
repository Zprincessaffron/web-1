import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const images = ["/saffron1-img.jpg", "/Saffron2-img.jpg", "/saffron3-img.jpg"];

const textOverlay = ["குங்குமப்பூ", "Saffron", "Шафран"];

const quotes = [
  "மணமும் நெய்யும் தான் எங்களை அழகு செய்கின்றன.",
  "Saffron is the gold of spices.",
  "Шафран – золото пряностей.",
];

const verticalImages = [
  "/Saffron2-img.jpg",
  "/saffron3-img.jpg",
  "/saffron1-img.jpg",
];

const thirukkuralQuotes = [
  "அன்பினால் உலகம் வாழ்க; யாவரால் துணைவது துறை.",
  "Love makes the world thrive; it is the key to coexistence.",
  "Любовь делает мир процветающим; это ключ к сосуществованию.",
];

const AboutUsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [verticalIndex, setVerticalIndex] = useState(0);
  const [thirukkuralIndex, setThirukkuralIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVerticalIndex((prevIndex) => (prevIndex + 1) % verticalImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setThirukkuralIndex(
        (prevIndex) => (prevIndex + 1) % thirukkuralQuotes.length
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex">
      <div className="flex-1 relative overflow-hidden">
        {/* ZPrincessSaffron Text in Top-Left */}
        {/* <motion.div
          className="absolute top-14 left-4 text-white text-lg rounded-md border px-5 py-2 z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.p className='text-white tracking-[3px] font-bold uppercase'>
            ZPrincessSaffron
          </motion.p>
        </motion.div> */}

        {/* Famous Quotes in Top-Right */}
        <motion.div
          className="absolute top-14 right-4 text-white text-md rounded-md border px-5 py-2 font-medium tracking-[1px] uppercase z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          key={currentIndex}
        >
          <motion.p className="text-white">{quotes[currentIndex]}</motion.p>
        </motion.div>

        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: currentIndex === index ? 1 : 0,
              scale: currentIndex === index ? 1 : 1.1,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <img
              src={image}
              alt={`Saffron ${index + 1}`}
              className="w-full h-full object-cover filter brightness-50"
            />

            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.h1
                className="text-white uppercase text-5xl tracking-[7px] font-medium drop-shadow-lg"
                initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 15 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                {textOverlay[index]}
              </motion.h1>
            </div>
          </motion.div>
        ))}

        {/* Optional Dots to show active slide */}
        <div className="absolute bottom-4 w-full flex justify-center space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-yellow-500" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Mini Vertical Image Slider on the Right */}
      <div className="absolute mt-14 top-14 right-4 w-[25%] h-[75%] flex flex-col items-center justify-center">
        {verticalImages.map((image, index) => (
          <motion.div
            key={index}
            className="w-full h-1/3 overflow-hidden shadow-black drop-shadow-xl shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: verticalIndex === index ? 1 : 0,
              scale: verticalIndex === index ? 1 : 0.9,
            }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={image}
              alt={`Vertical Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Thirukkural Section in Bottom-Left */}
      <div className="absolute bottom-4 left-4 text-white z-10 border px-5 py-2 overflow-hidden rounded-md">
        <motion.p
          className="text-sm tracking-wider my-1 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          key={thirukkuralIndex}
        >
          {thirukkuralQuotes[thirukkuralIndex]}
        </motion.p>
      </div>
    </div>
  );
};

export default AboutUsPage;
