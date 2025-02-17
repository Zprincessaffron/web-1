import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { CartContext } from "../../context/CartContext";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../context/UserContext";
import ProgressBar from "./ProgressBar";
import "../../styles/CheckoutPage.css"; // Import the CSS file
import Navbar from "../../navbar/NavBar";
import SideBar from "../sidebar/SideBar";
import MenuSlider from "../sidebar/MenuSlider";
import Footer from "../../footer/Footer";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const CheckoutPage = () => {
  const { cartItems, removeItem, updateQuantity } = useContext(CartContext);
  const { user } = useContext(userContext);
  const [progressStep, setProgressStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    mobile: "",
    landmark: "",
    shipmentId: ""
  });
  const [orderID, setOrderID] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({
      ...shippingDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const totalPrice = calculateTotalPrice();
      const orderData = {
        shippingDetails,
        items: cartItems.map((item) => ({
          variantId: item.variantId,
          productId: item.productId,
          weight: item.weight,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
        })),
        total: totalPrice,
        user: user,
      };

      console.log(orderData)
      const response = await axios.post("/orders", orderData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data && response.data._id) {
        setOrderID(response.data._id);
        setProgressStep(2); // Move to the next step in the progress bar
        navigate("/payment", {
          state: { orderID: response.data._id, cartItems },
        });
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error placing order:", error);
    }
  };

  const handleIncrement = (id, weight) => {
    updateQuantity(id, weight, 1);
  };

  const handleDecrement = (id, weight) => {
    updateQuantity(id, weight, -1);
  };

  // Calculate Subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Calculate Total including delivery fee
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;
  const handleRemoveItem = (item) => {
    removeItem(item._id, item.weight); // Pass both id and weight
  };

  return (
    <>
    <Navbar/>
    <SideBar/>
    <MenuSlider/>
    <div className="checkout_main">
      <div className="ckeckout_div1">
        <div className="ckeckout_div2">
          <div className="ckeckout_div21">
            <div className="ckeckout_div211">
              <div><h1>Checkout</h1></div>
                <div><h2>Shipping Info</h2></div>
                <div className="checkout_forms">
                  <div className="checkout_single_form">
                    <label htmlFor="">Name:</label>
                    <input id="name"type="text" name="name" value={shippingDetails.name} onChange={handleChange} className="input" required />
                  </div>
                  <div className="checkout_single_form">
                    <label htmlFor="">Address:</label>
                    <textarea id="address"type="text" name="address" value={shippingDetails.address} onChange={handleChange}  required rows={5} ></textarea>
                  </div>
                 <div className="checkout_row_form">
                 <div className="checkout_single_form">
                    <label htmlFor="">Landmark:</label>
                    <input id="landmark"type="text"name="landmark" value={shippingDetails.landmark} onChange={handleChange}/>
                  </div>
                  <div className="checkout_single_form">
                    <label htmlFor="">ZIPcode:</label>
                    <input id="zip" type="text" name="zip" value={shippingDetails.zip} onChange={handleChange}  required/>
                  </div>
                 </div>

                 <div className="checkout_row_form">
                 <div className="checkout_single_form">
                    <label htmlFor="">City:</label>
                    <input   id="city"type="text" name="city"value={shippingDetails.city}onChange={handleChange} required />
                  </div>
                  <div className="checkout_single_form">
                    <label htmlFor="">Mobile:</label>
                    <input   id="mobile"type="tel" name="mobile" value={shippingDetails.mobile} onChange={handleChange} required/>
                  </div>
                 </div>

                 <div className="checkout_row_form">
                 <div className="checkout_single_form">
                    <label htmlFor="">State:</label>
                    <input id="state" type="text" name="state"  value={shippingDetails.state} onChange={handleChange}  required/>
                  </div>
                  <div className="checkout_single_form">
                    <label htmlFor="">Country:</label>
                    <input  id="country" type="text" name="country" value={shippingDetails.country}  onChange={handleChange}required/>
                  </div>
                 </div>
                 <div className="checkout_submit_button">
                  <button onClick={handleSubmit}>SUBMIT</button>

                 </div>


                </div>
            </div>
            <div className="ckeckout_div212">
              <div>
              <div className="checkout_summary">
                <h1>ORDER SUMMARY</h1>
              </div>
              <div className="checkoutpage_div">
                {console.log(cartItems)}
                {cartItems.map((item)=>(
                  <div className="checkout_cartitems" id={item._id}>
                    <div className="checkout_cartitems1">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="checkout_cartitems2">
                      <h2>{item.name}</h2>
                      <h3>{item.weight} Grams</h3>
                      <h4>₹ {item.price * item.quantity}</h4>
                      <button  onClick={() => handleRemoveItem(item)}>REMOVE</button>
                    </div>
                    <div className="checkout_cartitems3">
                      <div className="checkout_cartitems31">
                        <button   onClick={() => handleDecrement(item._id, item.weight)}><FaMinus/></button> {item.quantity}<button  onClick={() =>handleIncrement(item._id, item.weight)}><FaPlus/></button>
                      </div>
                      
                    </div>
                  
                  </div>
                ))}

              </div>
              <div className="checkout_price">
                <div>
                  <h2>Subtotal</h2> <h3>₹{subtotal.toFixed(2)}</h3>
                </div>
                <div>
                  <h2>Shipping</h2> <h3>₹{deliveryFee.toFixed(2)}</h3>
                </div>

              </div>
              <div className="checkout_total">
                <div >
                  <h2>ORDER TOTAL</h2> <h3>₹{total.toFixed(2)}</h3>

                </div>

              </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
    <Footer/>
   </>
  );
};

