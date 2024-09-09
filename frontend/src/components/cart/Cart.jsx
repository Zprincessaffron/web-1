import React, { useContext, useEffect } from 'react'
import '../../styles/Cart.css'
import Navbar from '../../navbar/NavBar'
import Footer from '../../footer/Footer'
import emptycart from '../../images/emptycart.png'
import { useUserContext } from '../../context/MainContext'
import { userContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from "react-icons/ai";

function Cart() {
    const { setShowNav }=useUserContext()
    const { user }=useContext(userContext)
    const { addToCart, cartItems, updateQuantity, removeItem  } = useContext(CartContext);
    const navigate = useNavigate();


    useEffect(() => {
        setShowNav(true)
        
      }, []);
      




  const slideIn = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' },
  };

  const handleCheckout = () => {
    // Navigate to the checkout page
    navigate('/checkout');
  };

  const handleRemoveItem = (item) => {
    removeItem(item._id, item.weight); // Pass both id and weight
  };

  const handleQuantityChange = (item, delta) => {
    // Update quantity with delta (-1 or 1)
    updateQuantity(item.id, item.weight, delta);
  };
  return (
    <div>
        <Navbar/>
        <div className='cart_div1'>            
            <h1>BACK TO HOME</h1>                     
        </div>                                      
        {!user && (
            <div className='cart_div2'>
            <img src={emptycart} alt="" />
            <h1>YOUR CART IS EMPTY</h1>
            <p>Sign up to Add Items</p>
            <button>SIGN UP</button>
        </div>

          
        )}
        {cartItems.length== 0 &&(
              <div className='cart_div2'>
              <img src={emptycart} alt="" />
              <h1>YOUR CART IS EMPTY</h1>
              <p>Add Items</p>
              <button>Continue Shopping</button>
          </div>
            
        )}
        {cartItems.length>0 &&(
           <>
            {
                cartItems.map((item) => (
                    <div key={`${item.id}-${item.weight}`} className="cart-item">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="cart-item-image"
                      />
                      <div className="cart-item-details">
                        <h3 className="cart-item-name">{item.name}</h3>
                        <p className="cart-item-info">Weight: {item.weight}g</p>
                        <p className="cart-item-info">₹{item.price}</p>
                        <div className="cart-quantity-controls">
                          <button
                            className="cart-quantity-button"
                            onClick={() => handleQuantityChange(item, -1)}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            className="cart-quantity-button"
                            onClick={() => handleQuantityChange(item, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="cart-remove-button"
                        onClick={() => handleRemoveItem(item)}
                      >
                        <AiOutlineDelete />

                      </button>
                    </div>
                  ))
            }
           </>

        )}
        {cartItems.length > 0 && (
    <div className="mt-4">
      <button
        className="cart-checkout-button"
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  )}
        <Footer/>
    </div>
  )
}

export default Cart

