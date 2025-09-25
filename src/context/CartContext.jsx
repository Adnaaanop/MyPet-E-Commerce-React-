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


// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../services/base";

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     Object.keys(localStorage).forEach((key) => {
//       if (key.startsWith("cart_")) {
//         localStorage.removeItem(key);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     if (userId) fetchCart();
//   }, [userId]);

//   const fetchCart = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/cart?userId=${userId}`);
//       setCartItems(res.data);
//     } catch (err) {
//       console.error("Failed to fetch cart:", err);
//     }
//   };

// const addToCart = async (item) => {
//   try {
//     const type = item.breed && item.age ? "pet" : "product";
//     const incomingQty = item.quantity || 1;

//     const existingItem = cartItems.find(
//       (ci) =>
//         ci.productId === item.id &&
//         ci.type === type &&
//         ci.userId === userId
//     );

//     if (existingItem) {
//       await axios.patch(`${BASE_URL}/cart/${existingItem.id}`, {
//         quantity: existingItem.quantity + incomingQty,
//       });
//     } else {
//       const newItem = {
//         ...item,
//         id: `${Date.now()}-${Math.random()}`,
//         productId: item.id,
//         quantity: incomingQty,
//         userId,
//         type,
//       };
//       await axios.post(`${BASE_URL}/cart`, newItem);
//     }

//     fetchCart();
//   } catch (err) {
//     console.error("Error adding to cart:", err);
//   }
// };


//   const increaseQuantity = async (id) => {
//     const item = cartItems.find((item) => item.id === id);
//     if (!item) return;
//     try {
//       await axios.patch(`${BASE_URL}/cart/${id}`, {
//         quantity: item.quantity + 1,
//       });
//       fetchCart();
//     } catch (err) {
//       console.error("Failed to increase quantity:", err);
//     }
//   };

//   const decreaseQuantity = async (id) => {
//     const item = cartItems.find((item) => item.id === id);
//     if (!item) return;
//     if (item.quantity === 1) {
//       removeFromCart(id);
//     } else {
//       try {
//         await axios.patch(`${BASE_URL}/cart/${id}`, {
//           quantity: item.quantity - 1,
//         });
//         fetchCart();
//       } catch (err) {
//         console.error("Failed to decrease quantity:", err);
//       }
//     }
//   };

//   const removeFromCart = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/cart/${id}`);
//       fetchCart();
//     } catch (err) {
//       console.error("Failed to remove item:", err);
//     }
//   };

//   const clearCart = async () => {
//     try {
//       const deleteRequests = cartItems.map((item) =>
//         axios.delete(`${BASE_URL}/cart/${item.id}`)
//       );
//       await Promise.all(deleteRequests);
//       setCartItems([]);
//     } catch (err) {
//       console.error("Failed to clear cart:", err);
//     }
//   };

//   const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         cartCount,
//         addToCart,
//         increaseQuantity,
//         decreaseQuantity,
//         removeFromCart,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

