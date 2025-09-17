/* eslint-disable no-unused-vars */
// Header.jsx - Enhanced Version
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaStethoscope, FaCalendarAlt, FaClock, FaUserMd, FaStar } from 'react-icons/fa';
import { assets } from '../assets/assets';

const Header = () => {
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState(0);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setAnimated(true);
    
    // Text rotation effect
    const interval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % rotatingTexts.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const rotatingTexts = [
    "Made Simple & Accessible",
    "Trusted by Thousands",
    "Your Health, Our Priority"
  ];

  const stats = [
    { icon: <FaUserMd className="text-blue-500" />, value: "100+", label: "Verified Doctors" },
    { icon: <FaCalendarAlt className="text-teal-500" />, value: "24/7", label: "Online Booking" },
    { icon: <FaStar className="text-yellow-400" />, value: "4.9/5", label: "Patient Rating" }
  ];

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4 py-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full animate-float-1"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-teal-400/10 rounded-full animate-float-2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-blue-300/10 rounded-full animate-float-3"></div>
        
        {/* Pulse Rings */}
        <div className="absolute top-1/3 left-1/3 w-32 h-32 border-4 border-blue-300/20 rounded-full animate-ping-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border-4 border-teal-300/20 rounded-full animate-ping-medium"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-20 animate-float-icon-1">
          <FaStethoscope className="text-blue-300/40 text-2xl" />
        </div>
        <div className="absolute top-40 right-20 animate-float-icon-2">
          <FaCalendarAlt className="text-teal-300/40 text-2xl" />
        </div>
        <div className="absolute bottom-40 left-40 animate-float-icon-3">
          <FaUserMd className="text-blue-300/40 text-2xl" />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-8 transform transition-all duration-1000 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-gray-700">Trusted Healthcare Platform</span>
        </div>
        
        {/* Main Heading */}
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight transform transition-all duration-1000 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Professional Healthcare
          <span className="block mt-2 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            {rotatingTexts[currentText]}
          </span>
        </h1>
        
        {/* Description */}
        <p className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 transform transition-all duration-1000 delay-300 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Find specialist doctors near you and schedule appointments online with ease. 
          Your health is our priority.
        </p>
        
        {/* Stats */}
        <div className={`flex flex-wrap justify-center gap-6 mb-12 transform transition-all duration-1000 delay-500 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-md">
              <div className="text-2xl">{stat.icon}</div>
              <div className="text-left">
                <div className="font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-1000 delay-700 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <button
            onClick={() => {
              navigate("/doctors");
              scrollTo(0, 0);
            }}
            className="group bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:scale-105"
          >
            <FaStethoscope className="group-hover:animate-bounce" />
            Find a Doctor
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => {
              navigate("/login");
              scrollTo(0, 0);
            }}
            className="group bg-white text-blue-600 border-2 border-blue-100 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:scale-105"
          >
            <FaCalendarAlt className="group-hover:animate-pulse" />
            Book Appointment
          </button>
        </div>
        
        {/* Trust Indicator */}
        <div className={`mt-12 flex items-center justify-center gap-2 text-sm text-gray-500 transform transition-all duration-1000 delay-1000 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex -space-x-3">
          {
            <img
              
              src={assets.group_profiles} 
              alt="User Avatars"
              className="w-14 rounded-full border-2 border-white shadow-md object-cover"
            />
          }
        </div>
          <span>Joined by <strong>10,000+</strong> patients this month</span>
        </div>
      </div>
      
      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes float-1 {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(-20px) translateX(10px) rotate(5deg); }
          100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
        }
        
        @keyframes float-2 {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(15px) translateX(-15px) rotate(-5deg); }
          100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
        }
        
        @keyframes float-3 {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        
        @keyframes float-icon-1 {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes float-icon-2 {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes float-icon-3 {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(10px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes ping-medium {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        .animate-float-1 {
          animation: float-1 8s ease-in-out infinite;
        }
        
        .animate-float-2 {
          animation: float-2 10s ease-in-out infinite;
        }
        
        .animate-float-3 {
          animation: float-3 12s ease-in-out infinite;
        }
        
        .animate-float-icon-1 {
          animation: float-icon-1 6s ease-in-out infinite;
        }
        
        .animate-float-icon-2 {
          animation: float-icon-2 7s ease-in-out infinite;
        }
        
        .animate-float-icon-3 {
          animation: float-icon-3 9s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-ping-medium {
          animation: ping-medium 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Header;