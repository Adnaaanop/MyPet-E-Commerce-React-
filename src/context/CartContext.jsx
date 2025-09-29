import React, { createContext, useState, useContext } from "react";
import { getCart, addToCart as addToCartService, updateCartItem, removeCartItem, clearCart as clearCartService } from "../services/cartService"; // Renamed to avoid shadowing

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const cartData = await getCart();
      setCartItems(cartData || []);
    } catch (err) {
      setCartItems([]);
    }
  };

  const addToCart = async (item) => {
    try {
      const newItem = await addToCartService(item);
      await fetchCart();
      return newItem;
    } catch (err) {
      throw err;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await removeCartItem(itemId);
      await fetchCart();
    } catch (err) {
      throw err;
    }
  };

  const increaseQuantity = async (itemId) => {
    try {
      const item = cartItems.find((i) => i.id === itemId);
      if (!item) throw new Error("Item not found");
      await updateCartItem(itemId, item.quantity + 1);
      await fetchCart();
    } catch (err) {
      throw err;
    }
  };

  const decreaseQuantity = async (itemId) => {
    try {
      const item = cartItems.find((i) => i.id === itemId);
      if (!item) throw new Error("Item not found");
      if (item.quantity <= 1) {
        await removeCartItem(itemId);
      } else {
        await updateCartItem(itemId, item.quantity - 1);
        await fetchCart();
      }
    } catch (err) {
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      await clearCartService(); // Use renamed service function
      setCartItems([]); // Clear state immediately
      await fetchCart(); // Refresh to confirm
    } catch (err) {
      throw err;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        getCart: fetchCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

