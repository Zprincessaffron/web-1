import Wholesaler from "../models/wholesaler.js";
import mongoose from "mongoose";


export const registerWholesaler = async (req,res) =>{
  const { name, email, phone, additionalMobile, businessName, marketerId } = req.body;

  try {
    // Create a new wholesaler
    const newWholesaler = new Wholesaler({
      name,
      email,
      phone,
      additionalMobile,
      businessName,
      marketerId
    });

    // Save the wholesaler to the database
    const savedWholesaler = await newWholesaler.save();
    res.status(201).json(savedWholesaler);
  } catch (err) {
    console.error('Error registering wholesaler:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Get wholesalers registered by a specific marketer

export const getWholeSaler = async (req,res) =>{
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

  if (!id) {
    return res.status(400).json({ error: 'Marketer ID is required' });
  }

  // Validate the ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid marketer ID' });
  }

  try {
    const wholesalers = await Wholesaler.find({ marketerId: new mongoose.Types.ObjectId(id) })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const totalCount = await Wholesaler.countDocuments({ marketerId: new mongoose.Types.ObjectId(id) });
    const totalPages = Math.ceil(totalCount / limit);

    res.json({ wholesalers, totalPages });
  } catch (err) {
    console.error('Error fetching wholesalers:', err);
    res.status(500).json({ error: 'Error fetching wholesalers' });
  }
}

// getting all the Wholesaler's data

export const getAllWholesalers = async(req,res)=> {
  try {
    const wholesalers = await Wholesaler.find();
    res.json(wholesalers);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}