import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const RevenueByProduct = ({ revenueData }) => {
  const data = {
    labels: revenueData.categories,
    datasets: [
      {
        label: 'Revenue by Product Category',
        data: revenueData.values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-2">Revenue by Product Category</h2>
      <Pie data={data} />
    </div>
  );
};

export default RevenueByProduct;
