import React from 'react';
import { products } from '../../data/Productdata.js'; 
import './styles/ProductList.css'
const ProductList = () => {
  return (
    <div className='pl-container'>
      <div className="pl-grid-container">
        {products.map((product) => (
          <div key={product.id} className="pl-product-card">
            <img src={product.img} alt={product.name} className="pl-product-image" />
            <div className="pl-card-content">
              <h3 className="pl-product-name">{product.name}</h3>
              <p className="pl-product-description">{product.description}</p>
              <p className="pl-product-price">Price: ₹{product.price}</p>
              <p className="pl-product-rating">Rating: {product.rating}</p>
              <button className="pl-btn pl-btn-edit">
                Edit
              </button>
              <button className="pl-btn pl-btn-delete">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
