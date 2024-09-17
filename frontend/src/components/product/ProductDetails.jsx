import React, { useEffect, useState, useRef, useContext } from "react";
import { useFetcher, useLocation, useParams } from "react-router-dom";
import "../../styles/ProductDetails.css";
import StarProduct from "./StarProduct";
import { LuChevronRight } from "react-icons/lu";
import NavBar from "../../navbar/NavBar";
import SideBar from "../sidebar/SideBar";
import MenuSlider from "../sidebar/MenuSlider";
import Availability from "./Availability";
import { CartContext } from "../../context/CartContext";
import ProductDescription from "./ProductDescription";
import Gifting from "./Gifting";
import { useUserContext } from "../../context/MainContext";
import SelectGrams from "./SelectGrams";
import { useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";
import { userContext } from "../../context/UserContext";
import ReactStars from "react-stars";
import Slider from "react-slick";

const ProductDetails = () => {
  const { setMenuSlider, setSideBar, setShowNav,isMobile } = useUserContext();
  const { addToCart, cartItems } = useContext(CartContext);
  const { user } = useContext(userContext);
  console.log(user);
  const { productId } = useParams(); // Get productId from the URL params
  const [showReviewPopup, setShowReviewPopup] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [rating, setRating] = useState(0); // Store rating
  const [comment, setComment] = useState(""); // Store review comment
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setErrorMessage("Please provide a star rating!");
      return;
    }

    try {
      // Send review to the backend
      await axios.post(`/product/${productId}/review`, {
        userId,
        rating,
        comment,
      });

      alert("Review submitted successfully!");
      setShowReviewPopup(false); // Close the popup after submission
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const navigate = useNavigate();

  const location = useLocation();
  const { product } = location.state;
  const [isDivAtBottom, setIsDivAtBottom] = useState(true);
  const divRef = useRef(null);
  const [availability, setAvailability] = useState(false);
  const [pDetails, setpDetails] = useState(false);
  const [gifting, setGifting] = useState(false);
  const [showGram, setShowGram] = useState(false);
  const [btnDissable, setBtnDissable] = useState(false);

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
    if (cartItems) {
      const filteredItem = cartItems.filter(
        (item) => item._id == product._id.toString()
      );
      if (filteredItem.length > 0) {
        if (filteredItem[0].quantity > 0) {
          setBtnDissable(true);
        }
      }
    }
  }, [cartItems]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuSlider(false);
    setSideBar(false);
    setShowNav(true);
    setShowReviewPopup(false)
  }, []);

  ////ADD TO CART////
  const handleAddToCart = () => {
    const productToAdd = {
      _id: product._id,
      name: product.name,
      price: product.price,
      weight: product.weight,
      quantity: 1, // Use the updated quantity,
      image: product.image,
    };
    addToCart(productToAdd);
  };
  ////BUY NOW////
  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  // Function to check if user has purchased the product
  const handleReviewClick = () => {
    if (user.purchasedProducts && user.purchasedProducts.includes(productId)) {
      // If the user has purchased this product, show the review form pop-up
      setShowReviewPopup(true);
    } else {
      // If not, show an error message
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    }
  };
  //settings for slider
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <NavBar />
      <SideBar />
      <SelectGrams
        product={product}
        showGram={showGram}
        setShowGram={setShowGram}
        grams={product.weight}
      />
      <MenuSlider />
      <Gifting gifting={gifting} setGifting={setGifting} />
      <Availability
        name={product.name}
        stockk={product.stock}
        price={product.price}
        state={availability}
        setState={setAvailability}
      />
      <ProductDescription
        description={product.fullProduct.description}
        content={product.fullProduct.content}
        state={pDetails}
        setSate={setpDetails}
      />
      <div>
        <div className="product-details">
           {isMobile?(
                     

    <Slider className="pd_slider" {...settings}>

    <div>
      <h3>1</h3>
    </div>
    <div>
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
  


           ):(
            <>
            <div className="pd-left">
            <div className="pd-left-1"></div>
            <div className="pd-left-2"></div>
            <div className="pd-left-3"></div>
            <div ref={divRef} className="pd-left-4"></div>
          </div>
            </>
           )}
          <div className={`pd-right ${isDivAtBottom ? "" : "true"}`}>
            <div className="pd-rightdetails">
              <h1>{product.name}</h1>
              {/* <p>{product.fullProduct.description}</p> */}
              <p>₹{product.price}</p>
              <h5 className="font-tax">(M.R.P incl. of all taxes)</h5>
              <p>{product.weight} Grams</p>
              {/* <h4>Product Features:</h4>
              <p>Origin: {product.fullProduct.productFeatures.origin}</p>
                <p>Categories: {product.fullProduct.category.join(', ')}</p> */}
              <div className="pd-star-rating">
                <StarProduct starValue={product.fullProduct.rating} />
              </div>
              {/* <div className='change-grams' onClick={()=>{setShowGram(true)}}>
                  <h2>Grams</h2> <div><h2>2 Grams / 5 Grams 
                  </h2> <h3><LuChevronRight /></h3></div>

                </div> */}
              <div className="pd-button">
                {btnDissable ? (
                  <>
                    <button className="item_added">Item Added</button>
                  </>
                ) : (
                  <button onClick={handleAddToCart}>ADD TO CART</button>
                )}

                <button onClick={handleBuyNow}>BUY NOW</button>
              </div>
              <div className="pd-right_belowitems">
                <ul>
                <li><a
                  onClick={() => {
                    setAvailability(true);
                  }}
                >
                  Check availability in store
                </a></li>
                <li> <a
                  onClick={() => {
                    setpDetails(true);
                  }}
                >
                  Product details
                </a> </li>
                <li><a>Delivery & returns</a> </li>
                <li> <a
                  onClick={() => {
                    setGifting(true);
                  }}
                >
                  Gifting
                </a> </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="pd-review-box">
          <div className="reviews-container">
            {/* <!-- Top Portion: Star Ratings with Progress Bar --> */}
            <div class="ratings-overview">
              <div className="top-section">
                <h2>Reviews Overview</h2>
               
                <div>
                  <button className="review-button" onClick={handleReviewClick}>
                    Add review
                  </button>

                  {/* Show the error message if the user hasn't purchased the product */}
                  {showErrorMessage && (
                    <p className="error-message">
                      You can only give a review when you have purchased this
                      product.
                    </p>
                  )}

                  {/* Show the review form popup if the user has purchased the product */}
                  {showReviewPopup && (
                    <div className="review-popup">
                      <form onSubmit={handleSubmit} className="review-form">
                        <h3>Write your review</h3>

                        {/* Star Rating Component */}
                        <div className="pb-rating">
                          <label>Rating:</label>
                          <ReactStars
                            count={5}
                            onChange={(newRating) => setRating(newRating)}
                            size={24}
                            color2={"#ffd700"} // Star color
                            value={rating}
                          />
                        </div>
                        
                        {/* Error Message if rating is not provided */}
                        {errorMessage && (
                          <p className="error-message">{errorMessage}</p>
                        )}

                        {/* Review Comment */}
                        <textarea
                          placeholder="Write your review..."
                          rows="4"
                          cols="50"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <div className="form-buttons">
                          {/* Cancel Button */}
                          <button
                            className="cr-button"
                            type="button"
                            onClick={() => setShowReviewPopup(false)} // Close the popup
                          >
                            Cancel
                          </button>

                          {/* Submit Button */}
                          <button className="sr-button" type="submit">Submit Review</button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>

              <hr className="review-line" />

              <div class="ratings-content">
                {/* <!-- Left side: Average rating and total reviews --> */}
                <div class="average-rating">
                  <div class="average-stars">
                    <h3>4.2</h3>
                    {/* <!-- Average Rating --> */}
                    <p>⭐⭐⭐⭐⭐</p>
                    {/* <!-- Star Icons for Visual Display --> */}
                  </div>
                  <p class="total-reviews">1200 ratings</p>
                  {/* <!-- Total Ratings --> */}
                </div>

                {/* <!-- Right side: Progress bars with rating counts --> */}
                <div class="rating-bars">
                  <div class="rating-progress">
                    <div class="star-label">5 stars</div>
                    <div class="progress-bar">
                      <div class="progress" style={{ width: "80%" }}></div>
                    </div>
                    <span class="rating-count">800 reviews</span>
                    {/* <!-- Count for 5 stars --> */}
                  </div>

                  <div class="rating-progress">
                    <div class="star-label">4 stars</div>
                    <div class="progress-bar">
                      <div class="progress" style={{ width: "60%" }}></div>
                    </div>
                    <span class="rating-count">600 reviews</span>
                    {/* <!-- Count for 4 stars --> */}
                  </div>

                  <div class="rating-progress">
                    <div class="star-label">3 stars</div>
                    <div class="progress-bar">
                      <div class="progress" style={{ width: "40%" }}></div>
                    </div>
                    <span class="rating-count">400 reviews</span>
                    {/* <!-- Count for 3 stars --> */}
                  </div>

                  <div class="rating-progress">
                    <div class="star-label">2 stars</div>
                    <div class="progress-bar">
                      <div class="progress" style={{ width: "20%" }}></div>
                    </div>
                    <span class="rating-count">200 reviews</span>
                    {/* <!-- Count for 2 stars --> */}
                  </div>

                  <div class="rating-progress">
                    <div class="star-label">1 star</div>
                    <div class="progress-bar">
                      <div class="progress" style={{ width: "10%" }}></div>
                    </div>
                    <span class="rating-count">100 reviews</span>
                    {/* <!-- Count for 1 star --> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Bottom Portion: All Reviews Section --> */}
            <div class="reviews-list">
              <h2>All Reviews</h2>
              <hr className="review-line" />
              <div class="review-item">
                <h3>Great Product!</h3>
                <div className="review-data">
                  <div className="review-icon">
                    <IoPersonCircleOutline size={40} />
                  </div>
                  <div className="review-text">
                    <p className="review-star">⭐⭐⭐⭐⭐</p>
                    <p className="review-content">
                      This saffron is absolutely amazing! The flavor and quality
                      are top-notch.
                    </p>
                  </div>
                </div>
              </div>

              <div class="review-item">
                <h3>Good Quality</h3>
                <div className="review-data">
                  <div className="review-icon">
                    <IoPersonCircleOutline size={40} />
                  </div>
                  <div className="review-text">
                    <p className="review-star">⭐⭐⭐⭐</p>
                    <p className="review-content">
                      Good quality but a bit pricey. Overall, I'm satisfied with
                      my purchase.
                    </p>
                  </div>
                </div>
              </div>

              <div class="review-item">
                <h3>Decent</h3>
                <div className="review-data">
                  <div className="review-icon">
                    <IoPersonCircleOutline size={40} />
                  </div>
                  <div className="review-text">
                    <p className="review-star">⭐⭐⭐</p>
                    <p className="review-content">
                      The saffron is decent but I've had better at this price
                      point.
                    </p>
                  </div>
                </div>
              </div>

              <div className="review-item">
                <h3>Not Satisfied</h3>
                <div className="review-data">
                  <div className="review-icon">
                    <IoPersonCircleOutline size={40} />
                  </div>
                  <div className="review-text">
                    <p className="review-star">⭐⭐</p>
                    <p className="review-content">
                      Not worth the money in my opinion. The quality could be
                      better.
                    </p>
                  </div>
                </div>
              </div>

              <div class="review-item">
                <h3>Very Disappointed</h3>
                <div className="review-data">
                  <div className="review-icon">
                    <IoPersonCircleOutline size={40} />
                  </div>
                  <div className="review-text">
                    <p className="review-star">⭐</p>
                    <p className="review-content">
                      The product did not meet my expectations at all.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
