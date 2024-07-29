import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  uniqueId: { type: String, unique: true },
  recommendations: {
    type: [String], // Ensure this is an array of strings
    enum: [
      "Culinary Uses",
      "Medicinal Uses",
      "Cosmetic Uses",
      "Pregnant Woman Uses",
    ],
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: "At least two recommendation is required.",
    },
  },
  cuisine: {
    type: String,
    required: true,
  },
  saffronDishes: {
    type: [String],
    enum: ["Desserts", "Main Courses", "Appetizers", "Beverages", "Other"],
    default: [],
  },
  saffronDishesOther: { type: String, default: "" },
  flavorPreference: {
    type: String,
    enum: ["Mild", "Moderate", "Strong"],
    required: true,
  },
  healthBenefits: {
    type: [String],
    enum: [
      "Antioxidant-rich",
      "Anti-inflammatory",
      "Digestive health",
      "Other",
    ],
    default: [],
  },
  healthBenefitsOther: { type: String, default: "" },
  healthConditions: {
    type: [String],
    enum: ['Diabetes', 'High blood pressure', 'Heart conditions', 'Other'],
    default: [],
  },
  healthConditionsOther: { type: String, default: '' },
  learning: { type: String, enum: ['Yes', 'No'], required: true },
  currentMedications: {
    type: String,
    default: '',
  },
  primaryBenefits: {
    type: [String],
    required: true,
  },
  otherPrimaryBenefit: {
    type: String,
    default: '',
  },
  consultation: {
    type: String,
    required: true,
  },
  concerns: {
    type: String,
    default: '',
  },
  skinType: {
    type: String,
    enum: ['Oily', 'Dry', 'Combination', 'Normal', 'Sensitive' ],
  },
  primarySkinConcerns: {
    type: [String],
    enum: ['Acne', 'Wrinkles', 'Dark spots', 'Dryness', 'Redness', 'Uneven skin tone', 'Other'],
    default: [],
  },
  otherSkinConcern: {
    type: String,
    default: '',
  },
  skincareFrequency: {
    type: String,
    enum: ['Daily', 'Twice a day', 'Weekly', 'Occasionally', 'Rarely'],
  },
  usedSaffronProducts: {
    type: String,
    enum: ['Yes', 'No'],
  },
  satisfactionLevel: {
    type: String,
    enum: ['Very satisfied', 'Satisfied', 'Neutral', 'Unsatisfied', 'Very unsatisfied'],
    default: '',
  },
  pregnancyStage: {
    type: String,
    enum: ['First trimester', 'Second trimester', 'Third trimester', 'Postpartum'],
    required: true
  },
  previousSaffronUse: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  saffronUsageDuringPregnancy: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  allergies: {
    type: String,
    default: '',
  }
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
