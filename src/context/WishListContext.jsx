import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../services/base";

// 1. Create context
const WishlistContext = createContext();

// 2. Custom hook
export const useWishlist = () => useContext(WishlistContext);

// 3. Provider
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const userId = localStorage.getItem("userId");

  // ✅ Fetch wishlist for logged-in user
  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/wishlist?userId=${userId}`);
      setWishlist(res.data);
    } catch (err) {
      console.error("Failed to load wishlist", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchWishlist();
    }
  }, [userId]);

  // ➕ Add item
  const addToWishlist = async (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) return;

    const newItem = { ...product, userId };
    try {
      await axios.post(`${BASE_URL}/wishlist`, newItem);
      fetchWishlist(); // Refresh list
    } catch (err) {
      console.error("Error adding to wishlist", err);
    }
  };

  // ❌ Remove item
  const removeFromWishlist = async (id) => {
    const item = wishlist.find((item) => item.id === id);
    if (!item) return;

    try {
      await axios.delete(`${BASE_URL}/wishlist/${item.id}`);
      fetchWishlist(); // Refresh list
    } catch (err) {
      console.error("Error removing from wishlist", err);
    }
  };

  // 🔁 Toggle item
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // 🔍 Check
  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
