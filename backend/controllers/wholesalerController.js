import { hashPassword } from "../helpers/auth.js";
import Wholesaler from "../models/wholesaler.js";
import mongoose from "mongoose";

export const registerWholesaler = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    additionalMobile,
    businessName,
    marketerId,
  } = req.body;

  try {
    // check if name was entered
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    //check if password is good
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 Characters",
      });
    }

    // check if phone number was entered
    if (!phone) {
      return res.json({
        error: "Mobile Number is required",
      });
    }

    // check if email exist
    const exist = await Wholesaler.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email already Exist",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await Wholesaler.create({
      name,
      email,
      password: hashedPassword,
      phone,
      additionalMobile,
      businessName,
      marketerId,
    });
    // Exclude password in response
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json(userWithoutPassword);
  } catch (error) {
    console.log(error);
  }
};

// Get wholesalers registered by a specific marketer

export const getWholeSaler = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

  if (!id) {
    return res.status(400).json({ error: "Marketer ID is required" });
  }

  // Validate the ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid marketer ID" });
  }

  try {
    const wholesalers = await Wholesaler.find({
      marketerId: new mongoose.Types.ObjectId(id),
    })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const totalCount = await Wholesaler.countDocuments({
      marketerId: new mongoose.Types.ObjectId(id),
    });
    const totalPages = Math.ceil(totalCount / limit);

    res.json({ wholesalers, totalPages });
  } catch (err) {
    console.error("Error fetching wholesalers:", err);
    res.status(500).json({ error: "Error fetching wholesalers" });
  }
};

// getting all the Wholesaler's data

export const getAllWholesalers = async (req, res) => {
  try {
    const wholesalers = await Wholesaler.find();
    res.json(wholesalers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
