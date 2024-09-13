import React, { useEffect, useState, useRef, useContext } from 'react';
import { useFetcher, useLocation } from 'react-router-dom';
import '../../styles/ProductDetails.css'
import StarProduct from './StarProduct';
import { LuChevronRight } from "react-icons/lu";
import NavBar from '../../navbar/NavBar'
import SideBar from '../sidebar/SideBar'
import MenuSlider from '../sidebar/MenuSlider'
import Availability from './Availability';
import { CartContext } from '../../context/CartContext';
import ProductDescription from './ProductDescription';
import Gifting from './Gifting';
import { useUserContext } from '../../context/MainContext';
import SelectGrams from './SelectGrams';
import { useNavigate } from 'react-router-dom';
const ProductDetails = () => {
  const { setMenuSlider,setSideBar,setShowNav }=useUserContext()
  const { addToCart, cartItems } = useContext(CartContext);
  const navigate =useNavigate()

  const location = useLocation();
  const { product } = location.state;
  const [isDivAtBottom, setIsDivAtBottom] = useState(true);
  const divRef = useRef(null);
  const [availability,setAvailability] = useState(false)
  const [pDetails,setpDetails] = useState(false)
  const [gifting,setGifting] = useState(false)
const [ showGram,setShowGram]= useState(false)
const [btnDissable,setBtnDissable]=useState(false)

  const handleScroll = () => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      const divBottom = rect.bottom;
      const windowBottom = window.innerHeight;

      // When div bottom hits window bottom and we're scrolling down
      if (divBottom <= windowBottom) {
        setIsDivAtBottom(false);
      }

      // When div bottom goes back up and we're scrolling up
      if (divBottom > windowBottom) {
        setIsDivAtBottom(true);
      }
    }
  };
 useEffect(() => {
if(cartItems){
  const filteredItem = cartItems.filter(item => item._id== product._id.toString());
  if(filteredItem.length>0){
    
  if(filteredItem[0].quantity>0){
    setBtnDissable(true)
   }
   
  }
}
 }, [cartItems])
 
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

useEffect(() => {
  setMenuSlider(false)
  setSideBar(false)
  setShowNav(true)
}, [])

////ADD TO CART////
const handleAddToCart = () => {
      const productToAdd = {
          _id: product._id, 
          name: product.name,
          price: product.price,
          weight: product.weight,
          quantity: 1, // Use the updated quantity,
          image:product.image
      };
      addToCart(productToAdd);

};
////BUY NOW////
const handleBuyNow = () => {
  handleAddToCart();
  navigate('/checkout');
};


  return (

    
   <>
   <NavBar/>
   <SideBar/>
   <SelectGrams product={product}showGram={showGram} setShowGram={setShowGram} grams={product.weight}/>
   <MenuSlider/>
   <Gifting gifting={gifting} setGifting={setGifting}/>
   <Availability name={product.name} stockk={product.stock} price={product.price} state={availability} setState={setAvailability}/>
   <ProductDescription description={product.fullProduct.description} content={product.fullProduct.content} state={pDetails} setSate={setpDetails}/>
    <div>
      <div className="product-details">
      <div className='pd-left'>
        <div className='pd-left-1'></div>
        <div  className='pd-left-2'></div>
        <div className='pd-left-3'></div>
        <div ref={divRef} className='pd-left-4'></div>
      </div>
      <div className={`pd-right ${isDivAtBottom?"":"true"}`}> 
       <div className='pd-rightdetails'>
       <h1>{product.name}</h1>
      {/* <p>{product.fullProduct.description}</p> */}
      <p>₹{product.price}</p>
      <h5 className='font-tax'>(M.R.P incl. of all taxes)</h5>
      <p>{product.weight} Gramssssssssssssssss</p>
      {/* <h4>Product Features:</h4>
      <p>Origin: {product.fullProduct.productFeatures.origin}</p>
      <p>Categories: {product.fullProduct.category.join(', ')}</p> */}
      <div className='pd-star-rating'>
      <StarProduct starValue={product.fullProduct.rating}/>
      </div>
      {/* <div className='change-grams' onClick={()=>{setShowGram(true)}}>
        <h2>Grams</h2> <div><h2>2 Grams / 5 Grams 
        </h2> <h3><LuChevronRight /></h3></div>

      </div> */}
      <div className='pd-button'>
       {btnDissable?(<><button className='item_added'>Item Added</button>
       </>):( <button onClick={handleAddToCart}>ADD TO CART</button>)}
       
        <button onClick={handleBuyNow}>BUY NOW</button>

      </div>
      <div className='pd-right_belowitems'>
        <h3 onClick={()=>{setAvailability(true)}}>Check availability in store</h3>
        <h3  onClick={()=>{setpDetails(true)}}>Product details</h3>
        <h3 >Delivery & returns</h3>
        <h3 onClick={()=>{setGifting(true)}} >Gifting</h3>

      </div>
       </div>
      </div>
    </div>
    <div className='pd-review-box'>

    </div>
    </div>
   </>
  );
};

export default ProductDetails;
