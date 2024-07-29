import React, { useEffect, useState } from 'react'
import { products as allProducts } from '../data/Productdata.js';
import axios from 'axios';

const Products = () => {
  const [productData, setProductData] = useState([]);
  const [userRecommendations, setUserRecommendations] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/profile');
        const userData = response.data;
        if (userData && userData.recommendations) {
          setUserRecommendations(userData.recommendations);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const updatedProducts = allProducts.map(product => {
      if (userRecommendations.length > 0) {
        const matchCount = product.category.filter(category => userRecommendations.includes(category)).length+1;
        const matchPercentage = (matchCount / userRecommendations.length) * 100;
        return {
          ...product,
          matchPercentage: matchPercentage.toFixed(0)
        };
      } else {
        return {
          ...product,
          matchPercentage: 0
        };
      }
    });
    setProductData(updatedProducts);
  }, [userRecommendations]);

  return (
    <div className='product-card'>
      {productData.map((product) => (
        <div className='product' key={product.id}>
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <p>Rs {product.price}</p>
          <p>{product.rating} rating</p>
          <p>
            {product.matchPercentage > 0 ? (
              <span>This product matches {product.matchPercentage}% for your useCases</span>
            ) : (
              <span>Enroll your details to know your matching product</span>
            )}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Products
