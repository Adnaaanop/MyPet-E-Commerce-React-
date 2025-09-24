import api from "./api";


// get all items in user's cart
export const getCart = async () => {
  const res = await api.get("/cart");
  return res.data.data; // because of ApiResponse wrapper
};

// add item (product or pet)
export const addToCart = async ({ productId, petId, quantity = 1 }) => {
  const res = await api.post("/cart/add", { productId, petId, quantity });
  return res.data.data;
};

// update item quantity
export const updateCartItem = async (cartItemId, quantity) => {
  const res = await api.put(`/cart/${cartItemId}`, { quantity });
  return res.data.data;
};

// remove item
export const removeCartItem = async (cartItemId) => {
  const res = await api.delete(`/cart/${cartItemId}`);
  return res.data;
};

// clear all items
export const clearCart = async () => {
  const res = await api.delete("/cart/clear");
  return res.data;
};
