import { comparePassword, hashPassword } from "../helpers/auth.js";
import User from "../models/user.js";
import Marketer from "../models/marketer.js";
import Wholesaler from "../models/wholesaler.js";
import jwt from "jsonwebtoken";
import UserData from "../models/userData.js";
import dotenv from "dotenv";
import { sendOTP } from "../utils/email.js";
import bcrypt from 'bcrypt';

dotenv.config();

export const test = (req, res) => {
  res.json("test is working");
};

// user Registration endpoint
export const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    phone 
  } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
        if(user.isVerified){
        return res.status(400).json({ msg: 'User already exists' });}
        else{
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
    
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            user.otp = otp;
            user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    
            await user.save();
    
            await sendOTP(email, otp);
    
            res.status(200).json({ msg: 'OTP sent to email' });
            return
        }

    }

   
    user = new User({
      name,
      email,
      password,
      phone
      
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save();

  await sendOTP(email, otp);

  res.status(200).json({ msg: 'OTP sent to email' });
  } catch (error) {
    console.log(error);
  }
};
//verify otp

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
      let user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({ msg: 'Invalid email or OTP' });
      }

      if (user.otp !== otp || user.otpExpires < Date.now()) {
          return res.status(400).json({ msg: 'Invalid OTP or OTP expired' });
      }

      user.isVerified = true;
      user.otp = undefined;
      user.otpExpires = undefined;

      await user.save();

      res.status(200).json({ msg: 'Email verified successfully' });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
};
//resend otp

export const resendOTP = async (req, res) => {
  const { email } = req.body;

  try {
      let user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({ msg: 'User does not exist' });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

      await user.save();

      await sendOTP(email, otp);

      res.status(200).json({ msg: 'OTP resent to email' });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
};


// user login endpoint
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Attempt to find the user in the possible collections
    const collections = [Marketer, Wholesaler, User];
    let user = null;
    let role = '';

    for (const Collection of collections) {
      user = await Collection.findOne({ email });
      if (user) {
        if (Collection.modelName === "User") {
          role = user.role; // Get the role directly from the user document
        } else {
          role = Collection.modelName.toLowerCase(); // Assign role based on the model name for non-User collections
        }
        break;
      }
    }

    // If user is not found in any collection
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    // Check if the password matches
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate a unique ID if it doesn't exist
    if (!user.uniqueId) {
      user.uniqueId = `${user.name.substring(0, 3).toUpperCase()}${Date.now()
        .toString()
        .slice(-6)}`;
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id, role },
      process.env.JWT_SECRET,
      {}
    );

    // Return the response with the token and user details
    res.cookie("token", token)
    .json({
      email: user.email,
      id: user._id,
      name: user.name,
      role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};



export const getUserData = async (req, res) => {
  try {
    const userData = await UserData.find({});
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
};


// user profile tracking

const getUserByEmail = async (email, role) => {
  try {
    // Determine which collection to search based on role
    let user;
    if (role === "admin") {
      user = await User.findOne({ email }); // Assuming admin is stored in the User collection
    } else if (role === "marketer") {
      user = await Marketer.findOne({ email });
    } else if (role === "wholesaler") {
      user = await Wholesaler.findOne({ email });
    } else {
      user = await User.findOne({ email }); // Default to User collection if no specific role
    }
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

export const getProfile = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }

      try {
        const userData = await getUserByEmail(user.email, user.role); // Fetch user data from the appropriate collection

        if (!userData) {
          return res.status(404).json({ error: "User not found" });
        }

        res.json({
          name: userData.name,
          email: userData.email,
          id: userData._id,
          phone: userData.phone,
          role: userData.role,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  } else {
    res.status(401).json({ error: "No token provided" });
  }
};


// Middleware to verify JWT and attach user data to request
export const authenticate = (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }
      req.user = user; // Attach user data to request
      next();
    });
  } else {
    res.status(401).json({ error: "No token provided" });
  }
};

// Middleware to authorize users based on their role
export const authorize = (roles) => {
  return (req, res, next) => {
    const { role } = req.user;

    if (roles.includes(role)) {
      next();
    } else {
      res.status(403).json({ error: "Access denied" });
    }
  };
};


export const getAdmin = async(req,res) =>{
  try {
    const user = await User.findById(req.user.id);
    console.log(user)
    if (user && user.role === 'admin') {
      res.json(user);
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

