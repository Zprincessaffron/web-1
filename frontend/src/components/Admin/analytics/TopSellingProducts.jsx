import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TopSellingProducts = ({ filters }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTopSellingProductsByWeight = async () => {
      try {
        let response;
        if (filters && filters.startDate && filters.endDate) {
          // If filters are provided, include them in the query params
          const { startDate, endDate } = filters;
          response = await axios.get('/admin/products/top-selling-products-by-weight', {
            params: { startDate, endDate },
          });
        } else {
          // Fetch top-selling products without filters (default case)
          response = await axios.get('/admin/products/top-selling-products-by-weight');
        }
        setProducts(response.data); // Set the fetched products to state
      } catch (error) {
        console.error('Error fetching top-selling products by weight:', error);
      }
    };

    fetchTopSellingProductsByWeight();
  }, [filters]); // Re-fetch products whenever filters change

  return (
    <div className="tailwind-container">
    <div  className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-2">Top Selling Products</h2>
      <ul>
        {products.length > 0 ? (
          products.map((product, index) => (
            <li key={index} className="flex justify-between text-sm tracking-wider">
              <span>{product._id.name} - {product._id.weight}g</span>
              <span>{product.totalQuantity} sold</span>
            </li>
          ))
        ) : (
          <li>No products found for the selected date range</li>
        )}
      </ul>
    </div>
   </div>
  );
};

export default TopSellingProducts;
