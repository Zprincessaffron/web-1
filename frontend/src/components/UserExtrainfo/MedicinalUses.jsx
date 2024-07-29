import React, { useState } from 'react';

const MedicinalUses = ({data,setData,handleCulinaryCheckboxChange,handleInputChange}) => {
  
  return (
    <div>
      <h3>Medicinal Information</h3>
      <div>
        <label>Are you currently taking any medications or supplements?</label>
        <textarea
          name="currentMedications"
          value={data.currentMedications}
          onChange={handleInputChange}
          placeholder="Type your answer here"
        />
      </div>
      <div>
        <label>What primary benefits are you seeking from using saffron medicinally?</label>
        <div>
          <input
            type="checkbox"
            name="primaryBenefits"
            value="Improved mood"
            checked={data.primaryBenefits.includes("Improved mood")}
            onChange={handleCulinaryCheckboxChange}
          />
          <label>Improved mood</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="primaryBenefits"
            value="Better sleep"
            checked={data.primaryBenefits.includes("Better sleep")}
            onChange={handleCulinaryCheckboxChange}
          />
          <label>Better sleep</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="primaryBenefits"
            value="Pain relief"
            checked={data.primaryBenefits.includes("Pain relief")}
            onChange={handleCulinaryCheckboxChange}
          />
          <label>Pain relief</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="primaryBenefits"
            value="Enhanced digestion"
            checked={data.primaryBenefits.includes("Enhanced digestion")}
            onChange={handleCulinaryCheckboxChange}
          />
          <label>Enhanced digestion</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="primaryBenefits"
            value="Reduced inflammation"
            checked={data.primaryBenefits.includes("Reduced inflammation")}
            onChange={handleCulinaryCheckboxChange}
          />
          <label>Reduced inflammation</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="primaryBenefits"
            value="Other"
            checked={data.primaryBenefits.includes("Other")}
            onChange={handleCulinaryCheckboxChange}
          />
          <label>Other (please specify)</label>
          {data.primaryBenefits.includes("Other") && (
            <input
              type="text"
              name="otherPrimaryBenefit"
              value={data.otherPrimaryBenefit}
              onChange={handleInputChange}
              placeholder="Please specify"
            />
          )}
        </div>
      </div>
      <div>
        <label>Have you consulted your healthcare provider about using saffron for medicinal purposes?</label>
        <div>
          <input
            type="radio"
            name="consultation"
            value="Yes"
            checked={data.consultation === 'Yes'}
            onChange={handleInputChange}
          />
          <label>Yes</label>
        </div>
        <div>
          <input
            type="radio"
            name="consultation"
            value="No"
            checked={data.consultation === 'No'}
            onChange={handleInputChange}
          />
          <label>No</label>
        </div>
      </div>

      <div>
        <label>Do you have any concerns or questions about using saffron for medicinal purposes?</label>
        <textarea
          name="concerns"
          value={data.concerns}
          onChange={handleInputChange}
          placeholder="Type your answer here"
        />
      </div>
    </div>
  );
};

export default MedicinalUses;
