/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaVenusMars, FaBirthdayCake, FaEdit, FaSave, FaUpload } from "react-icons/fa";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateUserProfileData = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-4">
          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
          <span className="text-sm font-medium">Your Profile</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          MY <span className="text-blue-600">PROFILE</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
          {isEdit ? (
            <label htmlFor="image" className="cursor-pointer group">
              <div className="relative">
                <img
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:opacity-80 transition-opacity"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaUpload className="text-white text-2xl" />
                </div>
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
                accept="image/*"
              />
            </label>
          ) : (
            <img
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              src={userData.image}
              alt="Profile"
            />
          )}
          
          {isEdit ? (
            <input
              className="text-3xl font-bold text-center bg-gray-100 rounded-lg px-4 py-2 mt-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <h2 className="text-3xl font-bold text-gray-900 mt-4">{userData.name}</h2>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FaUser className="text-blue-500" />
              Contact Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-gray-400 text-lg" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <div className="text-blue-600 font-medium">{userData.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-gray-400 text-lg" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                  {isEdit ? (
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      type="text"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData((prev) => ({ ...prev, phone: e.target.value }))
                      }
                    />
                  ) : (
                    <div className="text-gray-800 font-medium">{userData.phone}</div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-gray-400 text-lg mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                  {isEdit ? (
                    <div className="space-y-2">
                      <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={userData.address.line1}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            address: { ...prev.address, line1: e.target.value },
                          }))
                        }
                        placeholder="Address Line 1"
                      />
                      <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={userData.address.line2}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            address: { ...prev.address, line2: e.target.value },
                          }))
                        }
                        placeholder="Address Line 2"
                      />
                    </div>
                  ) : (
                    <div className="text-gray-800">
                      <div>{userData.address.line1}</div>
                      <div>{userData.address.line2}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FaUser className="text-blue-500" />
              Basic Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaVenusMars className="text-gray-400 text-lg" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                  {isEdit ? (
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) =>
                        setUserData((prev) => ({ ...prev, gender: e.target.value }))
                      }
                      value={userData.gender}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <div className="text-gray-800 font-medium">{userData.gender}</div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaBirthdayCake className="text-gray-400 text-lg" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
                  {isEdit ? (
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      type="date"
                      onChange={(e) =>
                        setUserData((prev) => ({ ...prev, dob: e.target.value }))
                      }
                      value={userData.dob}
                    />
                  ) : (
                    <div className="text-gray-800 font-medium">{userData.dob}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-12">
          {isEdit ? (
            <>
              <button
                onClick={updateUserProfileData}
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Save Changes
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setIsEdit(false);
                  setImage(false);
                }}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaEdit />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;