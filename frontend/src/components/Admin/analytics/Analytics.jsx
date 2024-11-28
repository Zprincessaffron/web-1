import React, { useState } from 'react';
import TotalRevenue from './TotalRevenue';
import TopSellingProducts from './TopSellingProducts';
import TotalUsers from './TotalUsers';
import SalesOverTime from './SalesOverTime';
import UserGrowth from './UserGrowth';
import RevenueByProduct from './RevenueByProduct';
import AnalyticsFilters from './AnalyticsFilters';
import axios from 'axios';
import TotalSales from './TotalSales.jsx'
import ActiveUsers from './ActiveUsers.jsx'

import '../styles/Analytics.css'; // Import the external CSS file
import '../styles/Analytics.css'; // Import the external CSS file
import { useAnalyticsContext } from './context/AnalyticsContext.jsx';
const Analytics = () => {
  const { filteredData,setFilteredData,analyticsData } =useAnalyticsContext()

  const handleApplyFilters = (filters) => {
    // Logic to filter analyticsData based on filters
    // For simplicity, we're not implementing the actual filtering here.
    setFilteredData(analyticsData); 
  };
console.log("filterd data",filteredData)


  return (
    <div className="analytics-container">
      <div className="p-6">
        {/* Filters */}
        <AnalyticsFilters onApplyFilters={handleApplyFilters}/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Sales */}
      <div className=''>
      <TotalSales salesData={filteredData.salesData} />

{/* Active Users */}
<ActiveUsers users={filteredData.users} />
      </div>

        {/* Top Selling Products */}
        <TopSellingProducts products={filteredData.topSellingProducts} />

        {/* Sales Over Time */}
      
       <SalesOverTime salesData={filteredData.salesOverTime} />

{/* User Growth */}
<div className='a_con'>
<UserGrowth userGrowthData={filteredData.userGrowth} />

{/* Revenue by Product Category */}
<RevenueByProduct revenueData={filteredData.revenueByProduct} />
       </div>
      </div>
    </div>
    </div>
  );
};

export default Analytics;

