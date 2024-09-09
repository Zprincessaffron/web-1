import React, { useContext, useEffect, useState } from 'react';
import '../../styles/ProductPage.css';
import axios from 'axios';
import pp_back from '/pp_back4.jpg';
import product1 from '/saffron-1.jpg';
import product2 from '/saffron-2.jpg';
import CartIcon from './CartIcon';
import CartModel from './CartModel';
import { CartContext } from '../../context/CartContext';
import { userContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../navbar/NavBar';
import SideBar from '../sidebar/SideBar';
import MenuSlider from '../sidebar/MenuSlider';

function ProductPage() {
    const [scaleImg, setScaleImg] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [height, setHeight] = useState(true);
    const [showSecondPage, setShowSecondPage] = useState(false);
    const [grams, setGrams] = useState('2'); // Default to 2 grams
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addToCart, cartItems } = useContext(CartContext);
    const { user } = useContext(userContext);
    const [productData, setProductData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setScaleImg(true);
        }, 100);
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 20) {
                setShowSecondPage(true);
            } else {
                setShowSecondPage(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [scrollToTop, setScrollToTop] = useState(false);

    useEffect(() => {
        if (scrollToTop) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setScrollToTop(false);
        }
    }, [scrollToTop]);

    function handleProduct(index) {
        setSelectedProduct(productData[index]);
        setScrollToTop(true);
    }

    function handleQuantityInc() {
        setQuantity(quantity + 1);
    }

    function handleQuantityDec() {
        const defaultQuantity = getDefaultQuantity(grams);
        if (quantity > defaultQuantity) {
            setQuantity(quantity - 1);
        }
    }

    useEffect(() => {
        axios.get('/products')
            .then(response => {
                setProductData(response.data);
                if (response.data.length > 0) {
                    setSelectedProduct(response.data[0]);
                }
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, []);

    const handleVariantChange = (weight) => {
        setGrams(weight);
        setQuantity(getDefaultQuantity(weight)); // Reset quantity based on role and weight
    };

    const selectedVariant = selectedProduct?.variants.find(v => v.weight.toString() === grams);

    // Determine quantity for wholesalers
    const getDefaultQuantity = (weight) => {
        if (user?.role === 'wholesaler') {
            return weight === '2' ? 5 : 2; // Adjust based on weight and user role
        }
        return 1;
    };

    const handleAddToCart = () => {
        if (selectedProduct && selectedVariant) {
            const productToAdd = {
                _id: selectedVariant._id,
                name: selectedProduct.name,
                img: selectedProduct.img || (selectedProduct._id === "66d2e6ed20b726ac685d2649" ? product1 : product2),
                price: selectedVariant.price || 0,
                weight: grams,
                quantity: quantity, // Use the updated quantity
            };
            addToCart(productToAdd);
        } else {
            console.error('Selected product or variant is missing');
        }
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/checkout');
    };

    return (
        <div className='pp_main'>
          <Navbar/>
          <SideBar/>
          <MenuSlider/>
               {selectedProduct && (
              
                <div className='pp_div1' style={{ backgroundImage: `url(${pp_back})` }}>
                    <div className='pp_div11'>
                        <div className='pp_content'>
                            <h1 style={{ color: "white", fontSize: "2rem", paddingBottom: "10px", textTransform: "uppercase",letterSpacing:"0.1rem" }}>{selectedProduct.name || 'Product Name'}</h1>
                            <div className={`pp_div11_1 ${height ? "true" : "false"}`}>
                                <p>{selectedProduct.description || 'Product Description'}
                                  <br />
                                  <br />
                                  {selectedProduct.content || 'Product Content'}
                                </p>
                                <button className='pp_viewmore' onClick={() => { setHeight(!height) }}>{height ? "Hide" : "View More"}</button>
                            </div>

                            <div className='pp_div11_2'>
                                <h2>Grams: </h2>
                                {selectedProduct.variants.map((variant, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleVariantChange(variant.weight.toString())}
                                        className={grams === variant.weight.toString() ? 'selected' : ''}
                                    >
                                        {variant.weight} gram
                                    </button>
                                ))}
                            </div>
                            <div className='pp_div11_3'>
                                <h1>In Stock</h1>
                                <h2>({selectedVariant?.stock || 0} Boxes Available)</h2>
                            </div>
                            <div>
                                <h2 style={{ color: "white", paddingTop: "10px" }}>
                                    Price Rs.{selectedVariant?.price || 0}
                                </h2>
                            </div>
                            <div className='pp_div11_7'>
                                {/* <StarProduct/> */}
                            </div>
                            <div className='pp_div11_6'>
                                <div className='pp_div11_4'>
                                    <button className='pp_btn_min' onClick={handleQuantityDec}>-</button>
                                    {quantity}
                                    <button className='pp_btn_plus' onClick={handleQuantityInc}>+</button>
                                </div>
                                <div className='pp_div11_5'>
                                    <button onClick={handleAddToCart}>Add to Cart</button>
                                    <button onClick={handleBuyNow}>Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pp_image'>
                        {/* <img
                            src={selectedProduct.image || (selectedProduct._id === "66d2e6ed20b726ac685d2649" ? product1 : product2)}
                            alt={selectedProduct.name || "Product Image"}
                            width={600}
                            height={400}
                        /> */}
                    </div>
                    <div>
                        {showSecondPage ? (
                            <div className={`pp_div2 ${showSecondPage ? 'true' : 'false'}`}>
                                <div onClick={() => handleProduct(0)}>
                                    <h1>KASHMIRI SAFFRON</h1>
                                    <img src={product1} alt="Kashmiri Saffron" />
                                </div>
                                <div onClick={() => handleProduct(1)}>
                                    <h1>SPAIN SAFFRON</h1>
                                    <img src={product2} alt="Spain Saffron" />
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductPage;