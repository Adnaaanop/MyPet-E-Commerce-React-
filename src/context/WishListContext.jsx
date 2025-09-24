import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { isLoggedIn } = useAuth();

  const fetchWishlist = useCallback(async () => {
    if (!isLoggedIn) {
      console.log("Not fetching wishlist: User not logged in");
      setWishlist([]);
      return;
    }
    try {
      console.log("Fetching wishlist for user");
      const res = await api.get("/wishlist");
      console.log("Wishlist response:", res.data.data);
      setWishlist(res.data.data || []);
    } catch (err) {
      console.error("Failed to load wishlist:", err.response?.data || err.message);
      setWishlist([]);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    console.log("Wishlist useEffect triggered, isLoggedIn:", isLoggedIn);
    if (isLoggedIn) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [isLoggedIn, fetchWishlist]);

  const addToWishlist = async (item) => {
    if (!isLoggedIn) throw new Error("User not logged in");
    const payload = item.breed
      ? { productId: null, petId: item.id }
      : { productId: item.id, petId: null };
    console.log("Adding to wishlist:", payload);
    try {
      const res = await api.post("/wishlist", payload);
      console.log("Add wishlist response:", res.data.data);
      await fetchWishlist();
      return res.data.data;
    } catch (err) {
      console.error("Error adding to wishlist:", err.response?.data || err.message);
      throw err;
    }
  };

  const removeFromWishlist = async (itemId) => {
    if (!isLoggedIn) throw new Error("User not logged in");
    const item = wishlist.find((i) => i.productId === itemId || i.petId === itemId);
    if (!item) throw new Error("Wishlist item not found");
    console.log("Removing from wishlist:", item.id);
    try {
      await api.delete(`/wishlist/${item.id}`);
      await fetchWishlist();
    } catch (err) {
      console.error("Error removing from wishlist:", err.response?.data || err.message);
      throw err;
    }
  };

  const toggleWishlist = async (item) => {
    if (!isLoggedIn) throw new Error("User not logged in");
    const exists = isInWishlist(item.id);
    console.log(`Toggling wishlist for item ${item.id}, exists: ${exists}`);
    if (exists) {
      await removeFromWishlist(item.id);
    } else {
      await addToWishlist(item);
    }
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => item.productId === id || item.petId === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);



// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../services/base";


// const WishlistContext = createContext();


// export const useWishlist = () => useContext(WishlistContext);


// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);
//   const userId = localStorage.getItem("userId");

//   //  Fetch wishlist
//   const fetchWishlist = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/wishlist?userId=${userId}`);
//       setWishlist(res.data);
//     } catch (err) {
//       console.error("Failed to load wishlist", err);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchWishlist();
//     }
//   }, [userId]);

//   //  Add 
//   const addToWishlist = async (product) => {
//     const exists = wishlist.some((item) => item.id === product.id);
//     if (exists) return;

//     const newItem = { ...product, userId };
//     try {
//       await axios.post(`${BASE_URL}/wishlist`, newItem);
//       fetchWishlist(); 
//     } catch (err) {
//       console.error("Error adding to wishlist", err);
//     }
//   };

//   //  Remove 
//   const removeFromWishlist = async (id) => {
//     const item = wishlist.find((item) => item.id === id);
//     if (!item) return;

//     try {
//       await axios.delete(`${BASE_URL}/wishlist/${item.id}`);
//       fetchWishlist(); 
//     } catch (err) {
//       console.error("Error removing from wishlist", err);
//     }
//   };

//   //  Toggle 
//   const toggleWishlist = (product) => {
//     const exists = wishlist.some((item) => item.id === product.id);
//     if (exists) {
//       removeFromWishlist(product.id);
//     } else {
//       addToWishlist(product);
//     }
//   };

//   //  Checking
//   const isInWishlist = (id) => wishlist.some((item) => item.id === id);

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlist,
//         addToWishlist,
//         removeFromWishlist,
//         toggleWishlist,
//         isInWishlist,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };
