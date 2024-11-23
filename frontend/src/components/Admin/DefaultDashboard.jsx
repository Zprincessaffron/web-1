import React, { useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import './styles/DefaultDashboard.css'
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
  ArcElement,
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

const DefaultDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Sample data for Line Chart
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales',
        data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
        borderColor: darkMode ? '#9d4edd' : '#8884d8',
        backgroundColor: darkMode
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
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: '#4bc0c0',
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
        backgroundColor: darkMode
          ? ['#ff6b6b', '#4ecdc4', '#f9ca24', '#d1d8e0']
          : ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
        borderColor: darkMode ? '#343a40' : '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`dd-container ${darkMode ? 'dd-dark' : 'dd-light'}`}>
      <button
        className="dd-toggle-mode"
        onClick={() => setDarkMode(!darkMode)}
      >
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
      <h2 className="dd-title">Analytics Overview</h2>
      <div className="dd-grid">
        <div className="dd-chart-card">
          <h3 className="dd-chart-title">Sales Data</h3>
          <Line data={lineChartData} options={{ responsive: true }} />
        </div>
        <div className="dd-chart-card">
          <h3 className="dd-chart-title">Revenue Data</h3>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>
        <div className="dd-chart-card">
          <h3 className="dd-chart-title">Top Selling Products</h3>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default DefaultDashboard;
