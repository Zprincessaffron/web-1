import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const SalesOverTime = ({ filters }) => {
  const [salesData, setSalesData] = useState({ labels: [], salesValues: [], revenueValues: [] });
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const params = filters && filters.startDate && filters.endDate
          ? { startDate: filters.startDate, endDate: filters.endDate }
          : {};

        const response = await axios.get('/admin/users/sales-and-revenue', { params });
        setSalesData(response.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, [filters]);

  const filteredData = {
    labels: salesData.labels.filter(label => label.includes(currentYear)),
    salesValues: salesData.salesValues.slice(0, salesData.labels.filter(label => label.includes(currentYear)).length),
    revenueValues: salesData.revenueValues.slice(0, salesData.labels.filter(label => label.includes(currentYear)).length),
  };

  const data = {
    labels: filteredData.labels,
    datasets: [
      {
        label: 'Total Sales',
        data: filteredData.salesValues,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        yAxisID: 'y-axis-sales',
      },
      {
        label: 'Total Revenue',
        data: filteredData.revenueValues,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        yAxisID: 'y-axis-revenue',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Maintain aspect ratio for responsiveness
    scales: {
      yAxes: [
        {
          id: 'y-axis-sales',
          type: 'linear',
          position: 'left',
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'Sales (Units)',
          },
        },
        {
          id: 'y-axis-revenue',
          type: 'linear',
          position: 'right',
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'Revenue ($)',
          },
        },
      ],
    },
  };

  const handlePrevYear = () => setCurrentYear(prevYear => prevYear - 1);
  const handleNextYear = () => setCurrentYear(prevYear => prevYear + 1);

  return (
    <div className="tailwind-container">
    <div  className="p-4 bg-white shadow-lg rounded-lg h-auto max-h-[500px] overflow-hidden">
      <h2 className="text-xl font-normal mb-2 font-sans">Sales and Revenue for {currentYear}</h2>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevYear}
          className="px-4 py-2 bg-gray-200 text-black"
          disabled={currentYear <= Math.min(...salesData.labels.map(label => parseInt(label.slice(-4), 10)))}
        >
          Previous Year
        </button>
        <button
          onClick={handleNextYear}
          className="px-4 py-2 bg-gray-200 text-black"
          disabled={currentYear >= Math.max(...salesData.labels.map(label => parseInt(label.slice(-4), 10)))}
        >
          Next Year
        </button>
      </div>
      {filteredData.labels.length ? (
        <div className="relative h-[300px]"> {/* Set a fixed height for the chart container */}
          <Bar data={data} options={options} />
        </div>
      ) : (
        <p className="text-sm font-semibold text-black tracking-wider">
          No sales data for {currentYear}
        </p>
      )}
    </div>
    </div>
  );
};

export default SalesOverTime;
