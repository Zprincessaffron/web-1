import { comparePassword, hashPassword } from "../helpers/auth.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import UserData from "../models/userData.js";
import Order from "../models/order.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HfInference } from "@huggingface/inference";

export const test = (req, res) => {
  res.json("test is working");
};

// user Registration endpoint
export const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    // recommendations,
    // cuisine,
    // saffronDishes,
    // saffronDishesOther,
    // flavorPreference,
    // healthBenefits,
    // healthBenefitsOther,
    // healthConditions,
    // healthConditionsOther,
    // learning,
    // currentMedications,
    // primaryBenefits,
    // otherPrimaryBenefit,
    // consultation,
    // concerns,
    // skinType,
    // primarySkinConcerns,
    // otherSkinConcern,
    // skincareFrequency,
    // usedSaffronProducts,
    // satisfactionLevel,
    // pregnancyStage,
    // previousSaffronUse,
    // saffronUsageDuringPregnancy,
    // allergies,
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
    // if (!Array.isArray(recommendations) || recommendations.length < 2) {
    //   return res.json({
    //     error: "You should select at least two usecases",
    //   });
    // }

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
      // recommendations,
      // cuisine,
      // saffronDishes,
      // saffronDishesOther,
      // flavorPreference,
      // healthBenefits,
      // healthBenefitsOther,
      // healthConditions,
      // healthConditionsOther,
      // learning,
      // currentMedications,
      // primaryBenefits,
      // otherPrimaryBenefit,
      // consultation,
      // concerns,
      // skinType,
      // primarySkinConcerns,
      // otherSkinConcern,
      // skincareFrequency,
      // usedSaffronProducts,
      // satisfactionLevel,
      // pregnancyStage,
      // previousSaffronUse,
      // saffronUsageDuringPregnancy,
      // allergies,
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
        { email: user.email, id: user._id, name: user.name, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
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
      const uniqueId = `${user.name.substring(0, 3).toUpperCase()}${Date.now()
        .toString()
        .slice(-6)}`;
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

// getting all the User's data
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveData = async (req, res) => {
  try {
    // Process data to match schema expectations
    const userData = new UserData({
      recommendation: {
        useCases: Array.isArray(req.body.recommendation?.useCases)
          ? req.body.recommendation.useCases
          : [],
      },
      culinary: {
        cuisine: req.body.cuisine || "",
        dishes: Array.isArray(req.body.dishes)
          ? req.body.dishes
          : [req.body.dishes], // Ensure dishes is an array
        flavor: req.body.flavor || "",
        healthBenefits: Array.isArray(req.body.healthBenefits)
          ? req.body.healthBenefits
          : [req.body.healthBenefits], // Ensure healthBenefits is an array
        healthConditions: Array.isArray(req.body.healthConditions)
          ? req.body.healthConditions
          : [req.body.healthConditions], // Ensure healthConditions is an array
        learnTechniques: req.body.learnTechniques || "",
      },
      medicinal: {
        medications: req.body.medications || "",
        benefits: Array.isArray(req.body.benefits)
          ? req.body.benefits
          : [req.body.benefits], // Ensure benefits is an array
        consultedProvider: Array.isArray(req.body.consultedProvider)
          ? req.body.consultedProvider[0]
          : "", // Extract if array
        concerns: req.body.concerns || "",
      },
      cosmetic: {
        skinType: req.body.skinType || "",
        skinConcerns: Array.isArray(req.body.skinConcerns)
          ? req.body.skinConcerns
          : [req.body.skinConcerns], // Ensure skinConcerns is an array
        applicationFrequency: req.body.applicationFrequency || "",
        usedSaffron: req.body.usedSaffron || "", // Ensure usedSaffron is a string
      },
      pregnantWomen: {
        pregnancyStage: req.body.pregnancyStage || "",
        usedBeforePregnancy: req.body.usedBeforePregnancy || "", // Extract if array
        usingDuringPregnancy: req.body.usingDuringPregnancy || "", // Extract if array
        knownAllergies: req.body.knownAllergies || "",
      },
    });

    // Save the data
    await userData.save();
    res.status(201).send("Data saved successfully");
  } catch (err) {
    console.error("Error saving data:", err); // Log error details
    res.status(400).send("Error saving data");
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

// backend for

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// export const analyzeData = async (req, res) => {
//   try {
//     const { recommendation } = req.body;
//     const { useCases } = recommendation;

//     if (!useCases || !Array.isArray(useCases)) {
//       return res.status(400).json({ error: 'Invalid or missing useCases' });
//     }

//     // Collect all relevant data for each use case
//     const collectedData = [];
//     useCases.forEach((useCase) => {
//       switch (useCase) {
//         case 'culinary':
//           const { cuisine, dishes, flavor, healthBenefits, healthConditions } = req.body;
//           collectedData.push(`Cuisine: ${cuisine}, Dishes: ${dishes}, Flavor: ${flavor}, Health benefits: ${healthBenefits}, Health conditions: ${healthConditions}`);
//           break;
//         case 'cosmetic':
//           const { skinType, skinConcerns, applicationFrequency, usedSaffron } = req.body;
//           collectedData.push(`Skin type: ${skinType}, Skin concerns: ${skinConcerns}, Application frequency: ${applicationFrequency}, Used saffron before: ${usedSaffron}`);
//           break;
//         case 'medicinal':
//           const { medications, benefits, consultedProvider, concerns } = req.body;
//           collectedData.push(`Medications: ${medications}, Benefits: ${benefits}, Consulted healthcare provider: ${consultedProvider}, Concerns: ${concerns}`);
//           break;
//         case 'pregnantwomen':
//           const { pregnancyStage, usedBeforePregnancy, usingDuringPregnancy, knownAllergies } = req.body;
//           collectedData.push(`Pregnancy stage: ${pregnancyStage}, Used before pregnancy: ${usedBeforePregnancy}, Using during pregnancy: ${usingDuringPregnancy}, Known allergies: ${knownAllergies}`);
//           break;
//         default:
//           break;
//       }
//     });

//     // Construct the prompt for the AI model
//     const prompt = `Recommend a Kashmiri or spanish saffron with the following use cases: ${useCases.join(', ')}. Details: ${collectedData.join(' | ')}. First choose which saffron you are going to recommend and make it as a bold title and afterward give an point by point explanation about the user's useCases give them only positive points only.`;

//     // Call the generative AI model
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     // Send the model's response back to the frontend
//     res.json({ suggestion: text });
//   } catch (error) {
//     console.error('Error generating content:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const analyzeData = async (req, res) => {
  try {
    const { recommendation, culinary, medicinal, cosmetic, pregnantWomen } =
      req.body;
    const { useCases } = recommendation;

    if (!useCases || !Array.isArray(useCases)) {
      return res.status(400).json({ error: "Invalid or missing useCases" });
    }

    // Process data to match schema expectations
    const userData = new UserData({
      recommendation: {
        useCases: Array.isArray(req.body.recommendation?.useCases)
          ? req.body.recommendation.useCases
          : [],
      },
      culinary: {
        cuisine: req.body.cuisine || "",
        dishes: Array.isArray(req.body.dishes)
          ? req.body.dishes
          : [req.body.dishes], // Ensure dishes is an array
        flavor: req.body.flavor || "",
        healthBenefits: Array.isArray(req.body.healthBenefits)
          ? req.body.healthBenefits
          : [req.body.healthBenefits], // Ensure healthBenefits is an array
        healthConditions: Array.isArray(req.body.healthConditions)
          ? req.body.healthConditions
          : [req.body.healthConditions], // Ensure healthConditions is an array
        learnTechniques: req.body.learnTechniques || "",
      },
      medicinal: {
        medications: req.body.medications || "",
        benefits: Array.isArray(req.body.benefits)
          ? req.body.benefits
          : [req.body.benefits], // Ensure benefits is an array
        consultedProvider: Array.isArray(req.body.consultedProvider)
          ? req.body.consultedProvider[0]
          : "", // Extract if array
        concerns: req.body.concerns || "",
      },
      cosmetic: {
        skinType: req.body.skinType || "",
        skinConcerns: Array.isArray(req.body.skinConcerns)
          ? req.body.skinConcerns
          : [req.body.skinConcerns], // Ensure skinConcerns is an array
        applicationFrequency: req.body.applicationFrequency || "",
        usedSaffron: req.body.usedSaffron || "", // Ensure usedSaffron is a string
      },
      pregnantWomen: {
        pregnancyStage: req.body.pregnancyStage || "",
        usedBeforePregnancy: req.body.usedBeforePregnancy || "", // Extract if array
        usingDuringPregnancy: req.body.usingDuringPregnancy || "", // Extract if array
        knownAllergies: req.body.knownAllergies || "",
      },
    });

    // Save the data
    await userData.save();

    // Collect all relevant data for each use case
    const collectedData = [];
    useCases.forEach((useCase) => {
      switch (useCase) {
        case "culinary":
          if (culinary) {
            const {
              cuisine,
              dishes,
              flavor,
              healthBenefits,
              healthConditions,
            } = culinary;
            collectedData.push(
              `Cuisine: ${cuisine}, Dishes: ${dishes}, Flavor: ${flavor}, Health benefits: ${healthBenefits}, Health conditions: ${healthConditions}`
            );
          }
          break;
        case "cosmetic":
          if (cosmetic) {
            const {
              skinType,
              skinConcerns,
              applicationFrequency,
              usedSaffron,
            } = cosmetic;
            collectedData.push(
              `Skin type: ${skinType}, Skin concerns: ${skinConcerns}, Application frequency: ${applicationFrequency}, Used saffron before: ${usedSaffron}`
            );
          }
          break;
        case "medicinal":
          if (medicinal) {
            const { medications, benefits, consultedProvider, concerns } =
              medicinal;
            collectedData.push(
              `Medications: ${medications}, Benefits: ${benefits}, Consulted healthcare provider: ${consultedProvider}, Concerns: ${concerns}`
            );
          }
          break;
        case "pregnantwomen":
          if (pregnantWomen) {
            const {
              pregnancyStage,
              usedBeforePregnancy,
              usingDuringPregnancy,
              knownAllergies,
            } = pregnantWomen;
            collectedData.push(
              `Pregnancy stage: ${pregnancyStage}, Used before pregnancy: ${usedBeforePregnancy}, Using during pregnancy: ${usingDuringPregnancy}, Known allergies: ${knownAllergies}`
            );
          }
          break;
        default:
          break;
      }
    });

    // Construct the prompt for the AI model
    const prompt = `Based on the following use cases: ${useCases.join(", ")} and details: ${collectedData.join(  " | ")}, recommend either Kashmiri or Spanish saffron. Choose only one option and provide a brief explanation with 3 to 4 positive points about why it is the best choice for the given use cases. Avoid providing details for the non-recommended option.
    {
      "title": "<Recommended Saffron Type>",
      "suggestion": "<Explanation>"
    }`;

    // Call the Hugging Face model
    const result = await hf.textGeneration({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      inputs: prompt,
      parameters: {
        max_new_tokens: 400,
        return_full_text: false,
      },
    });

    const suggestion = result.generated_text;

    // Send only the model's suggestion back to the frontend
    res.json({ suggestion });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
          id: userData._id,
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

export const OrderData = async (req, res) => {
  try {
    const { shippingDetails, items, total, user } = req.body;

    if (!shippingDetails || !items || !total || !user) {
      return res.status(400).json({ message: "Missing data" });
    }

    // Create a new order document
    const newOrder = new Order({
      shippingDetails,
      cartItems: items,
      total,
      status: "Processed",
      user,
    });

    // Save to the database
    await newOrder.save();

    res
      .status(200)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrderData = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the request parameters
    const orders = await Order.find({ "user.id": userId }); // Find orders by user ID
    console.log(orders); // Log the orders (for debugging)
    res.json(orders); // Send the orders in the response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
};

const ROLES = {
  USER: "user",
  ADMIN: "admin",
  MARKETER: "marketer",
  WHOLESALER: "wholesaler",
};

export default ROLES;

// Middleware to verify user roles
export const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming req.user contains the authenticated user info
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" }); // Forbidden
    }
    next();
  };
};
