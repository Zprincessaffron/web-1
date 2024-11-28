import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import { useAnalyticsContext } from "./context/AnalyticsContext";
const RevenueByProduct = () => {

  const { revenueData, setRevenueData,fetchRevenueData }=useAnalyticsContext()


  const fetchRevenueDa = async () => {
  
    try {
      let response = await axios.get(
        "/admin/revenue/total-revenue-by-products"
      );
    
    setRevenueData(response.data)
    } catch (error) {
      console.error("Error fetching revenue by product category:", error);
    }
  }

  useEffect(() => {
   
    fetchRevenueDa();
  }, [])
  

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
<div className="rbp-container">
      <div className="rbp-card">
        <h2 className="rbp-title">Revenue by Product Category</h2>
        {revenueData.categories.length ? (
          <div className="rbp-chart">
            <Pie data={data} />
          </div>
        ) : (
          <p className="rbp-message">No Revenue data for the selected date range</p>
        )}
      </div>
    </div>
  )
}
    

export default RevenueByProduct