import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 overflow-hidden">
      {/* Decorative Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12 md:h-16"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
            className="text-orange-200"
          />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-10 text-orange-300/40 text-2xl animate-bounce">
          🐾
        </div>
        <div className="absolute top-32 right-20 text-orange-300/40 text-xl animate-bounce delay-300">
          🐾
        </div>
        <div className="absolute bottom-20 left-1/4 text-orange-300/40 text-lg animate-bounce delay-700">
          🐾
        </div>
        <div className="absolute top-20 right-1/3 text-orange-300/40 text-lg animate-bounce delay-1000">
          🐾
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-6 text-center md:text-left">
            <div>
              <h3 
                className="text-3xl font-bold text-orange-500 mb-4"
                style={{ fontFamily: '"Fredoka One", cursive' }}
              >
                Your Pet's Happiness, Our Priority.
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                We care for your pets, loving them like family. We are the company where happy pets and happy owners meet.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex justify-center md:justify-start space-x-4">
              {['f', 'ig', 'tw'].map((label, i) => (
                <div key={i} className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:-translate-y-1 shadow-lg">
                  <span className="text-white font-bold text-lg">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 text-center md:text-left">
            <h4 className="text-xl font-semibold text-gray-800 mb-6">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start space-x-4 group">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
                  <span className="text-orange-500 text-xl">📍</span>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Visit Our Store</p>
                  <p className="text-gray-600 text-sm"> MyPet, Kakkanchery, Kerala </p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-4 group">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
                  <span className="text-orange-500 text-xl">📞</span>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Call Us</p>
                  <p className="text-gray-600 text-sm">+91 7591972747</p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-4 group">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
                  <span className="text-orange-500 text-xl">✉️</span>
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Email Us</p>
                  <p className="text-gray-600 text-sm">mypet@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Hearts Animation */}
          <div className="space-y-6 text-center md:text-left">
            <h4 className="text-xl font-semibold text-gray-800 mb-6 invisible">Show Some Love</h4>
            <div className="relative h-40 w-80 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-red-50 shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🐾</div>
                  <p className="text-gray-600 font-medium">Show some love!</p>
                </div>
              </div>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-red-400 animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                >
                  ❤️
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap justify-center md:justify-start space-x-6 mb-4 md:mb-0">
            <Link to="/privacy" className="text-gray-500 hover:text-orange-500 text-sm transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-orange-500 text-sm transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/shipping" className="text-gray-500 hover:text-orange-500 text-sm transition-colors duration-300">
              Shipping Info
            </Link>
            <Link to="/returns" className="text-gray-500 hover:text-orange-500 text-sm transition-colors duration-300">
              Returns
            </Link>
          </div>
          <p className="text-gray-500 text-sm text-center md:text-right">
            © 2025 PetCare. All rights reserved. Made with ❤️ for pets and their families.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
