import React from 'react';
import { Link } from 'react-router-dom';

// Newsletter Component - Place this above the footer
const Newsletter = () => {
  return (
    <section className="bg-gradient-to-r from-orange-100 to-orange-200 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        {/* Decorative elements */}
        <div className="relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-6xl opacity-20">
            🐾
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform hover:scale-105 transition-transform duration-300">
            <div className="max-w-2xl mx-auto">
              <h2 
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                style={{ fontFamily: '"Fredoka One", cursive' }}
              >
                Stay Pawsome! 
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Get the latest pet care tips, exclusive offers, and adorable content delivered straight to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-full border-2 border-orange-200 focus:border-orange-500 focus:outline-none text-gray-700 placeholder-gray-500 transition-colors duration-300"
                />
                <button className="bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-colors duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Subscribe
                </button>
              </div>
              
              <p className="text-gray-500 text-sm mt-4">
                🔒 We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Newsletter