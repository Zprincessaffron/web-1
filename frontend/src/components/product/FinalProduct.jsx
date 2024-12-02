import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/FinalProduct.css";
import { CartContext } from "../../context/CartContext";
import { useUserContext } from "../../context/MainContext";
import axios from "axios";

const FinalProduct = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [itemHover, setItemHover] = useState(false);
  const { isMobile } = useUserContext();

  useEffect(() => {
    // Fetch products from your API
    axios.get("/products").then((res) => {
      // Split the products into four based on variants
      const data = res.data;
      const splitProducts = [
        {
          _id: data[0]._id + "-0", // Unique ID for variant 1 of product 1
          name: `${data[0].name} `,
          price: data[0].variants[0].price,
          weight: data[0].variants[0].weight,
          fullProduct: data[0],
          stock: data[0].variants[0].stock,
          image: data[0].variants[0].img1,
          flipimage: data[0].variants[0].img2,
        },
        {
          _id: data[0]._id + "-1", // Unique ID for variant 2 of product 1
          name: `${data[0].name}`,
          price: data[0].variants[1].price,
          weight: data[0].variants[1].weight,
          fullProduct: data[0],
          stock: data[0].variants[1].stock,
          image: data[0].variants[1].img1,
          flipimage: data[0].variants[1].img2,
        },
        {
          _id: data[1]._id + "-0", // Unique ID for variant 1 of product 2
          name: `${data[1].name} `,
          price: data[1].variants[0].price,
          weight: data[1].variants[0].weight,
          fullProduct: data[1],
          stock: data[1].variants[0].stock,
          image: data[1].variants[0].img1,
          flipimage: data[1].variants[0].img2,
        },
        {
          _id: data[1]._id + "-1", // Unique ID for variant 2 of product 2
          name: `${data[1].name} `,
          price: data[1].variants[1].price,
          weight: data[1].variants[1].weight,
          fullProduct: data[1],
          stock: data[1].variants[1].stock,
          image: data[1].variants[1].img1,
          flipimage: data[1].variants[1].img2,
        },
      ];
      setProducts(splitProducts);
      console.log(splitProducts);
    });
    console.log("products", products);
  }, []);
  const handleProductClick = (product) => {
    // Navigate to product details page with the full product data
    navigate(`/product/${product._id}`, { state: { product } });
  };
  ////BUY NOW////
  const handleBuyNow = (product) => {
    const productToAdd = {
      _id: product._id,
      name: product.name,
      price: product.price,
      weight: product.weight,
      quantity: 1, // Use the updated quantity
    };
    addToCart(productToAdd);
    navigate("/checkout");
  };
  return (
    <div className="product_cards">
      {products.map((product) => (
        <div key={product._id} className="product_card">
          <img
            onClick={() => handleProductClick(product)}
            src={product.image}
          />
          <div className="fp_hovercontent">
            {!isMobile ? (
              <img
                onClick={() => handleProductClick(product)}
                src={product.flipimage}
                alt=""
              />
            ) : (
              ""
            )}
            <h3 onClick={() => handleProductClick(product)}>{product.name}</h3>
            <p onClick={() => handleProductClick(product)}>
              Price: ₹{product.price}
            </p>
            <h4 onClick={() => handleProductClick(product)}>
              Weight: {product.weight}g
            </h4>
            <button onClick={() => handleBuyNow(product)}>Buy Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinalProduct;
