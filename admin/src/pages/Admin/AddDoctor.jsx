/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import { FaUpload, FaUser, FaEnvelope, FaLock, FaBriefcase, FaMoneyBill, FaGraduationCap, FaMapMarker, FaFileAlt, FaPlus } from "react-icons/fa";

const AddDoctor = () => {
  const [docImg, SetDocImg] = useState(false);
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [experience, SetExperience] = useState("1 Year");
  const [fees, SetFees] = useState("");
  const [about, SetAbout] = useState("");
  const [speciality, SetSpeciality] = useState("General physician");
  const [degree, SetDegree] = useState("");
  const [address1, SetAddress1] = useState("");
  const [address2, SetAddress2] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!docImg) {
        toast.error("Please upload a doctor image");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success("Doctor added successfully!");
        // Reset form
        SetDocImg(false);
        SetName("");
        SetEmail("");
        SetPassword("");
        SetFees("");
        SetAbout("");
        SetDegree("");
        SetAddress1("");
        SetAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add doctor");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Doctor</h1>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-8">
          {/* Image Upload */}
          <div className="flex items-center gap-6">
            <label htmlFor="doc-img" className="cursor-pointer group">
              <div className="relative">
                <img
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 group-hover:border-blue-400 transition-colors"
                  src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                  alt="Doctor preview"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaUpload className="text-white text-xl" />
                </div>
              </div>
              <input
                onChange={(e) => SetDocImg(e.target.files[0])}
                type="file"
                id="doc-img"
                hidden
                accept="image/*"
              />
            </label>
            <div>
              <p className="text-gray-700 font-medium">Upload Doctor Photo</p>
              <p className="text-gray-500 text-sm">JPG, PNG or GIF - Max 5MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaUser className="text-blue-500" />
                  Doctor Name
                </label>
                <input
                  onChange={(e) => SetName(e.target.value)}
                  value={name}
                  className="input-field"
                  type="text"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaEnvelope className="text-blue-500" />
                  Email Address
                </label>
                <input
                  onChange={(e) => SetEmail(e.target.value)}
                  value={email}
                  className="input-field"
                  type="email"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaLock className="text-blue-500" />
                  Password
                </label>
                <input
                  onChange={(e) => SetPassword(e.target.value)}
                  value={password}
                  className="input-field"
                  type="password"
                  placeholder="Create password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaBriefcase className="text-blue-500" />
                  Experience
                </label>
                <select
                  onChange={(e) => SetExperience(e.target.value)}
                  value={experience}
                  className="input-field"
                  required
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(year => (
                    <option key={year} value={`${year} Year`}>{year} Year{year > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaMoneyBill className="text-blue-500" />
                  Consultation Fees
                </label>
                <input
                  onChange={(e) => SetFees(e.target.value)}
                  value={fees}
                  className="input-field"
                  type="number"
                  placeholder="Enter fees amount"
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaUser className="text-blue-500" />
                  Speciality
                </label>
                <select
                  onChange={(e) => SetSpeciality(e.target.value)}
                  value={speciality}
                  className="input-field"
                  required
                >
                  <option value="General physician">General Physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatrician</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaGraduationCap className="text-blue-500" />
                  Education/Degree
                </label>
                <input
                  onChange={(e) => SetDegree(e.target.value)}
                  value={degree}
                  className="input-field"
                  type="text"
                  placeholder="e.g., MBBS, MD, etc."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaMapMarker className="text-blue-500" />
                  Address
                </label>
                <input
                  onChange={(e) => SetAddress1(e.target.value)}
                  value={address1}
                  className="input-field mb-2"
                  type="text"
                  placeholder="Address line 1"
                  required
                />
                <input
                  onChange={(e) => SetAddress2(e.target.value)}
                  value={address2}
                  className="input-field"
                  type="text"
                  placeholder="Address line 2"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FaFileAlt className="text-blue-500" />
              About Doctor
            </label>
            <textarea
              onChange={(e) => SetAbout(e.target.value)}
              value={about}
              className="input-field"
              placeholder="Write about the doctor's expertise, experience, and specialties..."
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Adding Doctor...
              </>
            ) : (
              <>
                <FaPlus />
                Add Doctor
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;