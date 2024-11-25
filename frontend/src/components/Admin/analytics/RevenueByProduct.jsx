import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

const RevenueByProduct = ({ filters }) => {
  const [revenueData, setRevenueData] = useState({
    categories: [],
    values: [],
  });

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        let response;
        if (filters && filters.startDate && filters.endDate) {
          // Include the filters in the query parameters if they exist
          response = await axios.get(
            "/admin/revenue/total-revenue-by-products",
            {
              params: {
                startDate: filters.startDate,
                endDate: filters.endDate,
              },
            }
          );
        } else {
          // Fetch data without filters (default)
          response = await axios.get(
            "/admin/revenue/total-revenue-by-products"
          );
        }
        setRevenueData(response.data); // Set the fetched revenue data
      } catch (error) {
        console.error("Error fetching revenue by product category:", error);
      }
    };

    fetchRevenueData();
  }, [filters]); // Re-fetch the data whenever the filters change

  const data = {
    labels: revenueData.categories,
    datasets: [
      {
        label: "Revenue by Product Category",
        data: revenueData.values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="tailwind-container">
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-2">Revenue by Product Category</h2>
      {revenueData.categories.length ? (
        <div className="relative h-[300px]">
          <Pie data={data} />
        </div>
      ) : (
        <p className="text-sm font-semibold text-black tracking-wider">
          No Revenue data for the selected date range{" "}
        </p>
      )}
    </div>
    </div>
  )
}
    
