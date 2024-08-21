import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DefaultDashboard = ({ isDarkMode }) => {
  // Sample data for Line Chart
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales',
        data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
        borderColor: isDarkMode ? '#9d4edd' : '#8884d8',
        backgroundColor: isDarkMode
          ? 'rgba(157, 77, 237, 0.2)'
          : 'rgba(136, 132, 216, 0.2)',
      },
    ],
  };

  // Sample data for Bar Chart
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
        data: [5000, 4000, 3000, 4500, 3200, 2900, 4000],
        backgroundColor: isDarkMode
          ? 'rgba(75, 192, 192, 0.6)'
          : 'rgba(75, 192, 192, 0.6)',
        borderColor: isDarkMode ? '#4bc0c0' : '#4bc0c0',
        borderWidth: 1,
      },
    ],
  };

  // Sample data for Pie Chart (Top Selling Products)
  const pieChartData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [
      {
        label: 'Top Selling Products',
        data: [300, 250, 200, 150],
        backgroundColor: isDarkMode
          ? ['#ff6b6b', '#4ecdc4', '#f9ca24', '#d1d8e0']
          : ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
        borderColor: isDarkMode ? '#343a40' : '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`p-6 ${isDarkMode ? 'bg-gray-900 text-gray-800' : 'bg-white text-gray-800'}`}>
      <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>Analytics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="p-4 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:text-gray-200">
          <h3 className="text-xl font-semibold mb-4">Sales Data</h3>
          <Line data={lineChartData} options={{ responsive: true }} />
        </div>

        {/* Bar Chart */}
        <div className="p-4 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:text-gray-200">
          <h3 className="text-xl font-semibold mb-4">Revenue Data</h3>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>

        {/* Pie Chart (Top Selling Products) */}
        <div className="p-4 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:text-gray-200">
          <h3 className="text-xl font-semibold mb-4">Top Selling Products</h3>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default DefaultDashboard;
