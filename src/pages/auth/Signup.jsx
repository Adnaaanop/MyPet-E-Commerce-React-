import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/base";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    role: "user",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 8 characters")
      .max(20, "Password must not exceed 20 characters")
      .required("Password is required"),
    role: Yup.string().oneOf(["user", "admin"]).required("Role is required"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, values);
      const userId = response.data.id;

      login(userId, values.role);

      actions.resetForm();

      if (values.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5ee] via-orange-50 to-orange-100 font-sans relative overflow-hidden smooth-scroll">
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
        <div className="w-full max-w-md">
          {/* Welcome Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-white px-6 py-3 rounded-full shadow-lg mb-6 transform hover:scale-105 transition-transform duration-300">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm-7 7c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm14 0c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm-10 7c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm6 0c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3z"/>
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Join Our Pet Community!</span>
            </div>
          </div>

          {/* Signup Form Card */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-6 border border-orange-100 hover:shadow-2xl transition-shadow duration-300">
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2" style={{fontFamily: '"Fredoka One", cursive'}}>
                  Sign Up
                </h1>
                <p className="text-gray-600 text-sm">Create your pet care account</p>
                
                {/* Decorative Line */}
                <div className="flex items-center justify-center mt-4 mb-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-orange-500 rounded-full mx-2"></div>
                  <div className="w-12 h-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"></div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Input 
                    name="name" 
                    label="Full Name" 
                    type="text" 
                    className="transition-all duration-300 focus:shadow-md focus:shadow-orange-100 hover:border-orange-300"
                  />
                </div>

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

                <div>
                  <label htmlFor="role" className="block text-gray-700 text-sm font-semibold mb-2">
                    Account Type
                  </label>
                  <Field
                    as="select"
                    name="role"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-orange-300 bg-white text-gray-700"
                  >
                    <option value="user">Pet Owner</option>
                    <option value="admin">Admin</option>
                  </Field>
                </div>
              </div>

              {/* Register Button */}
              <div className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Create Account
                  </span>
                </Button>
              </div>

              {/* Footer Links */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <span>Already have an account?</span>
                  <a href="/login" className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-300">
                    Sign In
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
              "Join thousands of happy pet owners!" 
              <span className="inline-block ml-2 text-orange-500">🐾</span>
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional animations and smooth scrolling */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        * {
          scroll-behavior: smooth;
        }
        
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
        
        /* Smooth scrolling for any scrollable elements */
        .smooth-scroll {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #fb923c, #f97316);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #f97316, #ea580c);
        }
      `}</style>
    </div>
  );
};

export default Signup;