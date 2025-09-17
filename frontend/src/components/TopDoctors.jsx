/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaRegCalendarAlt, FaStar } from "react-icons/fa";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-8 my-20 text-gray-900 md:mx-10 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Our Top Medical Specialists</h1>
        <p className="mt-4 text-gray-600 max-w-2xl">
          Connect with our trusted healthcare professionals for personalized care and treatment.
        </p>
      </div>
      
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 pt-5">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="group bg-white rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-blue-100"
            key={index}
          >
            <div className="relative overflow-hidden">
              <img 
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" 
                src={item.image} 
                alt={item.name} 
              />
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                item.available ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}>
                <span className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-gray-500"}`}></span>
                {item.available ? "Available" : "Not Available"}
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
                <span className="text-xs text-gray-500 ml-2">(4.9)</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{item.speciality}</p>
              
              <button className="mt-4 w-full bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                <FaRegCalendarAlt />
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-3 rounded-full mt-10 font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
      >
        View All Doctors
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default TopDoctors;