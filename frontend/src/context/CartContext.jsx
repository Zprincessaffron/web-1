import React, { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";

// Define a default pack size for wholesalers
const DEFAULT_PACK_SIZE = {
  2: 5, // Default pack size for 2g pack
  5: 2, // Default pack size for 5g pack
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {
    // Load initial state from localStorage
    const savedItems = localStorage.getItem("cartItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const { user } = useContext(userContext);

  useEffect(() => {
    // Update localStorage whenever cartItems changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: product.quantity }];
      }
    });
  };

  const updateQuantity = (item, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: Math.max(
                cartItem.quantity + amount,
                // Check if user is a wholesaler and apply the default pack size if needed
                (user && user.role === 'wholesaler') ? DEFAULT_PACK_SIZE[cartItem.weight] : 1
              ),
            }
          : cartItem
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
