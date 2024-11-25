import React from 'react';
import { products } from '../../data/Productdata.js'; 

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
