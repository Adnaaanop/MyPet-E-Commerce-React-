import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../services/base";


const WishlistContext = createContext();


export const useWishlist = () => useContext(WishlistContext);


export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const userId = localStorage.getItem("userId");

  //  Fetch wishlist
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

  //  Add 
  const addToWishlist = async (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) return;

    const newItem = { ...product, userId };
    try {
      await axios.post(`${BASE_URL}/wishlist`, newItem);
      fetchWishlist(); 
    } catch (err) {
      console.error("Error adding to wishlist", err);
    }
  };

  //  Remove 
  const removeFromWishlist = async (id) => {
    const item = wishlist.find((item) => item.id === id);
    if (!item) return;

    try {
      await axios.delete(`${BASE_URL}/wishlist/${item.id}`);
      fetchWishlist(); 
    } catch (err) {
      console.error("Error removing from wishlist", err);
    }
  };

  //  Toggle 
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  //  Checking
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
