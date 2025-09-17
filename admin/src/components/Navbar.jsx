import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b">
      <div className="flex items-center gap-3">
        <img
          className="w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="DokterGo Admin"
        />
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
          <FaUser className="text-xs" />
          {aToken ? "Admin" : "Doctor"}
        </span>
      </div>
      <button
        onClick={logout}
        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
      >
        <FaSignOutAlt className="text-sm" />
        Logout
      </button>
    </div>
  );
};

export default Navbar;