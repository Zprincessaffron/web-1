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
import axios from "axios";
import Slider from "react-slick"; 


const ProductDetails = () => {
  const { setMenuSlider, setSideBar, setShowNav,isMobile } = useUserContext();
  const { addToCart, cartItems } = useContext(CartContext);
  const { user } = useContext(userContext);
  const { id } = useParams(); // Get productId from the URL params
  // Remove the suffix (-0, -1, etc.) from the id
  const productId = id.split('-')[0];
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [rating, setRating] = useState(0); // Store rating
  const [comment, setComment] = useState(""); // Store review comment
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setErrorMessage("Please provide a rating.");
      return;
    }

    try {
      const response = await axios.post("/reviews", {
        userId: user.id,
        name: user.name,
        productId,
        rating,
        comment,
      });

      // Handle successful review submission
      console.log("Review submitted:", response.data);
      setShowReviewPopup(false);
      setComment("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
      setErrorMessage("Error submitting review. Please try again.");
    }
  };

  const navigate = useNavigate();

  const location = useLocation();
  const { product } = location.state;
  console.log(product)
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

console.log(btnDissable);

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
    if (!product || !product.fullProduct || !product.fullProduct.variants || !Array.isArray(product.fullProduct.variants)) {
      console.error('Product data or variants are not available');
      return;
    }
  
    // Log the full product data for debugging
    console.log(product.fullProduct);
  
    // Find the selected variant by matching the weight
    const selectedVariant = product.fullProduct.variants.find(variant => variant.weight === product.weight);
  
    if (!selectedVariant) {
      console.error('No matching variant found for the product');
      return;
    }
  
    const productToAdd = {
      variantId: selectedVariant._id,  // Use the correct variant ID
      productId: product._id.split('-')[0],
      name: product.name,
      price: selectedVariant.price,    // Use the variant's price
      weight: selectedVariant.weight,  // Use the variant's weight
      quantity: 1,                     // Default quantity
      image: product.image,
    };
  
    addToCart(productToAdd);
    setBtnDissable(true);
    console.log(productToAdd);
  };
  
  ////BUY NOW////
  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  // Function to check if user has purchased the product
  const handleReviewClick = async () => {
    try {
      const response = await axios.get(
        `/check-purchase/${user.id}/${productId}`
      );
      if (response.data.hasPurchased) {
        // User has purchased the product, show the review form
        setShowReviewPopup(true);
      } else {
        // User has not purchased the product, show an error message
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error checking purchase:", error);
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

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [ratingCounts, setRatingCounts] = useState([]);

  useEffect(() => {
    // Fetch reviews dynamically from the backend
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/reviews/${productId}`);
        const { reviews, averageRating, totalRatings, ratingCounts } =
          response.data;

        setReviews(reviews);
        setAverageRating(averageRating);
        setTotalRatings(totalRatings);
        setRatingCounts(ratingCounts);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  const getReviewTitle = (rating) => {
    switch (Math.round(rating)) {
      case 5:
        return "Great Product!";
      case 4:
        return "Good Quality";
      case 3:
        return "Decent";
      case 2:
        return "Not Satisfied";
      case 1:
        return "Very Disappointed";
      default:
        return "Review";
    }
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
                <ReactStars
                  count={5}
                  value={averageRating} // This will handle decimal ratings like 4.3
                  size={24}
                  edit={false} // Make it non-editable
                  half={true} // Allow half stars
                  color2={"#ffd700"} // Star color
                />
                <span>( {averageRating} )</span>
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
                          <button className="sr-button" type="submit">
                            Submit Review
                          </button>
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
                    <h3>{averageRating}</h3>
                    {/* <!-- Average Rating --> */}
                    <ReactStars
                      count={5}
                      value={averageRating} // This will handle decimal ratings like 4.3
                      size={24}
                      edit={false} // Make it non-editable
                      half={true} // Allow half stars
                      color2={"#ffd700"} // Star color
                    />
                    {/* <!-- Star Icons for Visual Display --> */}
                  </div>
                  <p class="total-reviews">{totalRatings} ratings</p>
                </div>

                {/* Right side: Progress bars with dynamic rating counts */}
                <div className="rating-bars">
                  {ratingCounts.map(({ star, count }) => (
                    <div key={star} className="rating-progress">
                      <div className="star-label">{star} stars</div>
                      <div className="progress-bar">
                        <div
                          className="progress"
                          style={{
                            width: `${(count / totalRatings) * 100}%`, // Calculate percentage
                          }}
                        ></div>
                      </div>
                      <span className="rating-count">{count} reviews</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* <!-- Bottom Portion: All Reviews Section --> */}
            <div className="reviews-list">
              <h2>All Reviews</h2>
              <hr className="review-line" />
             

              {/* Loop through reviews array */}
              {reviews.map((review, index) => (
                <div className="review-item" key={index}>
                  {/* Get the dynamic title based on rating */}
                  <h3>{getReviewTitle(review.rating)}</h3>
                  <div className="review-data">
                    <div className="review-icon">
                      <IoPersonCircleOutline size={40} />
                    </div>
                    <div className="review-text">
                      <div className="user-review">
                        <p className="reviewer-name">{review.name}</p>
                        <p className="review-star">
                          <span className="review-value">
                            ({review.rating.toFixed(1)})
                          </span>{" "}
                          <ReactStars
                            count={5}
                            value={review.rating} // This will handle decimal ratings like 4.3
                            size={24}
                            edit={false} // Make it non-editable
                            half={true} // Allow half stars
                            color2={"#ffd700"} // Star color
                          />
                        </p>
                      </div>
                      <p className="review-content">{review.comment}</p>
                    </div>
                  </div>
                </div>

              ))}

            </div>

            </div>
          </div>
        </div>
    </>
  );
};

export default ProductDetails;
