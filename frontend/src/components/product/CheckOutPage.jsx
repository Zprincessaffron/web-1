import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { CartContext } from "../../context/CartContext";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../context/UserContext";

const CheckoutPage = () => {
  const { cartItems, removeItem } = useContext(CartContext);
  const { user } = useContext(userContext);
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    mobile: "",
    landmark: "",
  });
  const [orderID, setOrderID] = useState(null); // State to store the order ID

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

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const totalPrice = calculateTotalPrice();
  
      const orderData = {
        shippingDetails,
        items: cartItems,
        total: totalPrice,
        user: user,
      };
  
      const response = await axios.post("/orders", orderData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        // Ensure the response contains the _id
        if (response.data && response.data._id) {
          setOrderID(response.data._id);
         
          navigate("/payment", {
            state: { orderID: response.data._id, cartItems },
          });
        } else {
          throw new Error("Order ID not found in response");
        }
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error placing order:", error);
    }
  };
  

  return (
    <div className="container mx-auto my-10 p-5 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Checkout</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Shipping Details */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 flex-1"
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl text-center font-semibold mb-6 text-gray-900">
            Shipping Details
          </h2>
          <div className="space-y-6">
            {/* Form Fields */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={shippingDetails.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
                required
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                name="address"
                value={shippingDetails.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
                required
              />
            </div>
            <div>
              <label
                htmlFor="landmark"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Landmark
              </label>
              <input
                id="landmark"
                type="text"
                name="landmark"
                value={shippingDetails.landmark}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="city"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={shippingDetails.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  ZIP Code
                </label>
                <input
                  id="zip"
                  type="text"
                  name="zip"
                  value={shippingDetails.zip}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="state"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  name="state"
                  value={shippingDetails.state}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  name="country"
                  value={shippingDetails.country}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                name="mobile"
                value={shippingDetails.mobile}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 text-gray-900"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Save and Continue
              </button>
            </div>
          </div>
        </motion.form>

        {/* Cart Items */}
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 flex-1 flex flex-col"
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-700">Your cart is empty.</p>
          ) : (
            <>
              <h2 className="text-2xl text-center font-semibold mb-6 text-gray-900">
                Cart Items
              </h2>
              <div className="flex-1">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center border-b pb-4 mb-4 relative"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-gray-700">Price: ₹{item.price}</p>
                        <p className="text-gray-700">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-gray-700">
                          Total: ₹{item.price * item.quantity}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute lg:top-10 lg:right-2 right-0 text-red-500 hover:text-red-700 transition duration-200"
                        aria-label="Remove item"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-end border-t border-gray-200 pt-4 text-lg font-semibold text-gray-900">
                <p>Total: ₹{calculateTotalPrice()}</p>
              </div>
            </>
          )}
        </motion.div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default CheckoutPage;
