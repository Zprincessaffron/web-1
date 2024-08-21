import { hashPassword } from "../helpers/auth.js";
import Marketer from "../models/marketer.js";

export const registerMarketer = async (req, res) => {
  const {
    name,
    email,
    password,
    phone
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
    if(!phone){
      return res.json({
        error: "Mobile Number is required"
      })
    }

    // check if email exist
    const exist = await Marketer.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email already Exist",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await Marketer.create({
      name,
      email,
      password: hashedPassword,
      phone
    });
    // Exclude password in response
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json(userWithoutPassword);
  } catch (error) {
    console.log(error);
  }
};

export const getMarketer = async (req, res) => {
  try {
    const marketer = await Marketer.findById(req.params.id);
    if (!marketer) {
      return res.status(404).json({ message: "Marketer not found" });
    }
    res.json(marketer);
  } catch (err) {
    console.error("Error fetching marketer:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// getting all the marketer's data

export const getAllMarketers = async(req,res)=> {
  try {
    const marketers = await Marketer.find();
    res.json(marketers);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}