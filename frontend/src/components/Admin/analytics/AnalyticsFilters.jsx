import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns'; // Add date-fns for formatting
import { useAnalyticsContext } from './context/AnalyticsContext';
const AnalyticsFilters = ({ onApplyFilters }) => {
  const { fetchRevenueData,filterByDateRange } = useAnalyticsContext()
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  

  const handleApplyFilters = () => {
    // Format the dates in 'YYYY-MM-DD' format
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    console.log(formattedStartDate)
    console.log(formattedEndDate)

    onApplyFilters({ startDate: formattedStartDate, endDate: formattedEndDate });
    fetchRevenueData(formattedStartDate,formattedEndDate)
    filterByDateRange(formattedStartDate,formattedEndDate)
  };

  const handleResetFilters = () => {
    const defaultStartDate = new Date();
    const defaultEndDate = new Date();

    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
    window.location.reload();

    // Optionally, you can apply the default filter when resetting
    const formattedStartDate = format(defaultStartDate, 'yyyy-MM-dd');
    const formattedEndDate = format(defaultEndDate, 'yyyy-MM-dd');

    onApplyFilters({ startDate: formattedStartDate, endDate: formattedEndDate });
  };

  return (
    <div  id="tailwind-container"  className="p-4 bg-white shadow-lg rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-2">Filters</h2>
      <div className="flex space-x-4">
        <div>
          <label className="block mb-1">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="p-2 border"
          />
        </div>
        <div>
          <label className="block mb-1">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="p-2 border"
          />
        </div>
      </div>
      <div className="mt-4 space-x-4 flex justify-start">
        <button
          onClick={handleApplyFilters}
          className="px-4 py-2 bg-blue-500 text-white"
        >
          Apply Filters
        </button>
        <button
          onClick={handleResetFilters}
          className="px-4 py-2 bg-gray-300 text-black"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default AnalyticsFilters;
