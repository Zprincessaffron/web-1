import { comparePassword, hashPassword } from "../helpers/auth.js";
import User from "../models/user.js";
import Marketer from "../models/marketer.js";
import Wholesaler from "../models/wholesaler.js";
import jwt from "jsonwebtoken";
import UserData from "../models/userData.js";
import dotenv from "dotenv";
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
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email already Exist",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
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

