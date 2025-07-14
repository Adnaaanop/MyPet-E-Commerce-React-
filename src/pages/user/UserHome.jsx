// src/pages/home/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  GiDogBowl,
  GiShoppingCart,
  GiDeliveryDrone,
  GiLoveMystery,
} from "react-icons/gi";
import Footer from "../../components/layout/Footer";
import Newsletter from "../../components/layout/Newsletter";


const Home = () => {
    const [pets, setPets] = useState([]);
const [products, setProducts] = useState([]);

useEffect(() => {
  axios.get("http://localhost:3001/pets").then((res) => setPets(res.data));
  axios.get("http://localhost:3001/products").then((res) => setProducts(res.data));
}, []);

  return (
    <div className="bg-[#fff5ee] font-sans overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left relative z-10 animate-fade-in-up">
          <p className="text-base font-medium bg-white inline-block px-5 py-2 rounded-full text-gray-600 shadow mb-6">
            Best Pet Care Service Company
          </p>
          <h1
            className="text-[56px] md:text-[72px] lg:text-[80px] font-bold text-black"
            style={{
              fontFamily: '"Fredoka One", cursive',
              lineHeight: "1.1",
            }}
          >
            Your Pet’s Happiness, <br /> Our Priority.
          </h1>
          <p className="text-gray-600 text-base mt-6 mb-8 max-w-md mx-auto md:mx-0">
            We care for your pets, loving them like family. We are the company
            where happy pets and happy owners meet.
          </p>
          <Link
            to="/products"
            className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition font-semibold text-lg"
          >
            Make A Reservation
          </Link>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 relative mt-20 md:mt-0">
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="w-[460px] h-[460px] md:w-[560px] md:h-[560px] rounded-full bg-gradient-to-tr from-orange-100 to-orange-200" />
          </div>
          <img
            src="https://petlox.wpolive.com/static/media/slide-4.b8f344088221b9e7759b.png"
            alt="Hero pet"
            className="relative z-10 w-[360px] md:w-[460px] mx-auto shadow-xl animate-float"
          />
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="relative bottom-4 left-0 right-0 flex justify-center animate-bounce z-10">
        <span className="text-gray-400 text-2xl">↓</span>
      </div>

      {/* White Strip Behind Pets */}
      <div className="relative z-10 bg-white h-40 md:h-72 w-full"></div>

      {/* Feature Highlights Section */}
      <section className="relative bg-[#fff5ee] rounded-t-[48px] z-20 -mt-20 pb-10 pt-12 px-6 md:px-12">
        {/* Overlapping Pet Images */}
        <div className="absolute -top-20 left-[8%] hidden md:block">
          <img
            src="https://petlox.wpolive.com/static/media/top-img-1.2295e71926a72e7f048d.png"
            alt="Dog"
            className="w-36 md:w-44 lg:w-52"
          />
        </div>
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 hidden md:block">
          <img
            src="https://petlox.wpolive.com/static/media/top-img-2.9af7c4dc271a7a26716e.png"
            alt="Cat"
            className="w-36 md:w-44 lg:w-52"
          />
        </div>
        <div className="absolute -top-28 right-[8%] hidden md:block">
          <img
            src="https://petlox.wpolive.com/static/media/top-img-3.a7ce00c1496c999e793e.png"
            alt="Bird"
            className="w-36 md:w-44 lg:w-52"
          />
        </div>

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We offer everything your pet needs for a healthy, happy life — all
            in one place.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
  {/* Card 1 - Pet Grooming */}
  <div
    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center"
    data-aos="fade-up"
    data-aos-delay="100"
  >
    <div className="bg-blue-400 p-4 rounded-full mb-4 text-white text-3xl">
      <GiDogBowl />
    </div>
    <h3 className="text-xl font-semibold mb-2">Pet Grooming</h3>
    <p className="text-gray-600">
      From fur to nails, we make your pets look and feel their best.
    </p>
  </div>

  {/* Card 2 - Premium Products */}
  <div
    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center"
    data-aos="fade-up"
    data-aos-delay="200"
  >
    <div className="bg-orange-400 p-4 rounded-full mb-4 text-white text-3xl">
      <GiShoppingCart />
    </div>
    <h3 className="text-xl font-semibold mb-2">Premium Products</h3>
    <p className="text-gray-600">
      Handpicked toys, treats & gear tailored for happy pets.
    </p>
  </div>

  {/* Card 3 - Fast Delivery */}
  <div
    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center"
    data-aos="fade-up"
    data-aos-delay="300"
  >
    <div className="bg-yellow-400 p-4 rounded-full mb-4 text-white text-3xl">
      <GiDeliveryDrone />
    </div>
    <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
    <p className="text-gray-600">
      Swift doorstep delivery so your pets never run out of love.
    </p>
  </div>

  {/* Card 4 - Trusted by Pet Lovers */}
  <div
    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center"
    data-aos="fade-up"
    data-aos-delay="400"
  >
    <div className="bg-teal-400 p-4 rounded-full mb-4 text-white text-3xl">
      <GiLoveMystery />
    </div>
    <h3 className="text-xl font-semibold mb-2">Trusted by Pet Lovers</h3>
    <p className="text-gray-600">
      Join thousands who trust us to pamper their furry family.
    </p>
  </div>
</div>

      </section>
      {/* Curved SVG Divider */}
<div className="overflow-hidden -mb-1">
  <svg
    viewBox="0 0 1440 100"
    className="w-full h-[80px]"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#ffffff"
      d="M0,64L48,58.7C96,53,192,43,288,32C384,21,480,11,576,16C672,21,768,43,864,58.7C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
    ></path>
  </svg>
</div>


{/* Featured Pets Section */}
<section className="py-16 px-6 md:px-12 bg-[#fff5ee]">
  <div className="max-w-7xl mx-auto">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Meet Our Pets</h2>
      <Link
        to="/pets"
        className="text-orange-500 font-semibold hover:underline"
      >
        View More Pets →
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {pets.slice(0, 3).map((pet) => (
        <div 
          key={pet.id} 
          className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 p-4 cursor-pointer overflow-hidden relative"
        >
          {/* Image Container with Overlay */}
          <div className="relative overflow-hidden rounded-lg mb-4">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Gradient overlay that appears on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Heart icon for favorites */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
              {pet.name}
            </h3>
            <p className="text-sm text-gray-500">{pet.breed}</p>
            
            {/* Action button that slides up on hover */}
            <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                Learn More
              </button>
            </div>
          </div>

          {/* Decorative element */}
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-orange-400 to-orange-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Featured Products Section */}
<section className="py-16 px-6 md:px-12 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Products</h2>
      <Link
        to="/products"
        className="text-orange-500 font-semibold hover:underline"
      >
        View More Products →
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.slice(0, 3).map((product) => (
        <div 
          key={product.id} 
          className="group bg-[#fff5ee] rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 p-4 cursor-pointer overflow-hidden relative"
        >
          {/* Image Container */}
          <div className="relative overflow-hidden rounded-lg mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Quick action buttons */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex gap-2">
                <button className="p-2 bg-white rounded-full hover:bg-orange-500 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button className="p-2 bg-white rounded-full hover:bg-orange-500 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 001.414 1.414L9 14m0 0h8m-8 0V9a3 3 0 013-3h2a3 3 0 013 3v5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-orange-600">₹{product.price}</p>
              {/* Rating stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Add to cart button that slides up */}
            <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 001.414 1.414L9 14m0 0h8m-8 0V9a3 3 0 013-3h2a3 3 0 013 3v5" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ))}
    </div>
  </div>
</section>
<Newsletter/>

    </div>
  );
};

export default Home;
{/* <section className="py-16 px-6 md:px-12 bg-[#fff5ee]">
  <div className="max-w-7xl mx-auto">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Meet Our Pets</h2>
      <Link
        to="/pets"
        className="text-orange-500 font-semibold hover:underline"
      >
        View More Pets →
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {pets.slice(0, 3).map((pet) => (
        <div key={pet.id} className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-52 object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800">{pet.name}</h3>
          <p className="text-sm text-gray-500">{pet.breed}</p>
        </div>
      ))}
    </div>
  </div>
</section> */}

{/* Featured Products Section */}
{/* <section className="py-16 px-6 md:px-12 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Products</h2>
      <Link
        to="/products"
        className="text-orange-500 font-semibold hover:underline"
      >
        View More Products →
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.slice(0, 3).map((product) => (
        <div key={product.id} className="bg-[#fff5ee] rounded-xl shadow hover:shadow-lg transition p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-52 object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-500">₹{product.price}</p>
        </div>
      ))}
    </div>
  </div>
</section> */}
