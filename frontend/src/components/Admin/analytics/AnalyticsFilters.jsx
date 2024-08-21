import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AnalyticsFilters = ({ onApplyFilters }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedProduct, setSelectedProduct] = useState('All Products');

  const handleApplyFilters = () => {
    onApplyFilters({ startDate, endDate, selectedProduct });
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-2">Filters</h2>
      <div className="flex space-x-4">
        <div>
          <label className="block mb-1">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Product:</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="All Products">All Products</option>
            <option value="Product A">Product A</option>
            <option value="Product B">Product B</option>
            <option value="Product C">Product C</option>
          </select>
        </div>
      </div>
      <button
        onClick={handleApplyFilters}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default AnalyticsFilters;
