import React, { createContext, useContext, useEffect, useState } from "react";

// 1. Create context
const WishlistContext = createContext();

// 2. Custom hook
export const useWishlist = () => useContext(WishlistContext);

// 3. Provider
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const userId = localStorage.getItem("userId");
  const wishlistKey = `wishlist_${userId}`;

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    setWishlist(stored);
  }, [wishlistKey]);

  // Save and update wishlist
  const saveWishlist = (updated) => {
    localStorage.setItem(wishlistKey, JSON.stringify(updated));
    setWishlist(updated);
  };

  // Add item to wishlist
  const addToWishlist = (product) => {
    if (!wishlist.some((item) => item.id === product.id)) {
      saveWishlist([...wishlist, product]);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    saveWishlist(updated);
  };

  // Toggle item (add/remove)
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Check if item exists
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
