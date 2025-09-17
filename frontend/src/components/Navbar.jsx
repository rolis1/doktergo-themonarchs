// Navbar.jsx - Modernized
import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaUserCircle, FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between py-5 px-6 bg-white shadow-md rounded-full mt-4 mx-4 sticky top-4 z-50">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer hover:opacity-80 transition-opacity"
        src={assets.logo}
        alt="DokterGo Logo"
      />
      
      <ul className="hidden md:flex items-center gap-8 font-medium">
        <NavLink 
          to="/" 
          className={({isActive}) => 
            `py-2 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full ${isActive ? "text-blue-600 after:w-full" : "text-gray-600"}`
          }
        >
          <li>HOME</li>
        </NavLink>
        <NavLink 
          to="/doctors" 
          className={({isActive}) => 
            `py-2 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full ${isActive ? "text-blue-600 after:w-full" : "text-gray-600"}`
          }
        >
          <li>ALL DOCTORS</li>
        </NavLink>
        <NavLink 
          to="/about" 
          className={({isActive}) => 
            `py-2 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full ${isActive ? "text-blue-600 after:w-full" : "text-gray-600"}`
          }
        >
          <li>ABOUT</li>
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({isActive}) => 
            `py-2 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full ${isActive ? "text-blue-600 after:w-full" : "text-gray-600"}`
          }
        >
          <li>CONTACT</li>
        </NavLink>
      </ul>
      
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100">
              <img className="w-full h-full object-cover" src={userData.image} alt={userData.name} />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            
            <div className="absolute top-full right-0 pt-4 text-base font-medium text-gray-600 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="min-w-48 bg-white rounded-2xl shadow-xl flex flex-col gap-2 p-4 border border-gray-100">
                <div
                  onClick={() => navigate("/my-profile")}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                >
                  <FaUserCircle className="text-lg" />
                  <span>My Profile</span>
                </div>
                <div
                  onClick={() => navigate("/my-appointments")}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                >
                  <FaCalendarAlt className="text-lg" />
                  <span>My Appointments</span>
                </div>
                <div 
                  onClick={logout} 
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-2.5 rounded-full font-medium hidden md:block shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Create account
          </button>
        )}
        
        <button 
          onClick={() => setShowMenu(true)}
          className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center"
        >
          <span className="w-6 h-0.5 bg-gray-700 rounded-full"></span>
          <span className="w-6 h-0.5 bg-gray-700 rounded-full"></span>
          <span className="w-6 h-0.5 bg-gray-700 rounded-full"></span>
        </button>
        
        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${showMenu ? "opacity-100 visible" : "opacity-0 invisible"}`}
          onClick={() => setShowMenu(false)}
        >
          <div 
            className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${showMenu ? "translate-x-0" : "translate-x-full"}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <img className="w-36" src={assets.logo} alt="MedAppoint Logo" />
              <button 
                onClick={() => setShowMenu(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <ul className="flex flex-col gap-2 mt-6 px-4">
              <NavLink onClick={() => setShowMenu(false)} to="/">
                <li className="px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">HOME</li>
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/doctors">
                <li className="px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">ALL DOCTORS</li>
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/about">
                <li className="px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">ABOUT</li>
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/contact">
                <li className="px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">CONTACT</li>
              </NavLink>
            </ul>
            
            {!token && (
              <div className="absolute bottom-6 left-0 right-0 px-4">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/login");
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-lg font-medium shadow-lg"
                >
                  Create account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;