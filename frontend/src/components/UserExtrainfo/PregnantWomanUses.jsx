import React, { useState } from 'react';

const PregnantWomenUses = ({data,setData,handleCulinaryCheckboxChange,handleInputChange}) => {

  return (
    <div>
      <h3>Pregnant Women Information</h3>

      <div>
        <label>What stage of pregnancy are you in?</label>
        <select
          name="pregnancyStage"
          value={data.pregnancyStage}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          <option value="First trimester">First trimester</option>
          <option value="Second trimester">Second trimester</option>
          <option value="Third trimester">Third trimester</option>
          <option value="Postpartum">Postpartum</option>
        </select>
      </div>

      <div>
        <label>Have you used saffron before your pregnancy?</label>
        <div>
          <input
            type="radio"
            id="previousSaffronYes"
            name="previousSaffronUse"
            value="Yes"
            checked={data.previousSaffronUse === 'Yes'}
            onChange={handleInputChange}
          />
          <label htmlFor="previousSaffronYes">Yes</label>
        </div>
        <div>
          <input
            type="radio"
            id="previousSaffronNo"
            name="previousSaffronUse"
            value="No"
            checked={data.previousSaffronUse === 'No'}
            onChange={handleInputChange}
          />
          <label htmlFor="previousSaffronNo">No</label>
        </div>
      </div>

      <div>
        <label>Are you currently using saffron during your pregnancy?</label>
        <div>
          <input
            type="radio"
            id="saffronUsageYes"
            name="saffronUsageDuringPregnancy"
            value="Yes"
            checked={data.saffronUsageDuringPregnancy === 'Yes'}
            onChange={handleInputChange}
          />
          <label htmlFor="saffronUsageYes">Yes</label>
        </div>
        <div>
          <input
            type="radio"
            id="saffronUsageNo"
            name="saffronUsageDuringPregnancy"
            value="No"
            checked={data.saffronUsageDuringPregnancy === 'No'}
            onChange={handleInputChange}
          />
          <label htmlFor="saffronUsageNo">No</label>
        </div>
      </div>

      <div>
        <label>Do you have any known allergies?</label>
        <textarea
          name="allergies"
          value={data.allergies}
          onChange={handleInputChange}
          placeholder="Please specify"
        />
      </div>
    </div>
  );
};

export default PregnantWomenUses;
