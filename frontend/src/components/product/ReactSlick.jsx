import React from "react";
import Slider from "react-slick";

export default function ReactSlick() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider className="slider" {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div style={{backgroundColor:"red",height:"50vh",width:"100vw"}}>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  );
}