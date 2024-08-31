import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/chatbot.css'; // Import the CSS file

const BotProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-image">
        <img
          src={product.img}
          alt={product.name}
          className="image-content"
        />
      </div>
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-overlay">
          Click to Know more
        </div>
      </div>
    </div>
  );
};

export default BotProductCard;
