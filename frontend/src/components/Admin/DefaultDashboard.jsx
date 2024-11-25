import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";
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
} from "chart.js";

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

import './styles/DefaultDashboard.css';

const DefaultDashboard = ({ isDarkMode }) => {
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  const fetchData = async (year) => {
    setLoading(true);
    try {
      const response = await axios.get(`/admin/default-analytics?year=${year}`);
      const { salesData, revenueData, productSales } = response.data || {};
      console.log(response.data);

      // Prepare data for Line Chart (Sales Data)
      setLineChartData({
        labels: Object.keys(salesData || {}),
        datasets: [
          {
            label: `Sales - ${year}`,
            data: Object.values(salesData || {}),
            borderColor: isDarkMode ? "#9d4edd" : "#8884d8",
            backgroundColor: isDarkMode
              ? "rgba(157, 77, 237, 0.2)"
              : "rgba(136, 132, 216, 0.2)",
          },
        ],
      });

      // Prepare data for Bar Chart (Revenue Data)
      setBarChartData({
        labels: Object.keys(revenueData || {}),
        datasets: [
          {
            label: `Revenue - ${year}`,
            data: Object.values(revenueData || {}),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "#4bc0c0",
            borderWidth: 1,
          },
        ],
      });

      // Prepare data for Pie Chart (Top Selling Products)
      const products = (Array.isArray(productSales) ? productSales : [])
        .filter((product) => product.name && product.quantity)
        .map((product) => ({
          name: product.name,
          quantity: product.quantity,
        }));

      setPieChartData({
        labels: products.map((product) => product.name),
        datasets: [
          {
            label: "Top Selling Products",
            data: products.map((product) => product.quantity),
            backgroundColor: isDarkMode
              ? ["#ff6b6b", "#4ecdc4", "#f9ca24", "#d1d8e0"]
              : ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"],
            borderColor: isDarkMode ? "#343a40" : "#fff",
            borderWidth: 1,
          },
        ],
      });
      console.log(pieChartData)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentYear);
  }, [isDarkMode, currentYear]);

  const handlePrevYear = () => {
    setCurrentYear((prevYear) => prevYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear((prevYear) => prevYear + 1);
  };

  return (
    <div className={`dd-container ${isDarkMode ? 'dd-container-dark' : ''}`}>
      <h2 className={`dd-heading ${isDarkMode ? 'dd-heading-dark' : ''}`}>Analytics Overview</h2>

      <div className="dd-year-navigation">
        <button onClick={handlePrevYear}>Previous Year</button>
        <span>{currentYear}</span>
        <button onClick={handleNextYear}>Next Year</button>
      </div>

      {loading ? (
        <div className="dd-loading">Loading data...</div>
      ) : (
        <div className="dd-grid">
          {/* Line Chart */}
          <div className={`dd-card ${isDarkMode ? 'dd-card-dark' : ''}`}>
            <h3 className={`dd-card-heading ${isDarkMode ? 'dd-card-heading-dark' : ''}`}>Sales Data</h3>
            <Line data={lineChartData} options={{ responsive: true }} />
          </div>

          {/* Bar Chart */}
          <div className={`dd-card ${isDarkMode ? 'dd-card-dark' : ''}`}>
            <h3 className={`dd-card-heading ${isDarkMode ? 'dd-card-heading-dark' : ''}`}>Revenue Data</h3>
            <Bar data={barChartData} options={{ responsive: true }} />
          </div>

          {/* Pie Chart */}
          <div className={`dd-card ${isDarkMode ? 'dd-card-dark' : ''}`}>
            <h3 className={`dd-card-heading ${isDarkMode ? 'dd-card-heading-dark' : ''}`}>Top Selling Products</h3>
            <Pie data={pieChartData} options={{ responsive: true }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DefaultDashboard;
