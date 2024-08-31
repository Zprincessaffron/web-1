import React from 'react';
import BotProductCard from './BotProductCard';
import { products } from '../../data/Productdata.js';
import '../../styles/chatbot.css'; // Import the CSS file

const BotProductList = () => {
  return (
    <div className="bot-product-list-container">
      {products.map(product => (
        <BotProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default BotProductList;
