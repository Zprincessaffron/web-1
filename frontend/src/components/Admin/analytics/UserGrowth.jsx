import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const UserGrowth = ({ userGrowthData }) => {
  const data = {
    labels: userGrowthData.dates,
    datasets: [
      {
        label: 'New Users',
        data: userGrowthData.values,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-2">User Growth</h2>
      <Bar data={data} />
    </div>
  );
};

export default UserGrowth;
