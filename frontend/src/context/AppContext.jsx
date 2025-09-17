import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  // Konsisten menggunakan string kosong atau null
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null); // Gunakan null bukan false

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
  try {
    console.log("Loading user profile with token:", token);
    
    const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
      headers: { token },
    });
    
    console.log("Response from get-profile:", data);
    
    if (data.success) {
      setUserData(data.userData || data.user); // Coba kedua kemungkinan
      console.log("userData set to:", data.userData || data.user);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log("Error loading profile:", error);
    toast.error(error.message);
  }
};

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;