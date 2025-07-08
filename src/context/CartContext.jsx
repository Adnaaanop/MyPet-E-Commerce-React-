import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../services/base";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("cart_")) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/cart?userId=${userId}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

const addToCart = async (item) => {
  try {
    const type = item.breed && item.age ? "pet" : "product";
    const incomingQty = item.quantity || 1;

    const existingItem = cartItems.find(
      (ci) =>
        ci.productId === item.id &&
        ci.type === type &&
        ci.userId === userId
    );

    if (existingItem) {
      await axios.patch(`${BASE_URL}/cart/${existingItem.id}`, {
        quantity: existingItem.quantity + incomingQty,
      });
    } else {
      const newItem = {
        ...item,
        id: `${Date.now()}-${Math.random()}`,
        productId: item.id,
        quantity: incomingQty,
        userId,
        type,
      };
      await axios.post(`${BASE_URL}/cart`, newItem);
    }

    fetchCart();
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
};


  const increaseQuantity = async (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;
    try {
      await axios.patch(`${BASE_URL}/cart/${id}`, {
        quantity: item.quantity + 1,
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to increase quantity:", err);
    }
  };

  const decreaseQuantity = async (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;
    if (item.quantity === 1) {
      removeFromCart(id);
    } else {
      try {
        await axios.patch(`${BASE_URL}/cart/${id}`, {
          quantity: item.quantity - 1,
        });
        fetchCart();
      } catch (err) {
        console.error("Failed to decrease quantity:", err);
      }
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/cart/${id}`);
      fetchCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

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



// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../services/base";

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const userId = localStorage.getItem("userId");

//   // Cleanup old cart keys from localStorage
//   useEffect(() => {
//     Object.keys(localStorage).forEach((key) => {
//       if (key.startsWith("cart_")) {
//         localStorage.removeItem(key);
//       }
//     });
//   }, []);

//   // Fetch user cart
//   useEffect(() => {
//     if (userId) {
//       fetchCart();
//     }
//   }, [userId]);

//   const fetchCart = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/cart?userId=${userId}`);
//       setCartItems(res.data);
//     } catch (err) {
//       console.error("Failed to fetch cart:", err);
//     }
//   };

//   // Add to cart type check
//   const addToCart = async (item) => {
//     try {
//       const type = item.breed && item.age ? "pet" : "product";

//       const existingItem = cartItems.find(
//         (ci) => ci.productId === item.id && ci.type === type
//       );

//       if (existingItem) {
//         const updatedItem = {
//           ...existingItem,
//           quantity: existingItem.quantity + 1,
//         };

//         await axios.put(`${BASE_URL}/cart/${existingItem.id}`, updatedItem);
//       } else {
//         const newItem = {
//           ...item,
//           productId: item.id,
//           quantity: 1,
//           userId,
//           type,
//         };

//         await axios.post(`${BASE_URL}/cart`, newItem);
//       }

//       fetchCart();
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//     }
//   };

//   const increaseQuantity = async (id) => {
//     const item = cartItems.find((item) => item.id === id);
//     if (!item) return;

//     try {
//       await axios.put(`${BASE_URL}/cart/${id}`, {
//         ...item,
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
//         await axios.put(`${BASE_URL}/cart/${id}`, {
//           ...item,
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
