import React, { createContext, useContext, useEffect, useState } from "react";

// 1. Create the context
const CartContext = createContext();

// 2. Custom hook
export const useCart = () => useContext(CartContext);

// 3. Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");
  const cartKey = `cart_${userId}`;

  // 🛒 Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCartItems(storedCart);
  }, [cartKey]);

  // 🛒 Save updated cart to localStorage
  const saveCart = (updatedCart) => {
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // ➕ Add or increment product
  const addToCart = (product) => {
    const index = cartItems.findIndex((item) => item.id === product.id);
    let updatedCart = [];

    if (index !== -1) {
      updatedCart = [...cartItems];
      updatedCart[index].quantity += 1;
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    saveCart(updatedCart);
  };

  // ➕ Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    saveCart(updatedCart);
  };

  // ➖ Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    saveCart(updatedCart);
  };

  // ❌ Remove product
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  // 🧹 Clear all
  const clearCart = () => {
    saveCart([]);
  };

  // 🧮 Count total quantity
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // ✅ Provide everything
  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount, // 💡 Add this line
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
