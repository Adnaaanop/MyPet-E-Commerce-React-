// src/pages/products/ProductList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../services/base";
import ProductCard from "../../components/products/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
