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
              <button className="pl_btn_edit" style={{color:"black",backgroundColor:"gray", padding:"7px 20px",borderRadius:"20px",margin:'5px'}}>
                Edit
              </button>
              <button className="pl_btn_delete" style={{color:"black",backgroundColor:"lightpink", padding:"7px 20px",borderRadius:"20px",margin:'5px'}}>
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
