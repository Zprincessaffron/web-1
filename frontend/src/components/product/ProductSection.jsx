import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../../data/Productdata.js";
import CartIcon from "./CartIcon";
import CartModal from "../../components/product/CartModel.jsx";
import { motion, useAnimation } from "framer-motion";
import { CartContext } from "../../context/CartContext"; // Adjust the path as needed
import { userContext } from "../../context/UserContext.jsx";
import productBG from "../../assets/Images/productbg.jpeg";

const ProductSection = () => {
  const { user } = useContext(userContext);
  const { id } = useParams();
  const productId = parseInt(id, 10); // Ensure ID is a number

  // Find the product
  const product = products.find((p) => p.id === productId);

  if (!product) return <div>Product not found</div>;

  const { addToCart, cartItems, updateQuantity } = useContext(CartContext); // Get addToCart, cartItems, and updateQuantity from CartContext

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainImage, setMainImage] = useState(product.img);
  const [extraImages, setExtraImages] = useState(product.extraImages || []);
  const [quantity, setQuantity] = useState(1);

  // Set default quantity based on user role and product pack size
  useEffect(() => {
    if (user && user.role === 'wholesaler') {
      if (product.weight === 2) {
        setQuantity(5); // Default quantity for 2g pack
      } else if (product.weight === 5) {
        setQuantity(2); // Default quantity for 5g pack
      }
    }
  }, [user, product.weight]);

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      updateQuantity(existingItem, quantity);
    } else {
      addToCart({ ...product, quantity });
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleImageClick = (image) => {
    const newExtraImages = extraImages.map((img) =>
      img === image ? mainImage : img
    );
    setExtraImages(newExtraImages);
    setMainImage(image);
  };

  const handleQuantityChange = (amount) => {
    // Prevent decrementing below default quantity for wholesalers
    if (user && user.role === 'wholesaler') {
      const defaultQuantity = product.weight === 2 ? 5 : 2;
      if (amount > 0) {
        setQuantity((prevQuantity) => prevQuantity + amount);
      } else if (amount < 0) {
        setQuantity((prevQuantity) => Math.max(prevQuantity + amount, defaultQuantity));
      }
    } else {
      // Normal user logic: decrement and increment as usual
      setQuantity((prevQuantity) => Math.max(prevQuantity + amount, 1));
    }
  };

  // Animation controls
  const controlsReview = useAnimation();
  const controlsRelated = useAnimation();

  // Scroll effect
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Change opacity based on scroll position
    if (scrollY > 100) {
      controlsReview.start({ opacity: 1, y: 0 });
      controlsRelated.start({ opacity: 1, y: 0 });
    } else {
      controlsReview.start({ opacity: 0, y: 20 });
      controlsRelated.start({ opacity: 0, y: 20 });
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="container mx-auto px-4 py-6 bg-fixed bg-center bg-repeat"
      style={{ backgroundImage: `url(${productBG})` }} 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <CartIcon itemCount={cartItems.length} onClick={handleOpenModal} />
      <CartModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        updateQuantity={updateQuantity}
      />
      <div className="flex flex-col md:flex-row shadow-lg rounded-lg  bg-opacity-90 p-4">
        {/* Main Image */}
        <div className="md:w-1/2 p-4 flex justify-center">
          <motion.img
            src={mainImage}
            alt={product.name}
            className="w-3/4 h-full object-cover rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
        {/* Product Details */}
        <div className="md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4 text-saffron">
            {product.name}
          </h1>
          <p className="text-lg mb-4 text-gray-700">{product.description}</p>
          <p className="text-md mb-4 text-gray-600">{product.content}</p>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2 text-saffron">
              Product Features
            </h2>
            <ul className="list-disc list-inside ml-4">
              {Object.entries(product["Product Features"]).map(
                ([key, value]) => (
                  <li key={key} className="mb-1 text-gray-700">
                    <strong className="text-saffron">{key}:</strong> {value}
                  </li>
                )
              )}
            </ul>
          </div>
          <p className="text-md mb-4 text-gray-700">
            Stock: {product.stock} items available
          </p>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-300"
                    : "text-gray-300"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <p className="text-xl font-bold mb-4 text-saffron">
            ₹{product.price} / <span className="font-normal text-md">{product.weight}g</span>
          </p>
          <div className="flex items-center mb-4">
            <button
              className="text-white bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            <span className="text-lg font-medium mx-2">{quantity}</span>
            <button
              className="text-white bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
          <div className="flex items-center mb-4">
            <button
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              onClick={handleOpenModal}
            >
              View Cart
            </button>
          </div>
        </div>
      </div>

      {/* Extra Images */}
      <div className="mt-4 flex overflow-x-auto space-x-4 pb-4">
        {extraImages.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`Extra ${index + 1}`}
            className="w-32 h-32 object-cover cursor-pointer rounded-lg shadow-lg"
            onClick={() => handleImageClick(image)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Public Reviews Section */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={controlsReview}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-saffron text-white">
          Customer Reviews
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
            <p className="text-sm mb-2">⭐⭐⭐⭐⭐</p>
            <p className="text-md text-gray-700">
              "This saffron is of exceptional quality! The aroma is incredible,
              and it added a wonderful flavor to my dishes. Highly recommended!"
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Jane Smith</h3>
            <p className="text-sm mb-2">⭐⭐⭐⭐</p>
            <p className="text-md text-gray-700">
              "The saffron is good, but I expected it to be a bit more vibrant.
              Still, it works well for my cooking needs."
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Alice Johnson
            </h3>
            <p className="text-sm mb-2">⭐⭐⭐⭐⭐</p>
            <p className="text-md text-gray-700">
              "Fantastic quality! Worth every penny. It gave my dishes a
              beautiful color and taste. Will definitely buy again."
            </p>
          </div>
        </div>
      </motion.div>

      {/* Related Products Section */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={controlsRelated}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-saffron text-white">
          Related Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 3).map((relatedProduct) => (
            <motion.div
              key={relatedProduct.id}
              className="border rounded-lg bg-white overflow-hidden shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
              // {/* Slowed down hover animation */}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              // {/* Slowed down tap animation */}
            >
              <Link to={`/product/${relatedProduct.id}`}>
                <img
                  src={relatedProduct.img}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-lg font-semibold text-saffron">
                    ₹{relatedProduct.price}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductSection;
