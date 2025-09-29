import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { BASE_URL } from "../../services/base";
import { useAuth } from "../../context/AuthContext";
//  import api from "../../services/api/"; 
 import api from "../../services/api";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string("").email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must not exceed 20 characters"),
  });

 const handleSubmit = async (values, actions) => {
  try {
    // Call backend login endpoint
    const res = await api.post("/auth/login", {
      email: values.email,
      password: values.password,
    });

    console.log("Login response:", res.data); // Log for debugging

    // Backend returns user info
    const user = res.data.data;

    if (user) {
      // Normalize role to lowercase
      const normalizedUser = { ...user, role: user.role.toLowerCase() };
      console.log("Normalized user role:", normalizedUser.role); // Log for debugging
      login(normalizedUser.id, normalizedUser.role, normalizedUser.name); // Update AuthContext
    }
  } catch (err) {
    console.error("Login failed", err);
    // Optional: backend may return error messages
    if (err.response && err.response.data?.message) {
      actions.setFieldError("email", err.response.data.message);
    } else {
      actions.setFieldError("email", "Something went wrong");
    }
    actions.setFieldError("password", " ");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5ee] via-orange-50 to-orange-100 font-sans relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Paw Prints */}
        <div className="absolute top-20 left-10 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>
          <div className="w-8 h-8 bg-orange-200 rounded-full opacity-30"></div>
        </div>
        <div className="absolute top-40 right-20 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>
          <div className="w-6 h-6 bg-orange-300 rounded-full opacity-40"></div>
        </div>
        <div className="absolute top-60 left-1/4 animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}>
          <div className="w-4 h-4 bg-orange-200 rounded-full opacity-30"></div>
        </div>
        <div className="absolute bottom-40 right-10 animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.8s'}}>
          <div className="w-7 h-7 bg-orange-300 rounded-full opacity-35"></div>
        </div>
        <div className="absolute bottom-20 left-1/3 animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.2s'}}>
          <div className="w-5 h-5 bg-orange-200 rounded-full opacity-30"></div>
        </div>

        {/* Subtle Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full opacity-25 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Decorative Pet Silhouettes */}
        <div className="absolute top-16 right-16 opacity-10 animate-pulse">
          <svg className="w-20 h-20 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.5 12.5c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5-1.5 2.5-3 2.5-3-1-3-2.5zm7 0c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5-1.5 2.5-3 2.5-3-1-3-2.5zm-7 4c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2zm10 0c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2zm-3-1c0-2 1-3 2-3s2 1 2 3-1 3-2 3-2-1-2-3z"/>
          </svg>
        </div>
        
        <div className="absolute bottom-16 left-16 opacity-10 animate-pulse" style={{animationDelay: '2s'}}>
          <svg className="w-24 h-24 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm-7 7c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm14 0c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm-10 7c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm6 0c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3z"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Welcome Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-white px-6 py-3 rounded-full shadow-lg mb-6 transform hover:scale-105 transition-transform duration-300">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm-7 7c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm14 0c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm-10 7c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm6 0c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3z"/>
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Welcome Back, Pet Lover!</span>
            </div>
          </div>

          {/* Login Form Card */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-6 border border-orange-100 hover:shadow-2xl transition-shadow duration-300">
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2" style={{fontFamily: '"Fredoka One", cursive'}}>
                  Sign In
                </h1>
                <p className="text-gray-600 text-sm">Access your pet care dashboard</p>
                
                {/* Decorative Line */}
                <div className="flex items-center justify-center mt-4 mb-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-orange-500 rounded-full mx-2"></div>
                  <div className="w-12 h-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"></div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                <div>
                  <Input 
                    name="email" 
                    label="Email" 
                    type="email" 
                    className="transition-all duration-300 focus:shadow-md focus:shadow-orange-100 hover:border-orange-300"
                  />
                </div>

                <div>
                  <Input 
                    name="password" 
                    label="Password" 
                    type="password" 
                    className="transition-all duration-300 focus:shadow-md focus:shadow-orange-100 hover:border-orange-300"
                  />
                </div>
              </div>

              {/* Login Button */}
              <div className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign In to Dashboard
                  </span>
                </Button>
              </div>

              {/* Footer Links */}
              <div className="mt-6 text-center">
                <div className="text-sm text-gray-600">
                  <span>Haven't logged in? </span>
                  <a href="/signup" className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-300">
                    Signup
                  </a>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full opacity-25 animate-pulse" style={{animationDelay: '1s'}}></div>
            </Form>
          </Formik>

          {/* Bottom Decorative Text */}
          <div className="text-center mt-6 text-gray-600">
            <p className="text-sm">
              "Your Pet's Happiness, Our Priority" 
              <span className="inline-block ml-2 text-orange-500">🐾</span>
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Login;