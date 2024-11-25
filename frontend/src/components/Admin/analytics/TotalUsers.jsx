import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TotalUsers = ({ filters }) => {
  const [data, setData] = useState({
    totalUsers: 0,
    totalWholesalers: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchTotalUsersAndWholesalers = async () => {
      try {
        // If filters (startDate, endDate) are passed, use them in the query
        const params = filters && filters.startDate && filters.endDate
          ? { startDate: filters.startDate, endDate: filters.endDate }
          : {}; // Send empty params if no filters
        
        const response = await axios.get('/admin/users/total-users', { params });

        // Set the data from the response
        setData({
          totalUsers: response.data.totalUsers,
          totalWholesalers: response.data.totalWholesalers,
          total: response.data.total,
        });
      } catch (error) {
        console.error('Error fetching total users and wholesalers:', error);
      }
    };

    fetchTotalUsersAndWholesalers();
  }, [filters]); // Rerun the effect whenever filters change

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Total Users and Wholesalers</h2>
      <div className="mb-2 ">
        <p className="text-sm tracking-wider text-black">Total Users : <span className="text-lg font-medium">{data.totalUsers}</span></p>
        <p className="text-sm tracking-wider text-black">Total Wholesalers : <span className="text-lg font-medium">{data.totalWholesalers}</span></p>
      </div>
      <div className="text-md tracking-wider">
        <strong>Total Combined: </strong>
        <span className="text-xl font-bold text-black">{data.total}</span>
      </div>
    </div>
  );
};

export default TotalUsers;
