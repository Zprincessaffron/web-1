import React from 'react';
import { useAnalyticsContext } from './context/AnalyticsContext';

const TotalSales = ({ salesData }) => {
  const { revenueData } = useAnalyticsContext()
  console.log("data from total sales",revenueData)
  return (
    <div className="tailwind-container">
    <div  className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-2">Total Sales</h2>
      <p className="text-3xl font-semibold">₹{revenueData.values.reduce((acc, curr) => acc + curr, 0)}</p>
    </div>
   </div>
  );
};

export default TotalSales;
