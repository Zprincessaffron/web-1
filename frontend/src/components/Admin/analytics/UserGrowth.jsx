import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const UserGrowth = ({ filters }) => {
  const [userGrowthData, setUserGrowthData] = useState({
    labels: [],
    userCounts: [],
    wholesalerCounts: [],
  });

  useEffect(() => {
    const fetchUserGrowthData = async () => {
      try {
        let response;
        if (filters && filters.startDate && filters.endDate) {
          // Send filters as query parameters if provided
          response = await axios.get("/admin/users/user-growth", {
            params: { startDate: filters.startDate, endDate: filters.endDate },
          });
        } else {
          // Fetch data without filters (default)
          response = await axios.get("/admin/users/user-growth");
        }
        setUserGrowthData(response.data);
      } catch (error) {
        console.error("Error fetching user growth data:", error);
      }
    };

    fetchUserGrowthData();
  }, [filters]); // Re-fetch data whenever the filters change

  const data = {
    labels: userGrowthData.labels,
    datasets: [
      {
        label: "New Users",
        data: userGrowthData.userCounts,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "New Wholesalers",
        data: userGrowthData.wholesalerCounts,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="tailwind-container">
    <div   className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-2">User Growth</h2>
      {userGrowthData.labels.length > 0 ? (
        <div className="relative h-[300px]">
          <Bar data={data} />
        </div>
      ) : (
        <p className="text-sm font-semibold text-black tracking-wider">
          No user data for the selected date range{" "}
        </p>
      )}
    </div>
   </div>
  );
};

export default UserGrowth;
