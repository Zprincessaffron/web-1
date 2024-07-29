import { comparePassword, hashPassword } from "../helpers/auth.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const test = (req, res) => {
  res.json("test is working");
};

// user Registration endpoint
export const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    recommendations,
    cuisine,
    saffronDishes,
    saffronDishesOther,
    flavorPreference,
    healthBenefits,
    healthBenefitsOther,
    healthConditions,
    healthConditionsOther,
    learning,
    currentMedications,
    primaryBenefits,
    otherPrimaryBenefit,
    consultation,
    concerns,
    skinType,
    primarySkinConcerns,
    otherSkinConcern,
    skincareFrequency,
    usedSaffronProducts,
    satisfactionLevel,
    pregnancyStage,
    previousSaffronUse,
    saffronUsageDuringPregnancy,
    allergies
  } = req.body;
  console.log("Request body:", req.body);
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
    // check if useCase is entered and it's an array with at least two elements
    if (!Array.isArray(recommendations) || recommendations.length < 2) {
      return res.json({
        error: "You should select at least two usecases",
      });
    }

    // check email
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
      recommendations,
      cuisine,
      saffronDishes,
      saffronDishesOther,
      flavorPreference,
      healthBenefits,
      healthBenefitsOther,
      healthConditions,
      healthConditionsOther,
      learning,
      currentMedications,
      primaryBenefits,
      otherPrimaryBenefit,
      consultation,
      concerns,
      skinType,
      primarySkinConcerns,
      otherSkinConcern,
      skincareFrequency,
      usedSaffronProducts,
      satisfactionLevel,
      pregnancyStage,
      previousSaffronUse,
      saffronUsageDuringPregnancy,
      allergies
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
    // check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    //check if password match
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token)
            .json({ email: user.email, id: user._id, name: user.name });
        }
      );
    }
    // generate unique ID if it doesn't exist
    if (!user.uniqueId) {
      const uniqueId = `${user.name.substring(0, 3).toUpperCase()}${Date.now().toString().slice(-6)}`;
      user.uniqueId = uniqueId;
      await user.save();
    }
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// get profile endpoint
// export const getProfile = async (req, res) => {
//   const { token } = req.cookies;
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
//       if (err) throw err;
//       res.json(user);
//     });
//   } else {
//     res.json(null);
//   }
// };

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
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
        const userData = await getUserByEmail(user.email); // Fetch user data from the database

        if (!userData) {
          return res.status(404).json({ error: "User not found" });
        }

        res.json({
          name: userData.name,
          email: userData.email,
          recommendations: userData.recommendations,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  } else {
    res.json(null);
  }
};
