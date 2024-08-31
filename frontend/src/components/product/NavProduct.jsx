import React from 'react';
import '../../styles/NavProduct.css'
import bluredblue from '../../images/bluredblue.jpg'
import product3 from '../../images/product3.jpg'
function NavProduct() {
  return (
    <div className='np_main' style={{backgroundImage:`url(${bluredblue})`}}>
      <div className='np_div'>

        <div className='np_div1'>Z PRINCES SAFFRON</div>
        <div className='np_div2'>
          <div className='np_div21'>
            <h1>DESCRIPTION</h1>
            <p>High-quality saffron threads handpicked from the finest flowers. Premium Quality, Exquisite Flavor: Discover the luxuryof Indian Kashmiri Saffron, renowned for its vibrant color, delicate aroma, and unparalleled flavor. Hand-harvestedfrom the lush fields of Kashmir, our saffron is the epitome of quality and authenticity.Each strand is carefully selected to ensure you experience only the finest.</p>
          </div>
          <div className='np_div22'>
            <img src={product3} alt="" />

          </div>
          <div className='np_div23'></div>
        </div>

      </div>

    </div>
  )
}

export default NavProduct