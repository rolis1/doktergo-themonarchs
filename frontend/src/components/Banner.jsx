/* eslint-disable no-unused-vars */
// Banner.jsx - With Doctor Image
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaCalendarCheck, FaClock, FaUserFriends, FaAmbulance, FaStar, FaSearch } from "react-icons/fa";

const Banner = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stats.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "100+", label: "Expert Doctors" },
    { value: "24/7", label: "Availability" },
    { value: "98%", label: "Patient Satisfaction" }
  ];

  return (
    <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white rounded-3xl px-6 py-12 md:p-16 my-10 mx-4 overflow-hidden shadow-2xl">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-700/30 rounded-l-full"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-teal-500/20 rounded-tr-full"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj4KICA8ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4xIj4KICAgIDxwYXRoIGQ9Ik0gMCAwIEwgNjAgNjAgTSA2MCAwIEwgMCA2MCIvPgogIDwvZz4KPC9zdmc+')]"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden z-1">
        <div className="absolute top-20 left-20 w-16 h-16 bg-blue-500/10 rounded-full animate-float-1"></div>
        <div className="absolute top-10 right-20 w-12 h-12 bg-teal-400/10 rounded-full animate-float-2"></div>
        <div className="absolute bottom-20 left-20 w-14 h-14 bg-white/5 rounded-full animate-float-3"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
        
        {/* Text Content - Left Side */}
        <div className="flex-1 text-center lg:text-left">
          {/* Logo/Brand */}
          <div className={`mb-6 transform transition-all duration-700 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-3xl font-bold text-cyan-400">DokterGo</h1>
            <p className="text-blue-200 italic">Your Health, Our Website</p>
          </div>
          
          {/* Main Heading */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight transform transition-all duration-700 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Healthcare When
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              You Need It Most
            </span>
          </h1>
          
          {/* Description */}
          <p className={`text-lg md:text-xl text-blue-100 mb-8 max-w-2xl transform transition-all duration-700 delay-300 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Experience healthcare reimagined. Connect with top medical specialists, 
            book appointments instantly, and receive personalized care from the comfort of your home.
          </p>
          
          {/* Stats */}
          <div className={`flex flex-wrap gap-6 mb-8 transform transition-all duration-700 delay-500 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {stats.map((stat, index) => (
              <div key={index} className={`text-center p-4 bg-white/10 rounded-2xl min-w-[120px] transition-all duration-500 ${index === currentIndex ? 'bg-white/20 scale-105' : ''}`}>
                <div className="text-2xl font-bold text-cyan-300">{stat.value}</div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Divider */}
          <div className={`w-20 h-1 bg-cyan-400 mb-8 mx-auto lg:mx-0 transform transition-all duration-700 delay-700 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}></div>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 mb-6 transform transition-all duration-700 delay-900 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button
              onClick={() => {
                navigate("/doctors");
                scrollTo(0, 0);
              }}
              className="group bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
            >
              <FaSearch className="group-hover:animate-bounce" />
              Find Your Doctor
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => {
                navigate("/contact");
                scrollTo(0, 0);
              }}
              className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
            >
              <FaAmbulance className="group-hover:animate-pulse" />
              Emergency Care
            </button>
          </div>
          
          {/* Quick Navigation */}
          <div className={`flex flex-wrap gap-4 justify-center lg:justify-start text-sm transform transition-all duration-700 delay-1100 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="text-blue-200">Quick Access:</span>
            <button onClick={() => navigate("/doctors")} className="text-cyan-300 hover:text-cyan-200 transition-colors">ALL DOCTORS</button>
            <span className="text-blue-200">•</span>
            <button onClick={() => navigate("/about")} className="text-cyan-300 hover:text-cyan-200 transition-colors">ABOUT</button>
            <span className="text-blue-200">•</span>
            <button onClick={() => navigate("/contact")} className="text-cyan-300 hover:text-cyan-200 transition-colors">CONTACT</button>
          </div>
        </div>

        {/* Right Side - Doctor Image & Testimonial */}
        <div className="w-full lg:w-2/5">
          {/* Doctor Image */}
          <div className={`relative mb-6 transform transition-all duration-700 delay-300 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
              <img
                className="w-full h-72 object-cover rounded-xl"
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
                alt="Professional doctor"
              />
            </div>
            
            {/* Availability Badge */}
            <div className="absolute -top-3 -left-3 bg-green-500 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Available Today
            </div>
            
            {/* Organic Care Badge */}
            <div className="absolute -bottom-3 -right-3 bg-amber-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
              Organic Care
            </div>
          </div>
          
          {/* Emergency Care Card */}
          <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6 transform transition-all duration-700 delay-500 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center gap-3 mb-3">
              <FaAmbulance className="text-red-400 text-xl" />
              <h3 className="font-bold text-white">Emergency Care</h3>
            </div>
            <p className="text-blue-200 text-sm">24/7 emergency services with immediate response and professional care.</p>
          </div>
          
          {/* Testimonial */}
          <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-5 transform transition-all duration-700 delay-700 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-start gap-3 mb-3">
              <div className="flex text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <span className="text-white font-bold">4.9/5</span>
            </div>
            <p className="text-white italic mb-3 text-sm">The best healthcare experience Ive ever had. Quick, professional, and caring staff.</p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center text-white text-xs font-bold">JT</div>
              <span className="text-cyan-300 text-sm">Joe Taslim</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Create Account Button */}
      <div className={`text-center mt-8 transform transition-all duration-700 delay-1300 ${animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="inline-flex items-center gap-2 bg-white text-blue-800 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Create account
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Custom Animations */}
      <style >{`
        @keyframes float-1 {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes float-2 {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(10px) rotate(-5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes float-3 {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-12px) translateX(-8px); }
          100% { transform: translateY(0px) translateX(0px); }
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
      `}</style>
    </div>
  );
};

export default Banner;