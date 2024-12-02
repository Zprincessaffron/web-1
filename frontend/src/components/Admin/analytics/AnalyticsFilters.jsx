import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns'; // Add date-fns for formatting
import { useAnalyticsContext } from './context/AnalyticsContext';
const AnalyticsFilters = ({ onApplyFilters }) => {
  const { fetchRevenueData,filterByDateRange } = useAnalyticsContext()
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState("");


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
  function handleQuater(){
    const now = new Date();
    const year = now.getFullYear();
    // Start date of the year (January 1st)
    const startDate = new Date(year, 0, 1);
  
    // End date of March (March 31st)
    const marchEndDate = new Date(year, 2, 31);
   
   setTimeout(() => {
    setStartDate(startDate)
    setEndDate(marchEndDate)

   }, 200);
  }
  function handleHalf(){
    const currentYear = new Date().getFullYear();

    // Create the start date for January 1st of the current year
    const startDate = new Date(currentYear, 0, 1); // January is 0

    // Create the end date for June 30th of the current year
    const endDate = new Date(currentYear, 5, 30); 
    setTimeout(() => {
      setStartDate(startDate)
      setEndDate(endDate)
  
     }, 200);
  }
  function handleThisYear(){
    const now = new Date();
    const year = now.getFullYear();
    // Start date of the year (January 1st)
    const startDate = new Date(year, 0, 1);
  
    // End date of March (March 31st)
    const endDate = new Date(year, 11, 31);
    setTimeout(() => {
      setStartDate(startDate)
      setEndDate(endDate)
  
     }, 200);
  }
  const handleMonthChange = (event) => {
    const month = event.target.value
    const currentYear = new Date().getFullYear();

    // Create the start date for January 1st of the current year
    const startDate = new Date(currentYear, 0, 1); // January is 0

    // Create the end date for June 30th of the current year
    const endDate = new Date(currentYear, month, 31); 
    setTimeout(() => {
      setStartDate(startDate)
      setEndDate(endDate)
  
     }, 200);
    


  };
  console.log(selectedMonth)
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
        <div className='af_filterbtn'>
          <div>
            <button className='quater_btn' onClick={handleQuater}>Quater</button>
          </div>
          <div>
          <button className='half_btn'onClick={handleHalf}>Half-Yearly</button>

          </div>
          <button className='year_btn' onClick={handleThisYear}>This Year</button>

</div>
          <div>
          <label htmlFor="monthSelect">Select a Month: </label>
      <select
        id="monthSelect"
        value={selectedMonth}
        onChange={handleMonthChange}
      >
        <option value="" disabled>
          Select Month
        </option>
        <option value="0">January</option>
        <option value="1">February</option>
        <option value="2">March</option>
        <option value="3">April</option>
        <option value="4">May</option>
        <option value="5">June</option>
        <option value="6">July</option>
        <option value="7">August</option>
        <option value="8">September</option>
        <option value="9">October</option>
        <option value="10">November</option>
        <option value="11">December</option>
      </select>

          </div>
          <div>
         

        
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
