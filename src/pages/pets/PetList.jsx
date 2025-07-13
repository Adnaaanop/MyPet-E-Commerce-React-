// src/pages/pets/PetList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/products/ProductCard";
import { BASE_URL } from "../../services/base";
import { FaChevronLeft, FaChevronRight, FaEllipsisH } from "react-icons/fa";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = ["All", "Dog", "Cat", "Bird", "Fish","Lion"];

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/pets`)
      .then((res) => {
        setPets(res.data);
        setFilteredPets(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pets", err);
        setIsLoading(false);
      });
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
    setCurrentPage(1); // Reset to first page when filters change
  }, [pets, selectedCategory, searchTerm, sortOption]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchTerm("");
    setSortOption("");
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredPets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPets = filteredPets.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-[#fff5ee] font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 animate-fade-in-up"
            style={{
              fontFamily: '"Fredoka One", cursive',
              lineHeight: "1.1",
            }}
          >
            Browse Lovely Pets
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-in-up delay-100">
            Find your perfect companion from our collection of adorable pets waiting for their forever homes
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-6 py-8 gap-6">
        {/* Sidebar */}
        <div className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-5 transform transition-all duration-300 hover:shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center">
              <span className="w-2 h-5 bg-orange-500 rounded-full mr-3"></span>
              Filter by Category
            </h3>
            <div className="space-y-2">
              {categories.map((cat, index) => (
                <button
                  key={cat}
                  className={`w-full text-left px-3 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                      : "bg-gray-50 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          {/* Mobile Category Selector */}
          <div className="lg:hidden mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl text-gray-700 focus:outline-none focus:border-orange-500 transition-all duration-300 bg-white shadow-md"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Search and Sort Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transform transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search Input */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search pets by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all duration-300 text-gray-700"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Controls */}
              <div className="flex gap-3 w-full md:w-auto">
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                >
                  Clear Filters
                </button>

                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all duration-300 text-gray-700 bg-white"
                >
                  <option value="">Sort By</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Counter and Pagination Info */}
          {!isLoading && (
            <div className="mb-6 text-center">
              <p className="text-gray-600 text-lg">
                {filteredPets.length === 0 ? 
                  "No pets found" : 
                  `Found ${filteredPets.length} ${filteredPets.length === 1 ? 'pet' : 'pets'}`
                }
                {filteredPets.length > 0 && totalPages > 1 && (
                  <span className="text-sm text-gray-500 block mt-1">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredPets.length)} of {filteredPets.length} results
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-orange-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          {/* Pets Grid */}
          {!isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {currentPets.length > 0 ? (
                currentPets.map((pet, index) => (
                  <div
                    key={pet.id}
                    className="transform transition-all duration-500 hover:scale-105 animate-fade-in-up"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <ProductCard product={pet} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-2">No pets found</h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your search or filters to find more pets
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2 bg-white rounded-2xl shadow-lg p-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600 transform hover:scale-105'
                  }`}
                >
                  <FaChevronLeft className="text-sm" />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((pageNum, index) => (
                  <React.Fragment key={index}>
                    {pageNum === '...' ? (
                      <div className="flex items-center justify-center w-10 h-10 text-gray-400">
                        <FaEllipsisH className="text-sm" />
                      </div>
                    ) : (
                      <button
                        onClick={() => handlePageChange(pageNum)}
                        className={`flex items-center justify-center w-10 h-10 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                            : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )}
                  </React.Fragment>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600 transform hover:scale-105'
                  }`}
                >
                  <FaChevronRight className="text-sm" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .delay-100 {
          animation-delay: 100ms;
        }
        
        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
      `}</style>
    </div>
  );
};

export default PetList;