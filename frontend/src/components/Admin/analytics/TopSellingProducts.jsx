import React from 'react';

const TopSellingProducts = ({ products }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-2">Top Selling Products</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index} className="flex justify-between">
            <span>{product.name}</span>
            <span>₹{product.sales}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellingProducts;
