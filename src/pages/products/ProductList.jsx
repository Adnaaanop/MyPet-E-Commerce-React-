import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../services/base";
import ProductCard from "../../components/products/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "priceLowHigh") return a.price - b.price;
      if (sortBy === "priceHighLow") return b.price - a.price;
      if (sortBy === "ratingHighLow") return b.rating - a.rating;
      if (sortBy === "stockHighLow") return b.stock - a.stock;
      return 0;
    });

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
      {/*  for Mobile  */}
      <div className="md:hidden mb-4">
        <select
          className="w-full border px-3 py-2 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/*  Sidebar */}
      <div className="hidden md:block w-48">
        <div className="sticky top-20 space-y-2">
          <h3 className="text-lg font-semibold">Filter by Category</h3>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`block w-full text-left px-3 py-2 rounded ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>


      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-6 text-center"> Browse Pet Products</h2>

        <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/*  Search */}
          <input
            type="text"
            placeholder="Search for a product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/*  Clear filter buton */}
          <div className="flex w-full md:w-auto justify-between md:justify-start gap-2">
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSortBy("");
              }}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Clear All Filters
            </button>

            {/* Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-60 border border-gray-300 rounded px-3 py-2 text-sm md:text-base"
            >
              <option value="">Sort By</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="ratingHighLow">Rating: High to Low</option>
              <option value="stockHighLow">Stock: High to Low</option>
            </select>
          </div>
        </div>

        {/*  Product  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">
              No products match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
