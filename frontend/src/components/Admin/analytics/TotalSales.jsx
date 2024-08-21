import React from 'react';

const TotalSales = ({ salesData }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-2">Total Sales</h2>
      <p className="text-3xl font-semibold">₹{salesData.total}</p>
    </div>
  );
};

export default TotalSales;
