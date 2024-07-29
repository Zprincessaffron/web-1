import React, { useState } from 'react';

const CosmeticUses = ({data,setData,handleCulinaryCheckboxChange,handleInputChange,handleOtherChange}) => {

  return (
    <div>
      <h3>Cosmetic Usage Information</h3>
      
      <div>
        <label>What is your skin type?</label>
        <select
          name="skinType"
          value={data.skinType}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          <option value="Oily">Oily</option>
          <option value="Dry">Dry</option>
          <option value="Combination">Combination</option>
          <option value="Normal">Normal</option>
          <option value="Sensitive">Sensitive</option>
        </select>
      </div>

      <div>
        <label>What are your primary skin concerns?</label>
        <div>
          <input
            type="checkbox"
            id="acne"
            value="Acne"
            checked={data.primarySkinConcerns.includes("Acne")}
            name="primarySkinConcerns"
            onChange={handleCulinaryCheckboxChange}
          />
          <label htmlFor="acne">Acne</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="wrinkles"
            value="Wrinkles"
            checked={data.primarySkinConcerns.includes("Wrinkles")}
            name="primarySkinConcerns"
            onChange={handleCulinaryCheckboxChange}
          />
          <label htmlFor="wrinkles">Wrinkles</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="darkSpots"
            value="Dark spots"
            checked={data.primarySkinConcerns.includes("Dark spots")}
            name="primarySkinConcerns"
            onChange={handleCulinaryCheckboxChange}
          />
          <label htmlFor="darkSpots">Dark spots</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="dryness"
            value="Dryness"
            checked={data.primarySkinConcerns.includes("Dryness")}
            name="primarySkinConcerns"
            onChange={handleCulinaryCheckboxChange}
          />
          <label htmlFor="dryness">Dryness</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="redness"
            value="Redness"
            checked={data.primarySkinConcerns.includes("Redness")}
            name="primarySkinConcerns"
            onChange={handleCulinaryCheckboxChange}
          />
          <label htmlFor="redness">Redness</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="unevenSkinTone"
            value="Uneven skin tone"
            checked={data.primarySkinConcerns.includes("Uneven skin tone")}
            name="primarySkinConcerns"
            onChange={handleCulinaryCheckboxChange}
          />
          <label htmlFor="unevenSkinTone">Uneven skin tone</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="primarySkinConcernsOther"
            value="Other"
            name="primarySkinConcerns"
            checked={data.primarySkinConcerns.includes("Other")}
            onChange={handleCulinaryCheckboxChange}
          />
          <label htmlFor="primarySkinConcernsOther">Other</label>
          {data.primarySkinConcerns.includes("Other") && (
            <input
              type="text"
              placeholder="Specify other skin concerns"
              value={data.otherSkinConcern || ""}
              onChange={(e) => handleOtherChange(e, "otherSkinConcern")}
            />
          )}
        </div>
      </div>


      <div>
        <label>How often do you apply skincare products?</label>
        <select
          name="skincareFrequency"
          value={data.skincareFrequency}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          <option value="Daily">Daily</option>
          <option value="Twice a day">Twice a day</option>
          <option value="Weekly">Weekly</option>
          <option value="Occasionally">Occasionally</option>
          <option value="Rarely">Rarely</option>
        </select>
      </div>

      <div>
        <label>Have you used saffron-based skincare products before?</label>
        <div>
          <input
            type="radio"
            name="usedSaffronProducts"
            value="Yes"
            checked={data.usedSaffronProducts === 'Yes'}
            onChange={handleInputChange}
          />
          <label>Yes</label>
        </div>
        <div>
          <input
            type="radio"
            name="usedSaffronProducts"
            value="No"
            checked={data.usedSaffronProducts === 'No'}
            onChange={handleInputChange}
          />
          <label>No</label>
        </div>
      </div>

      {data.usedSaffronProducts === 'Yes' && (
        <div>
          <label>If yes, how satisfied were you with the results?</label>
          {['Very satisfied', 'Satisfied', 'Neutral', 'Unsatisfied', 'Very unsatisfied'].map(level => (
            <div key={level}>
              <input
                type="radio"
                name="satisfactionLevel"
                value={level}
                checked={data.satisfactionLevel === level}
                onChange={handleInputChange}
              />
              <label>{level}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CosmeticUses;
