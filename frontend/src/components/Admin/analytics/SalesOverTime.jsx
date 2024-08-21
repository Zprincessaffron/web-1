import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const SalesOverTime = ({ salesData }) => {
  const data = {
    labels: salesData.dates,
    datasets: [
      {
        label: 'Sales Over Time',
        data: salesData.values,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-2">Sales Over Time</h2>
      <Line data={data} />
    </div>
  );
};

export default SalesOverTime;
