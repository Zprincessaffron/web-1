import React, { useState } from "react";
import Slider from "react-slick";
import { GiFarmTractor } from "react-icons/gi";
import { LuFlower2 } from "react-icons/lu";
import { FaFemale, FaBox } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import saffron1 from "../../assets/Images/saffron-1.jpg";
import saffron2 from "../../assets/Images/saffron-2.jpg";
import saffron3 from "../../assets/Images/saffron-3.jpg";
import saffron4 from "../../assets/Images/saffron-4.jpg";

const ProductHistory = () => {
  const [selectedSection, setSelectedSection] = useState(0);

  const handleIconClick = (index) => {
    setSelectedSection(index);
    sliderRef.current.slickGoTo(index); // Update slider position to match the selected section
  };

  const sliderRef = React.useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Enable default arrows
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center relative">
        {/* Roadmap Section */}
        <div className="flex flex-row items-center space-x-4 md:space-x-6 relative w-full md:w-1/4">
          {/* Connecting Line */}
          <div className="hidden md:block absolute h-1 w-[200px] bg-gray-300 left-8 top-1/2 transform -translate-y-1/2 z-[-1]"></div>
          <button
            className={`p-2 rounded-full ${selectedSection === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleIconClick(0)}
          >
            <GiFarmTractor size={24} />
          </button>
          <button
            className={`p-2 rounded-full ${selectedSection === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleIconClick(1)}
          >
            <LuFlower2 size={24} />
          </button>
          <button
            className={`p-2 rounded-full ${selectedSection === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleIconClick(2)}
          >
            <FaBox size={24} />
          </button>
          <button
            className={`p-2 rounded-full ${selectedSection === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleIconClick(3)}
          >
            <FaFemale size={24} />
          </button>
        </div>

        {/* Image Slider Section */}
        <div className="w-full md:w-3/4 relative">
          <Slider ref={sliderRef} {...settings}>
            <div className="p-4">
              <img src={saffron1} alt="" className="w-full h-80 object-cover" />
            </div>
            <div className="p-4">
              <img src={saffron2} alt="" className="w-full h-80 object-cover" />
            </div>
            <div className="p-4">
              <img src={saffron3} alt="" className="w-full h-80 object-cover" />
            </div>
            <div className="p-4">
              <img src={saffron4} alt="" className="w-full h-80 object-cover" />
            </div>
          </Slider>
          {/* Custom Arrow Styles */}
          <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-2 md:px-4">
            <SamplePrevArrow />
            <SampleNextArrow />
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom arrow components with TailwindCSS styling
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" , borderRadius: "50px", right:0 }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" , borderRadius: "50px", left:0 }}
      onClick={onClick}
    />
  );
}

export default ProductHistory;
