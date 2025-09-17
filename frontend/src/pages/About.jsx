/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { assets } from "../assets/assets";
// eslint-disable-next-line no-unused-vars
import { FaHeartbeat, FaClock, FaUserMd, FaStar, FaRocket, FaUsers } from "react-icons/fa";

const About = () => {
  const [activeReason, setActiveReason] = useState(0);

  const reasons = [
    {
      icon: <FaClock className="text-blue-500 text-2xl" />,
      title: "Efficiency",
      description: "Streamlined appointment scheduling that fits into your busy lifestyle."
    },
    {
      icon: <FaUserMd className="text-teal-500 text-2xl" />,
      title: "Convenience",
      description: "Access to a network of trusted healthcare professionals in your area."
    },
    {
      icon: <FaHeartbeat className="text-purple-500 text-2xl" />,
      title: "Personalization",
      description: "Tailored recommendations and reminders to help you stay on top of your health."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-4">
          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
          <span className="text-sm font-medium">About Prescripto</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          ABOUT <span className="text-blue-600">US</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the story behind our mission to revolutionize healthcare accessibility
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="w-full lg:w-1/2">
          <div className="relative">
            <img
              className="w-full rounded-2xl shadow-xl"
              src={assets.about_image}
              alt="Healthcare team"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <FaUsers className="text-green-600 text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Patients Served</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Welcome to <span className="text-blue-600 font-semibold">DokterGo</span>, 
              your reliable partner for convenient and efficient healthcare management. 
              We simplify the process of booking doctor appointments and keeping track of your health records, 
              so you can focus on what matters most—your well-being.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              <span className="text-blue-600 font-semibold">DokterGo</span> is dedicated to advancing healthcare technology. 
                We continuously improve our platform by integrating the latest innovations 
                to provide a seamless user experience and exceptional service. 
                Whether you're booking your first appointment or managing ongoing care, 
                DokterGo is here to support you every step of the way.
            </p>
            
            <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <FaRocket className="text-blue-500" />
                Our Vision
              </h3>
              <p className="text-gray-700">
                Our vision at <span className="text-blue-600 font-semibold">DokterGo </span> is to deliver a seamless healthcare experience for every user. 
                We strive to bridge the gap between patients and healthcare providers, 
                ensuring that you can access the care you need—anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          WHY <span className="text-blue-600">CHOOSE US</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience the difference with our patient-centered approach to healthcare
        </p>
      </div>

      {/* Reasons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
              activeReason === index
                ? "border-blue-500 bg-blue-50 shadow-lg transform scale-105"
                : "border-gray-200 hover:border-blue-300 hover:shadow-md"
            }`}
            onClick={() => setActiveReason(index)}
            onMouseEnter={() => setActiveReason(index)}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                {reason.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{reason.title}</h3>
            </div>
            <p className="text-gray-600">{reason.description}</p>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-8 text-white text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-2">100+</div>
            <div className="text-blue-100">Expert Doctors</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
            <div className="text-blue-100">Availability</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
            <div className="text-blue-100">Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
            <div className="text-blue-100">Patients</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;