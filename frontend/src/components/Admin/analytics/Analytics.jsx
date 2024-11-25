import React, { useState } from 'react';
import TotalRevenue from './TotalRevenue';
import TopSellingProducts from './TopSellingProducts';
import TotalUsers from './TotalUsers';
import SalesOverTime from './SalesOverTime';
import UserGrowth from './UserGrowth';
import RevenueByProduct from './RevenueByProduct';
import AnalyticsFilters from './AnalyticsFilters';
import axios from 'axios';

import '../styles/Analytics.css'; // Import the external CSS file

const Analytics = () => {
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
  });

  const handleApplyFilters = (filterData) => {
    setFilters(filterData); // Set filters from the child component
    console.log("Filters applied:", filterData); // Debugging applied filters
  };
  const [data, setData] = useState({});

  // const handleApplyFilters = async ({ startDate, endDate }) => {
  //   setFilters({ startDate, endDate });
  //   console.log({ startDate, endDate })

  //   try {
  //     const response = await axios.post('/admin/users/analytics', {
  //       startDate,
  //       endDate,
  //     });
  //     setData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching analytics data:', error);
  //   }
  // };

  return (
    <div className="analytics-container">
      <div className="p-6">
        {/* Filters */}
        <AnalyticsFilters onApplyFilters={handleApplyFilters} />

        <div className="analytics-grid mb-4">
          {/* Total Sales */}
          <TotalRevenue filters={filters} totalRevenue={data.totalRevenue}  />

          {/* Total Users */}
          <TotalUsers filters={filters} totalUsers={data.totalUsers}  />

          {/* Top Selling Products */}
          <TopSellingProducts filters={filters} products={data.topSellingProducts} />
      </div>
      <div className="grid grid-cols-1  gap-6">
          {/* Sales Over Time */}
          <SalesOverTime filters={filters} salesData={data.salesRevenueOverTime} />

          {/* User Growth */}
          <UserGrowth filters={filters} userGrowthData={data.userGrowth} />

          {/* Revenue by Product Category */}
          <RevenueByProduct filters={filters} revenueData={data.revenueByProductCategory} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;

