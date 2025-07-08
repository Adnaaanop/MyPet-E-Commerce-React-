// src/pages/pets/PetList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/products/ProductCard";
import { BASE_URL } from "../../services/base";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");

  const categories = ["All", "Dog", "Cat", "Bird", "Fish"];

  useEffect(() => {
    axios
      .get(`${BASE_URL}/pets`)
      .then((res) => {
        setPets(res.data);
        setFilteredPets(res.data);
      })
      .catch((err) => console.error("Error fetching pets", err));
  }, []);

  useEffect(() => {
    let filtered = [...pets];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (pet) => pet.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((pet) =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === "priceLowHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredPets(filtered);
  }, [pets, selectedCategory, searchTerm, sortOption]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchTerm("");
    setSortOption("");
  };

  return (
    <div className="flex flex-col md:flex-row p-6">
      {/* Sidebar  */}
      <div className="hidden md:block w-48 mr-6">
        <div className="sticky top-20 space-y-2">
          <h3 className="text-lg font-semibold">Filter by Category</h3>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`block w-full text-left px-3 py-2 rounded ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-6 text-center"> Browse Lovely Pets</h2>

        <div className="md:hidden mb-4 space-y-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded text-sm"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search pets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border rounded focus:outline-none"
          />

          <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={clearFilters}
              className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
            >
              Clear All Filters
            </button>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 border rounded text-sm"
            >
              <option value="">Sort By</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Pets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <ProductCard key={pet.id} product={pet} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No pets found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetList;
