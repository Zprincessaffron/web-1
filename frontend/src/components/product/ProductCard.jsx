import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { products } from "../../data/Productdata.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaShoppingCart } from 'react-icons/fa'; // Import Cart icon
import CartModal from "./CartModel";
import { motion } from "framer-motion";
import { CartContext } from "../../context/CartContext";
import CartIcon from "./CartIcon.jsx";
import { userContext } from "../../context/UserContext.jsx";

const ProductCard = () => {
  
  const { user } = useContext(userContext);
  const { cartItems, addToCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const viewProductDetail = (id) => {
    navigate(`/product/${id}`);
  };

  const getDefaultQuantity = (product) => {
    if (user?.role === "wholesaler") {
      if (product.weight === 2) return 5;
      if (product.weight === 5) return 2;
    }
    return 1; // Default quantity for regular users
  };
 
  const handleIncrement = (product, e) => {
    e.stopPropagation(); // Prevent click event from bubbling up
    setQuantities((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || getDefaultQuantity(product)) + 1,
    }));
  };

  const handleDecrement = (product, e) => {
    e.stopPropagation(); // Prevent click event from bubbling up
    setQuantities((prev) => {
      const defaultQty = getDefaultQuantity(product);
      return {
        ...prev,
        [product.id]: Math.max((prev[product.id] || defaultQty) - 1, defaultQty),
      };
    });
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Prevent click event from bubbling up
    const defaultQty = getDefaultQuantity(product);
    addToCart({ ...product, quantity: quantities[product.id] || defaultQty });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    customPaging: (i) => (
      <div className="w-20 h-1 mx-1 relative my-5">
        <div className="progress-bar"></div>
      </div>
    ),
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <CartIcon itemCount={cartItems.length} onClick={handleOpenModal} />
      <CartModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <h2 className="text-center text-3xl font-bold mb-10">OUR PRODUCTS</h2>
      <Slider {...settings} className="product-slider">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="py-10 px-4"
            initial={{ opacity: 0.5, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="relative mb-4 max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 transform transition-transform cursor-pointer"
              onClick={() => viewProductDetail(product.id)}
            >
              <div className="relative group">
                <a href="#">
                  <img
                    className="w-full h-64 object-cover rounded-lg"
                    src={product.img}
                    alt="product image"
                  />
                </a>
                <div className="absolute inset-0 bg-gray-900 bg-opacity-75 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center rounded-t-lg">
                  <div className="p-4">
                    <h5 className="text-xl font-bold mb-2">{product.name}</h5>
                    <p className="text-sm">{product.description}</p>
                    <p className="text-sm mt-2">Origin: {product.origin}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <a href="#">
                  <h5 className="justify-between text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    {product.name}
                    <div className="border p-2 rounded-full bg-red-500 mt-2 hover:bg-red-600 transition-colors duration-300">
                      <FaShoppingCart
                        className="text-white text-xl cursor-pointer"
                        onClick={(e) => handleAddToCart(product, e)}
                      />
                    </div>
                  </h5>
                </a>
                <div className="flex items-center mt-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-300"
                          : "text-gray-300"
                      } dark:text-gray-600`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ₹{product.price} / <span className="font-normal text-md">{product.weight}g</span>
                  </span>
                  
                  <div className="flex items-center">
                    <button
                      className="text-white bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2"
                      onClick={(e) => handleDecrement(product, e)}
                    >
                      -
                    </button>
                    <span className="text-lg font-medium mx-2">{quantities[product.id] || getDefaultQuantity(product)}</span>
                    <button
                      className="text-white bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2"
                      onClick={(e) => handleIncrement(product, e)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
      <div className="flex flex-col items-center mt-10">
        <p className="text-center text-lg font-medium text-gray-700 mb-3">
          Click this button to know your matching products
        </p>
        <button
          className="bg-red-500 text-white hover:bg-red-600 px-6 py-3 rounded-lg shadow-lg transition duration-300"
          onClick={() => navigate("/chatbot")}
        >
          Ask Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
