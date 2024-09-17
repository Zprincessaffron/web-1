import express from 'express';
import Review from '../models/review.js';
import Order from '../models/order.js';
const router = express.Router(); 

// Route to add a customer review
export const addReview = async (req, res) => {
  try {
    const { name, star, review , product } = req.body;
    const newReview = new Review({
      name,
      star,
      review,
      product,
    });
    await newReview.save();
    res.status(201).send('Review added successfully!');
  } catch (error) {
    res.status(400).send('Error adding review!');
  }
}

export const getKashmirSaffronReviews = async (req, res) => {
  try {
      const reviews = await Review.find({ product: 'Kashmir Saffron' });
      res.status(200).json(reviews);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

export const getSpainSaffronReviews = async (req, res) => {
  try {
      const reviews = await Review.find({ product: 'Spain Saffron' });
      res.status(200).json(reviews);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


export const checkUserPurchase = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Find any order where the user has purchased this product
    const order = await Order.findOne({
      'user.id': userId,            // Match the user ID
      'cartItems.productId': productId  // Check if the product exists in cartItems
    });

    if (order) {
      // If an order is found, the user has purchased the product
      return res.status(200).json({ hasPurchased: true });
    } else {
      // If no order is found, the user hasn't purchased the product
      return res.status(200).json({ hasPurchased: false });
    }
  } catch (error) {
    console.error('Error checking purchase history:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Create Review
export const createReview = async (req, res) => {
  const { userId,name, productId, rating, comment } = req.body;

  try {
    // Check if the user has purchased the product
    const order = await Order.findOne({
      'user.id': userId,
      'cartItems.productId': productId
    });

    if (!order) {
      return res.status(400).json({ message: 'You can only review purchased products.' });
    }

    // Create a new review
    const review = new Review({
      user: userId,
      name,
      product: productId,
      rating,
      comment
    });

    // Save review to the database
    await review.save();

    res.status(201).json({ message: 'Review submitted successfully!', review });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET API to fetch reviews for a specific product
// router.get('/reviews/:productId', async (req, res) => {
export const fetchReviews = async (req, res) => {
  const { productId } = req.params;

  try {
    // Fetch all reviews for the product
    const reviews = await Review.find({ product: productId });

    // Calculate average rating and total count
    const totalRatings = reviews.length;
    const averageRating =
      totalRatings > 0
        ? (
            reviews.reduce((acc, review) => acc + review.rating, 0) /
            totalRatings
          ).toFixed(1)
        : 0;

    // Group reviews by rating (e.g., 5 stars, 4 stars, etc.)
    const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((review) => Math.floor(review.rating) === star)
        .length,
    }));

    // Send the review data and rating info as the response
    res.json({
      reviews,
      averageRating,
      totalRatings,
      ratingCounts,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};