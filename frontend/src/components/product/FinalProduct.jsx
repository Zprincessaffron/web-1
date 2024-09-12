import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/FinalProduct.css'
import product1 from '../../images/product1.jpeg'
import product2 from '../../images/product2.jpg'
import product3 from '../../images/product3.jpg'
import product4 from '../../images/product4.jpg'
import { CartContext } from '../../context/CartContext';

const FinalProduct = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, cartItems } = useContext(CartContext);

  const navigate = useNavigate();
  const [itemHover,setItemHover]=useState(false)

  const productImage={
    "66d2e6ed20b726ac685d2649-0":product1,
  }
  useEffect(() => {
    // Fetch products from your API
    fetch('http://localhost:4040/products')  // replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        // Split the products into four based on variants

        const splitProducts = [
          {
            _id: data[0]._id + "-0",  // Unique ID for variant 1 of product 1
            name: `${data[0].name} `,
            price: data[0].variants[0].price,
            weight: data[0].variants[0].weight,
            fullProduct: data[0],
            stock:data[0].variants[0].stock,
            image:product1
          },
          {
            _id: data[0]._id + "-1",  // Unique ID for variant 2 of product 1
            name: `${data[0].name}`,
            price: data[0].variants[1].price,
            weight: data[0].variants[1].weight,
            fullProduct: data[0],
            stock:data[0].variants[1].stock,
            image:product2

          },
          {
            _id: data[1]._id + "-0",  // Unique ID for variant 1 of product 2
            name: `${data[1].name} `,
            price: data[1].variants[0].price,
            weight: data[1].variants[0].weight,
            fullProduct: data[1],
            stock:data[1].variants[0].stock,
            image:product3

          },
          {
            _id: data[1]._id + "-1",  // Unique ID for variant 2 of product 2
            name: `${data[1].name} `,
            price: data[1].variants[1].price,
            weight: data[1].variants[1].weight,
            fullProduct: data[1],
            stock:data[1].variants[1].stock,
            image:product4

          },
        ];
        setProducts(splitProducts);

      });
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
navigate('/checkout');
};


  return (
    <div className="product_cards" >
      {products.map((product) => (
        <div key={product._id} className="product_card">
<img  onClick={() => handleProductClick(product)} src={product.image} />     
  <div  className='fp_hovercontent'>
  <img  onClick={() => handleProductClick(product)} src={product.image} alt="" />
  <h3  onClick={() => handleProductClick(product)}>{product.name}</h3>
<p  onClick={() => handleProductClick(product)}>Price: ₹{product.price}</p>
<p  onClick={() => handleProductClick(product)}>Weight: {product.weight}g</p>
<button onClick={()=>handleBuyNow(product)}>Buy Now</button>
   </div>
   </div>
      ))}

    </div>


  );
};

export default FinalProduct;