import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../services/base"; // Make sure BASE_URL = "http://localhost:3001"

// 1. Create the context
const CartContext = createContext();

// 2. Custom hook
export const useCart = () => useContext(CartContext);

// 3. Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");

  // ✅ Fetch user's cart on mount
  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/cart?userId=${userId}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  // ✅ Add to cart
  const addToCart = async (product) => {
    try {
      const existingItem = cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };

        await axios.put(`${BASE_URL}/cart/${existingItem.id}`, updatedItem);
      } else {
        const newItem = { ...product, quantity: 1, userId };
        await axios.post(`${BASE_URL}/cart`, newItem);
      }

      fetchCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // ✅ Increase quantity
  const increaseQuantity = async (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    try {
      await axios.put(`${BASE_URL}/cart/${id}`, {
        ...item,
        quantity: item.quantity + 1,
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to increase quantity:", err);
    }
  };

  // ✅ Decrease quantity
  const decreaseQuantity = async (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    if (item.quantity === 1) {
      removeFromCart(id);
    } else {
      try {
        await axios.put(`${BASE_URL}/cart/${id}`, {
          ...item,
          quantity: item.quantity - 1,
        });
        fetchCart();
      } catch (err) {
        console.error("Failed to decrease quantity:", err);
      }
    }
  };

  // ✅ Remove from cart
  const removeFromCart = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/cart/${id}`);
      fetchCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  // ✅ Clear cart
  const clearCart = async () => {
    try {
      const deleteRequests = cartItems.map((item) =>
        axios.delete(`${BASE_URL}/cart/${item.id}`)
      );
      await Promise.all(deleteRequests);
      setCartItems([]);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
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
