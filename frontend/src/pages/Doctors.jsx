/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaFilter, FaSearch, FaStar, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(speciality || "");

  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const specialties = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist"
  ];

  const applyFilter = () => {
    let filtered = doctors;

    if (selectedSpecialty) {
      filtered = filtered.filter((doc) => doc.speciality === selectedSpecialty);
    }

    if (searchTerm) {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, selectedSpecialty, searchTerm]);

  const handleSpecialtyClick = (specialty) => {
    if (selectedSpecialty === specialty) {
      setSelectedSpecialty("");
      navigate("/doctors");
    } else {
      setSelectedSpecialty(specialty);
      navigate(`/doctors/${specialty}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-4">
          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
          <span className="text-sm font-medium">Find Your Doctor</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          OUR <span className="text-blue-600">SPECIALISTS</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through our team of expert healthcare professionals dedicated to your well-being
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Search Bar */}
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctors by name or speciality..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Filter Toggle for Mobile */}
        <button
          className="lg:hidden flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaFilter />
          Filters
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Specialty Filters */}
        <div className={`w-full lg:w-1/4 ${showFilter ? "block" : "hidden lg:block"}`}>
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FaFilter className="text-blue-500" />
              Specialties
            </h3>
            <div className="space-y-2">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => handleSpecialtyClick(specialty)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    selectedSpecialty === specialty
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                Showing <span className="font-semibold">{filterDoc.length}</span> doctors
                {selectedSpecialty && ` in ${selectedSpecialty}`}
              </p>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="w-full lg:w-3/4">
          {filterDoc.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterDoc.map((doctor, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(`/appointment/${doctor._id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      src={doctor.image}
                      alt={doctor.name}
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                      doctor.available ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${doctor.available ? "bg-green-500" : "bg-gray-500"}`}></span>
                      {doctor.available ? "Available" : "Not Available"}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-sm" />
                      ))}
                      <span className="text-xs text-gray-500 ml-2">(4.9)</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {doctor.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">{doctor.speciality}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span>2 km away</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt className="text-gray-400" />
                        <span>Next: Today</span>
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <FaCalendarAlt />
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;