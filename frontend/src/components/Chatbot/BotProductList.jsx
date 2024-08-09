import React from 'react';
import BotProductCard from './BotProductCard';
import { products } from '../../data/Productdata.js';

const BotProductList = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-10">
      {products.map(product => (
        <BotProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default BotProductList;
