import React, { useState } from 'react';
import TotalSales from './TotalSales';
import TopSellingProducts from './TopSellingProducts';
import ActiveUsers from './ActiveUsers';
import SalesOverTime from './SalesOverTime';
import UserGrowth from './UserGrowth';
import RevenueByProduct from './RevenueByProduct';
import AnalyticsFilters from './AnalyticsFilters';

const Analytics = () => {
  const analyticsData = {
    salesData: {
      total: 100000,
      dates: ["Jan", "Feb", "Mar"],
      values: [1000, 2000, 3000],
    },
    users: { active: 1200 },
    topSellingProducts: [
      { name: "Product A", sales: 5000 },
      { name: "Product B", sales: 4000 },
      { name: "Product C", sales: 3000 },
    ],
    salesOverTime: {
      dates: ["Jan", "Feb", "Mar"],
      values: [1000, 2000, 3000],
    },
    userGrowth: {
      dates: ["Jan", "Feb", "Mar"],
      values: [50, 100, 150],
    },
    revenueByProduct: {
      categories: ["Category A", "Category B", "Category C"],
      values: [5000, 3000, 2000],
    },
  };

  const [filteredData, setFilteredData] = useState(analyticsData);

  const handleApplyFilters = (filters) => {
    // Logic to filter analyticsData based on filters
    // For simplicity, we're not implementing the actual filtering here.
    setFilteredData(analyticsData); 
  };

  return (
    <div className="p-6">
      {/* Filters */}
      <AnalyticsFilters onApplyFilters={handleApplyFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Sales */}
        <TotalSales salesData={filteredData.salesData} />

        {/* Active Users */}
        <ActiveUsers users={filteredData.users} />

        {/* Top Selling Products */}
        <TopSellingProducts products={filteredData.topSellingProducts} />

        {/* Sales Over Time */}
        <SalesOverTime salesData={filteredData.salesOverTime} />

        {/* User Growth */}
        <UserGrowth userGrowthData={filteredData.userGrowth} />

        {/* Revenue by Product Category */}
        <RevenueByProduct revenueData={filteredData.revenueByProduct} />
      </div>
    </div>
  );
};

export default Analytics;
