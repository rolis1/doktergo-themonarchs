/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { assets } from "../assets/assets";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBriefcase, FaPaperPlane, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-4">
          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
          <span className="text-sm font-medium">Get In Touch</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          CONTACT <span className="text-blue-600">US</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We d love to hear from you. Reach out to us for any questions or feedback.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 mb-20">
        {/* Contact Image & Info */}
        <div className="w-full lg:w-2/5">
          <div className="relative mb-8">
            <img
              className="w-full rounded-2xl shadow-xl"
              src={assets.contact_image}
              alt="Contact us"
            />
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaPaperPlane className="text-blue-600 text-xl" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Quick Response</div>
                  <div className="text-xs text-gray-600">Within 24 hours</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                OUR OFFICE
              </h3>
              <p className="text-gray-600 mb-2">
                Jl. DokterGo <br /> 330, Jakarta, Indonesia
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaPhone className="text-blue-500" />
                CONTACT INFO
              </h3>
              <p className="text-gray-600 mb-2">
                Tel: +62 896-3576-6626 <br /> Email: doktergo@themonarch.com
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">FOLLOW US</h3>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/"  target='_blank' className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                  <FaFacebook />
                </a>
                <a href="https://x.com/" target="_blank" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                  <FaTwitter />
                </a>
                <a href="https://www.linkedin.com/in/rolis-liu/" target="_blank" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form & Careers */}
        <div className="w-full lg:w-3/5">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FaPaperPlane />
                Send Message
              </button>
            </form>
          </div>

          {/* Careers Section */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FaBriefcase />
              CAREERS AT DOKTERGO
            </h3>
            <p className="mb-6 text-blue-100">
              Join our team of healthcare innovators and make a difference in patients lives.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Explore Job Opportunities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;