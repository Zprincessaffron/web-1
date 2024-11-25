import React, { useState, useEffect } from 'react';
import axios from 'axios';
import saffron1 from "../../assets/Images/saffron-1.jpg";
import saffron2 from "../../assets/Images/saffron-2.jpg";
import './styles/ProductList.css'
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    description: '',
    content: '',
    variants: [{ weight: '', price: '', stock: '' }],
    rating : ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products'); // Adjust the endpoint as needed
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setEditProduct(product);
    setEditedProduct({ ...product });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = [...editedProduct.variants];
    newVariants[index] = { ...newVariants[index], [name]: value };
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      variants: newVariants
    }));
  };

  const handleAddVariant = () => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      variants: [...prevProduct.variants, { weight: '', price: '', stock: '' }]
    }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(`/products/${editProduct._id}`, editedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === response.data._id ? response.data : product
        )
      );
      setEditProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCancelClick = () => {
    setEditProduct(null);
  };

  const getProductImage = (index) => {
    // Use different images for different products based on index or some identifier
    return index % 2 === 0 ? saffron1 : saffron2;
  };

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
