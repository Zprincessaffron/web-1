import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
import CartIcon from "./CartIcon";
import CartModel from "./CartModel";
import axios from "axios";
import saffron1 from "/saffron-1.jpg"; // Sample images
import saffron2 from "/saffron-2.jpg";
import { userContext } from "../../context/UserContext";
import  '../../styles/SingleProduct.css'
import Navbar from '../../navbar/NavBar';
import Footer from '../../footer/Footer'
import MenuSlider from '../sidebar/MenuSlider';
import SideBar from '../sidebar/SideBar';
import GetReview from '../review/GetReview'
import { useUserContext } from "../../context/MainContext";
import PostReview from '../review/PostReview'
import { toast } from "react-toastify";
function SingleProduct() {
  const { addToCart, cartItems } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(2); // Default weight
  const [currentProductIndex, setCurrentProductIndex] = useState(0); // Track current product
  const [clickCount, setClickCount] = useState(0); // Track the number of clicks
  const { user } = useContext(userContext); // Get user info from context
  const navigate = useNavigate();
  const { isAddReview,setIsAddReview,isMobile,singleProduct,setSingleProduct,setShowNav,setSideBar,setMenuSlider }=useUserContext()
  const [kashmirRewiew,setKashmirReview]=useState([])
  const [spainRewiew,setSpainReview]=useState([])

  const [reviewData, setReviewData] = useState({
      name: user.name?(user.name):('null'),
      star: 0,
      review: "",
      product: '' // Default to a specific product, or you can make this dynamic
  });
  
  useEffect(() => {
      const fetchProducts = async () => {
          try {
              const review = await axios.get('/kashmir-review');
              setKashmirReview(review.data)  
          } catch (err) {
              console.error(err)
                 
      };
  }
      fetchProducts();  // Call the async function to fetch data
  }, []); 
  
  useEffect(() => {
      const fetchProducts = async () => {
          try {
              const review = await axios.get('/spain-review');
              setSpainReview(review.data);  
          } catch (err) {
              console.log(err)     
      };
  }
      fetchProducts();  // Call the async function to fetch data
  }, []); 

  const handleReviewSumbit = async (e) => {
      e.preventDefault(); // Prevent form from refreshing the page

      try {
          // Post the review data to the backend

          const response = await axios.post('/add-review', reviewData);
          // Display a success message or perform additional actions
          setIsAddReview(false)
      } catch (error) {
          // Handle any errors
          console.error('There was an error posting the review:', error);
      }
  };
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setReviewData({
          ...reviewData,
          [name]: value
      });
  };
  useEffect(() => {
      setMenuSlider(false)
      setSideBar(false)
    }, [])

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get("/products"); // Example endpoint
        const products = response.data;

        if (products.length > 0) {
          const productData = products[currentProductIndex];
          productData.img = productData._id === '66d2e6ed20b726ac685d2649' ? saffron1 : saffron2; 
          setProduct(productData);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [currentProductIndex]);

  const getDefaultQuantity = (weight) => {
    if (user?.role === "wholesaler") {
      return weight === 2 ? 5 : 2;
    }
    return 1;
  };

  const [quantity, setQuantity] = useState(getDefaultQuantity(selectedWeight));

  useEffect(() => {
    setQuantity(getDefaultQuantity(selectedWeight));
  }, [selectedWeight, user]);

  const getBackgroundColor = () => {
    return currentProductIndex === 0
      ? "sp-bg-gradient-kashmir"
      : "sp-bg-gradient-spain";
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddToCart = () => {
    if (product) {
      const selectedVariant = product.variants?.find(
        (v) => v.weight === selectedWeight
      );
      const productToAdd = {
        ...product,
        quantity,
        weight: selectedWeight,
        ...selectedVariant,
      };
      addToCart(productToAdd);
    }
    toast('Item Added Successfully')
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    const minimumQuantity = getDefaultQuantity(selectedWeight);
    setQuantity((prev) => (prev > minimumQuantity ? prev - 1 : prev));
  };

  const handleSwitchProduct = () => {
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;
      setCurrentProductIndex((prevIndex) => {
        const direction = newCount % 2 === 1 ? 1 : -1;
        const newIndex = prevIndex + direction;
        return newIndex < 0 ? 0 : newIndex >= 2 ? 1 : newIndex;
      });
      return newCount;
    });
  };

  if (!product) return <div>Loading...</div>;

  const currentPrice =
    product.variants?.find((v) => v.weight === selectedWeight)?.price || "";

  const stockInfo = product.variants?.find((v) => v.weight === selectedWeight)?.stock;

  return (
    <>
        <Navbar/>
        <SideBar/>
        <MenuSlider/>
      <div className={`sp-w-full sp-h-screen ${getBackgroundColor()}`}>
        <div className="sp-header">
          <button
            className={`sp-button ${currentProductIndex === 0 ? "sp-active" : "sp-inactive"}`}
            onClick={() => setCurrentProductIndex(0)}
          >
            KASHMIR SAFFRON
          </button>
          <button
            className={`sp-button ${currentProductIndex === 1 ? "sp-active" : "sp-inactive"}`}
            onClick={() => setCurrentProductIndex(1)}
          >
            SPAIN SAFFRON
          </button>
        </div>
        <div className="sp-main-content">
          <div className="sp-left-section">
            <h1 className="sp-product-title">{product.name}</h1>
            <p className="sp-product-description">{product.description}</p>
            <p className="sp-product-content">{product.content}</p>
            
            <div className="sp-weights">
              <button
                className={`sp-weight-button ${selectedWeight === 2 ? "sp-weight-active" : ""}`}
                onClick={() => setSelectedWeight(2)}
              >
                2 g
              </button>
              <button
                className={`sp-weight-button ${selectedWeight === 5 ? "sp-weight-active" : ""}`}
                onClick={() => setSelectedWeight(5)}
              >
                5 g
              </button>
            </div>
            <div className="sp-quantity-controls">
              <button className="sp-quantity-button" onClick={decrementQuantity}>-</button>
              <span className="sp-quantity-display">{quantity}</span>
              <button className="sp-quantity-button" onClick={incrementQuantity}>+</button>
            </div>

            <div className="sp-stock-info">
              {stockInfo > 0
                ? `In Stock (${stockInfo} Boxes Available)`
                : "Out of Stock"}
            </div>
          </div>
          <div className="sp-right-section">
            <img
              src={product.img}
              alt={product.name}
              className="sp-product-image"
            />
          </div>
          <div className="sp-right-column">
           
            <div className="sp-switch-product" onClick={handleSwitchProduct}>
              <FaChevronRight />
            </div>
          </div>
        </div>
        <div className="sp-footer">
          <button className="sp-footer-button" onClick={handleAddToCart}>
            ADD TO CART
          </button>
          <h1 className="sp-product-price">Price: ₹{currentPrice}</h1>
          <button className="sp-footer-button" onClick={handleBuyNow}>
            BUY NOW
          </button>
        </div>
      </div>
      {currentProductIndex==0?(
                  <GetReview spainRewiew={kashmirRewiew}/>

      ):(
          <GetReview spainRewiew={spainRewiew}/>
      )}
    
      {isAddReview?(
        <PostReview   reviewData={reviewData} setReviewData={setReviewData} setIsAddReview={setIsAddReview} handleReviewSumbit={handleReviewSumbit} handleInputChange={handleInputChange}/>

      ):(null)}
      
    </>
  );
}

export default SingleProduct;
// itemCount={cartItems.length} 