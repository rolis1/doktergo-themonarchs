// Footer.jsx - Modernized
import React from "react";
import { assets } from "../assets/assets";
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mx-4 mt-32">
      <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Section */}
          <div className="lg:w-2/5">
            <img className="mb-6 w-44" src={assets.logo} alt="MedAppoint Logo" />
            <p className="text-gray-600 leading-7">
              DokterGo is an online doctor booking platform that makes it easy for you to find and schedule appointments with trusted doctors. We are committed to providing fast, easy, and secure healthcare services for every patient.
            </p>
            
            <div className="flex gap-4 mt-6">
              <a href="https://www.facebook.com/" target="_blank" className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                <FaFacebook />
              </a>
              <a href="https://x.com/" target="_blank" className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/halizadz/" target="_blank" className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/rolis-liu/" target="_blank" className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Center Section */}
          <div>
            <p className="text-xl font-semibold text-gray-800 mb-6">Quick Links</p>
            <ul className="flex flex-col gap-4 text-gray-600">
              <li className="hover:text-blue-600 transition-colors cursor-pointer">Home</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">About us</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">Services</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">Doctors</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">Contact us</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">Privacy policy</li>
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <p className="text-xl font-semibold text-gray-800 mb-6">Contact Info</p>
            <ul className="flex flex-col gap-4 text-gray-600">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <FaPhone className="text-sm" />
                </div>
                <span>+62 896-3576-6626</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <FaEnvelope className="text-sm" />
                </div>
                <span>doktergo@themonarch.com</span>
              </li>
            </ul>
            
          </div>
        </div>

        {/* Copyright Text */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} DokterGo. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;