export default CheckoutPage;


// <div className="cp_maincon">
// <Navbar/>
// <SideBar/>
// <MenuSlider/>
// <div className="checkout-container">

// <h1 className="header">Checkout</h1>

// <div className="checkp_main">
//   {/* Shipping Details */}
//   <motion.form
//     onSubmit={handleSubmit}
//     className="shipping-form"
//     initial={{ x: "-100vw", opacity: 0 }}
//     animate={{ x: 0, opacity: 1 }}
//     transition={{ duration: 0.5 }}
//   >
//     <h2 className="shipping-form-title">Shipping Details</h2>
//     <div className="space-y-6 tracking-wider font-semibold">
//       {/* Form Fields */}
//       <div className="form-group">
//         <label htmlFor="name" className="label">
//           Name
//         </label>
//         <input
//           id="name"
//           type="text"
//           name="name"
//           value={shippingDetails.name}
//           onChange={handleChange}
//           className="input"
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="address" className="label">
//           Address
//         </label>
//         <input
//           id="address"
//           type="text"
//           name="address"
//           value={shippingDetails.address}
//           onChange={handleChange}
//           className="input"
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="landmark" className="label">
//           Landmark
//         </label>
//         <input
//           id="landmark"
//           type="text"
//           name="landmark"
//           value={shippingDetails.landmark}
//           onChange={handleChange}
//           className="input"
//         />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label htmlFor="city" className="label">
//             City
//           </label>
//           <input
//             id="city"
//             type="text"
//             name="city"
//             value={shippingDetails.city}
//             onChange={handleChange}
//             className="input"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="zip" className="label">
//             ZIP Code
//           </label>
//           <input
//             id="zip"
//             type="text"
//             name="zip"
//             value={shippingDetails.zip}
//             onChange={handleChange}
//             className="input"
//             required
//           />
//         </div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label htmlFor="state" className="label">
//             State
//           </label>
//           <input
//             id="state"
//             type="text"
//             name="state"
//             value={shippingDetails.state}
//             onChange={handleChange}
//             className="input"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="country" className="label">
//             Country
//           </label>
//           <input
//             id="country"
//             type="text"
//             name="country"
//             value={shippingDetails.country}
//             onChange={handleChange}
//             className="input"
//             required
//           />
//         </div>
//       </div>
//       <div>
//         <label htmlFor="mobile" className="label">
//           Mobile Number
//         </label>
//         <input
//           id="mobile"
//           type="tel"
//           name="mobile"
//           value={shippingDetails.mobile}
//           onChange={handleChange}
//           className="input"
//           required
//         />
//       </div>
//       <div className="checkout-btn">
//         <button type="submit" className="button-submit">
//           Save and Continue
//         </button>
//       </div>
//     </div>
//   </motion.form>

//   {/* Cart Items */}
//   <motion.div
//     className="cart-items"
//     initial={{ x: "100vw", opacity: 0 }}
//     animate={{ x: 0, opacity: 1 }}
//     transition={{ duration: 0.5 }}
//   >
//     {cartItems.length === 0 ? (
//       <p className="text-center text-gray-700">Your cart is empty.</p>
//     ) : (
//       <>
//         <h2 className="cart-items-title">Cart Items</h2>
//         <div className="flex-1">
//           <div className="space-y-6">
//             {cartItems.map((item) => (
//               <div key={item._id} className="cart-item">
//                 <img src={item.img} alt={item.name} />
//                 <div className="cart-item-info">
//                   <h3 className="cart-item-title">{item.name}</h3>
//                   <p className="cart-item-price">Price: ₹{item.price}</p>
//                   <div className="cart-item-controls">
//                     <button
//                       onClick={() =>
//                         handleDecrement(item.id, item.weight)
//                       }
//                       className="cart-item-button"
//                       disabled={item.quantity <= 1}
//                       aria-label="Decrement quantity"
//                     >
//                       -
//                     </button>
//                     <p className="cart-item-quantity"> {item.quantity}</p>
//                     <button
//                       onClick={() =>
//                         handleIncrement(item.id, item.weight)
//                       }
//                       className="cart-item-button"
//                       aria-label="Increment quantity"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <p className="cart-item-total">
//                     Total: ₹{item.price * item.quantity}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => handleRemoveItem(item)}
//                   className="remove-item-button"
//                   aria-label="Remove item"
//                 >
//                   <FaTrash />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Cart Summary */}
//         <div className="cart-summary-container">
//           <div className="cart-summary-row">
//             <p className="cart-summary-text">Subtotal</p>
//             <p className="cart-summary-value">₹{subtotal.toFixed(2)}</p>
//           </div>
//           <div className="cart-summary-row mt-2">
//             <p className="cart-summary-text">Delivery Fee</p>
//             <p className="cart-summary-value">
//               ₹{deliveryFee.toFixed(2)}
//             </p>
//           </div>
//           <div className="cart-summary-row mt-2">
//             <p className="cart-summary-text">Total</p>
//             <p className="cart-summary-value">₹{total.toFixed(2)}</p>
//           </div>
//         </div>
//       </>
//     )}
//   </motion.div>
// </div>
// {error && <p className="error-message">{error}</p>}
// </div>
// </div>