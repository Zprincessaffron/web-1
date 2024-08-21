import React from 'react';
import { products } from '../../data/Productdata.js'; 

const ProductList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={product.img} alt={product.name} className="w-full h-48 object-cover"/>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-gray-900 font-semibold mb-2">Price: ₹{product.price}</p>
            <p className="text-gray-600 mb-4">Rating: {product.rating}</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500">
              Edit
            </button>
            <button className="ml-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;