import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const SalesComparison = ({ labels, revenueValues, salesValues }) => {
  const [selectedYear, setSelectedYear] = useState('2024'); // Default year
  const [comparisonType, setComparisonType] = useState(''); // '' for no comparison, 'monthly', 'quarterly', etc.
  const [compareYear1, setCompareYear1] = useState(''); // First year for comparison
  const [compareYear2, setCompareYear2] = useState(''); // Second year for comparison

  // Prepare data
  const data = labels.map((label, index) => {
    const [month, year] = label.split(' ');
    return { month, year, revenue: revenueValues[index], sales: salesValues[index] };
  });

  // Filter data for selected year(s)
  const filteredData = data.filter(
    (item) =>
      (!compareYear1 && !compareYear2 && item.year === selectedYear) ||
      (compareYear1 && compareYear2 && (item.year === compareYear1 || item.year === compareYear2))
  );

  // Group data by interval
  const groupData = (interval) => {
    switch (interval) {
      case 'monthly':
        return filteredData.map((item) => ({
          label: `${item.month} ${item.year}`,
          revenue: item.revenue,
          sales: item.sales,
        }));

      case 'quarterly':
      case 'half-yearly':
      case 'yearly':
        const grouped = filteredData.reduce((acc, curr) => {
          const key =
            interval === 'quarterly'
              ? `Q${Math.ceil(new Date(curr.month + ' 1').getMonth() / 3)} ${curr.year}`
              : interval === 'half-yearly'
              ? new Date(curr.month + ' 1').getMonth() < 6
                ? `H1 ${curr.year}`
                : `H2 ${curr.year}`
              : curr.year;

          if (!acc[key]) acc[key] = { revenue: 0, sales: 0 };
          acc[key].revenue += curr.revenue;
          acc[key].sales += curr.sales;
          return acc;
        }, {});

        return Object.entries(grouped).map(([key, value]) => ({
          label: key,
          ...value,
        }));

      default:
        return [];
    }
  };

  // Generate chart data
  const generateChartData = (interval) => {
    const groupedData = groupData(interval);
    const labels = groupedData.map((item) => item.label);
    const revenueData = groupedData.map((item) => item.revenue);
    const salesData = groupedData.map((item) => item.sales);

    return {
      labels,
      datasets: [
        {
          label: 'Revenue (Bar)',
          type: 'bar',
          data: revenueData,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Sales (Bar)',
          type: 'bar',
          data: salesData,
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
        {
          label: 'Revenue Trend (Line)',
          type: 'line',
          data: revenueData,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: false,
          borderWidth: 2,
          tension: 0.3, // Adds a curve to the line
        },
        {
          label: 'Sales Trend (Line)',
          type: 'line',
          data: salesData,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: false,
          borderWidth: 2,
          tension: 0.3,
        },
      ],
    };
  };
  const years = [...new Set(labels.map((label) => label.split(' ')[1]))];

  return (
    <div>
      <h2>Sales and Revenue Comparison</h2>

      {/* Year Selection */}
      <div>
        <label htmlFor="year-select">Select Year: </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          disabled={compareYear1 && compareYear2}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Year Comparison */}
      <div>
        <h4>Compare Years:</h4>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <label htmlFor="compare-year1">Year 1:</label>
          <select
            id="compare-year1"
            value={compareYear1}
            onChange={(e) => setCompareYear1(e.target.value)}
          >
            <option value="">-- Select Year --</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <label htmlFor="compare-year2">Year 2:</label>
          <select
            id="compare-year2"
            value={compareYear2}
            onChange={(e) => setCompareYear2(e.target.value)}
          >
            <option value="">-- Select Year --</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Type */}
      <div>
        <label htmlFor="comparison-select">Select Comparison Type: </label>
        <select
          id="comparison-select"
          value={comparisonType}
          onChange={(e) => setComparisonType(e.target.value)}
        >
          <option value="">-- Select Comparison Type --</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="half-yearly">Half-Yearly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Render Chart */}
      {comparisonType && (
        <div>
          <h3>{`${comparisonType.charAt(0).toUpperCase()}${comparisonType.slice(
            1
          )} Comparison`}</h3>
          <Bar data={generateChartData(comparisonType)} />
        </div>
      )}
    </div>
  );
};

export default SalesComparison;
