import express from 'express';
import Review from '../models/review.js';
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