import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const CulinaryUses = ({data,setData,handleCulinaryCheckboxChange,handleInputChange,handleOtherChange,handleStartListening,handleReset}) => {

  return (
    <div>
      {/* Basic Information */}
      <h3>Culinary Information</h3>
        <div>
          <label htmlFor="cuisine">
            What type of cuisine do you usually cook?
          </label>
          <input
            type="text"
            id="cuisine"
            name="cuisine"
            value={data.cuisine}
            onChange={handleInputChange}
            placeholder="Type your answer here"
          />
          <button type="button" onClick={handleStartListening}>
            Start Listening
          </button>
          <button type="button" onClick={SpeechRecognition.stopListening}>
            Stop Listening
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
        <br />

        {/* Cooking Preferences */}

        <div>
          <label>What types of dishes do you like to cook with saffron?</label>
          <div>
            <input
              type="checkbox"
              id="desserts"
              value="Desserts"
              checked={data.saffronDishes.includes("Desserts")}
              name="saffronDishes"
              onChange={handleCulinaryCheckboxChange}
            />
            <label htmlFor="desserts">Desserts</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="mainCourses"
              value="Main Courses"
              checked={data.saffronDishes.includes("Main Courses")}
              name="saffronDishes"
              onChange={handleCulinaryCheckboxChange}
            />
            <label htmlFor="mainCourses">Main Courses</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="appetizers"
              value="Appetizers"
              checked={data.saffronDishes.includes("Appetizers")}
              name="saffronDishes"
              onChange={handleCulinaryCheckboxChange}
            />
            <label htmlFor="appetizers">Appetizers</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="beverages"
              value="Beverages"
              checked={data.saffronDishes.includes("Beverages")}
              name="saffronDishes"
              onChange={handleCulinaryCheckboxChange}
            />
            <label htmlFor="beverages">Beverages</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="saffronDishesOther"
              value="Other"
              name="saffronDishes"
              checked={data.saffronDishes.includes("Other")}
              onChange={handleCulinaryCheckboxChange}
            />
            <label htmlFor="saffronDishesOther">Other</label>
            {data.saffronDishes.includes("Other") && (
              <input
                type="text"
                placeholder="Specify other dishes"
                value={data.saffronDishesOther || ""}
                onChange={(e) => handleOtherChange(e, "saffronDishesOther")}
              />
            )}
          </div>
        </div>

        <br />

        <div>
          <label>Do you prefer mild or strong flavors in your dishes?</label>
          <select
            name="flavorPreference"
            value={data.flavorPreference}
            onChange={handleInputChange}
          >
            <option value="">Select an option</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Strong">Strong</option>
          </select>
        </div>

        <br />

        <div>
          <label>
            Are you looking for recipes with specific health benefits?
          </label>
          <div>
            <input
              type="checkbox"
              id="antioxidantRich"
              value="Antioxidant-rich"
              checked={data.healthBenefits.includes("Antioxidant-rich")}
              name="healthBenefits"
              onChange={handleCulinaryCheckboxChange}
            />
            <label htmlFor="antioxidantRich">Antioxidant-rich</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="antiInflammatory"
              value="Anti-inflammatory"
              checked={data.healthBenefits.includes("Anti-inflammatory")}
              name="healthBenefits"
              onChange={handleCulinaryCheckboxChange}
            />
            <label htmlFor="antiInflammatory">Anti-inflammatory</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="digestiveHealth"
              value="Digestive health"
              checked={data.healthBenefits.includes("Digestive health")}
              name="healthBenefits"
              onChange={handleCulinaryCheckboxChange}
            />
            <label htmlFor="digestiveHealth">Digestive health</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="healthBenefitsOther"
              value="Other"
              name="healthBenefits"
              checked={data.healthBenefits.includes("Other")}
              onChange={handleCulinaryCheckboxChange}
            />
            <label htmlFor="healthBenefitsOther">Other</label>
            {data.healthBenefits.includes("Other") && (
              <input
                type="text"
                placeholder="Specify other health benefits"
                value={data.healthBenefitsOther || ""}
                onChange={(e) => handleOtherChange(e, "healthBenefitsOther")}
              />
            )}
          </div>
        </div>

        <br />

        <div>
          <label>
            Do you have any specific health conditions that influence your diet?
          </label>
          <div>
            <input
              type="checkbox"
              name="healthConditions"
              value="Diabetes"
              checked={data.healthConditions.includes("Diabetes")}
              onChange={handleCulinaryCheckboxChange}
            />
            <label>Diabetes</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="healthConditions"
              value="High blood pressure"
              checked={data.healthConditions.includes("High blood pressure")}
              onChange={handleCulinaryCheckboxChange}
            />
            <label>High blood pressure</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="healthConditions"
              value="Heart conditions"
              checked={data.healthConditions.includes("Heart conditions")}
              onChange={handleCulinaryCheckboxChange}
            />
            <label>Heart conditions</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="healthConditions"
              value="Other"
              checked={data.healthConditions.includes("Other")}
              onChange={handleCulinaryCheckboxChange}
            />
            <label>Other</label>
            {data.healthConditions.includes("Other") && (
              <input
                type="text"
                name="healthConditionsOther"
                value={data.healthConditionsOther}
                onChange={handleInputChange}
                placeholder="Please specify"
              />
            )}
          </div>
        </div>

        <div>
          <label>
            Would you like to learn new cooking techniques involving saffron?
          </label>
          <div>
            <input
              type="radio"
              name="learning"
              value="Yes"
              checked={data.learning === "Yes"}
              onChange={handleInputChange}
            />
            <label>Yes</label>
          </div>
          <div>
            <input
              type="radio"
              name="learning"
              value="No"
              checked={data.learning === "No"}
              onChange={handleInputChange}
            />
            <label>No</label>
          </div>
        </div>
    </div>
  );
};

export default CulinaryUses;