import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TotalRevenue = ({ filters }) => {
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        let response;
        if (filters && filters.startDate && filters.endDate) {
          // If filters are provided, include them in the query params
          const { startDate, endDate } = filters;
          response = await axios.get('/admin/revenue/total-revenue', {
            params: { startDate, endDate },
          });
        } else {
          // Fetch total revenue without filters (default case)
          response = await axios.get('/admin/revenue/total-revenue');
        }
        setTotalRevenue(response.data.totalRevenue);
      } catch (error) {
        console.error('Error fetching total revenue:', error);
      }
    };

    fetchTotalRevenue();
  }, [filters]);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-2">Total Revenue</h2>
      <p className="text-3xl font-medium text-black">₹ {totalRevenue}</p>
    </div>
  );
};

export default TotalRevenue;
