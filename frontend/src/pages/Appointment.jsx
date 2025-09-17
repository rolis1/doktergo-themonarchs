/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
import { FaCalendarAlt, FaClock, FaMoneyBillWave, FaInfoCircle, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    if (!docInfo) return;
    
    setDocSlots([]);
    let today = new Date();
    let newSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      newSlots.push(timeSlots);
    }

    setDocSlots(newSlots);
  };

  const bookAppointment = async () => {
    if (!slotTime) {
      toast.warn("Please select a time slot");
      return;
    }

    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    setLoading(true);
    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to book appointment");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return (
    docInfo && (
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 mb-6 hover:text-blue-800 transition-colors"
        >
          <FaArrowLeft />
          Back to Doctors
        </button>

        {/* Doctor Details */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="flex flex-col lg:flex-row">
            {/* Doctor Image */}
            <div className="lg:w-1/3">
              <img
                className="w-full h-64 lg:h-full object-cover"
                src={docInfo.image}
                alt={docInfo.name}
              />
            </div>

            {/* Doctor Info */}
            <div className="lg:w-2/3 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{docInfo.name}</h1>
                    <img className="w-6" src={assets.verified_icon} alt="Verified" />
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {docInfo.degree}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {docInfo.speciality}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      {docInfo.experience} years experience
                    </span>
                  </div>
                </div>
              </div>

              {/* About Doctor */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                  <FaInfoCircle className="text-blue-500" />
                  About Doctor
                </div>
                <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>
              </div>

              {/* Appointment Fee */}
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <FaMoneyBillWave className="text-green-500" />
                Appointment fee: {currencySymbol}
                {docInfo.fees}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            Book Your Appointment
          </h2>

          {/* Date Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Date</h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {docSlots.map((item, index) => (
                item.length > 0 && (
                  <div
                    onClick={() => setSlotIndex(index)}
                    className={`flex flex-col items-center justify-center min-w-20 h-20 rounded-2xl cursor-pointer transition-all ${
                      slotIndex === index
                        ? "bg-blue-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    key={index}
                  >
                    <span className="text-sm font-semibold">{daysOfWeek[item[0].datetime.getDay()]}</span>
                    <span className="text-xl font-bold">{item[0].datetime.getDate()}</span>
                    <span className="text-xs">{item[0].datetime.toLocaleDateString('en-US', { month: 'short' })}</span>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaClock className="text-blue-500" />
              Select Time Slot
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {docSlots[slotIndex]?.map((item, index) => (
                <button
                  onClick={() => setSlotTime(item.time)}
                  className={`py-3 px-4 rounded-xl border transition-all ${
                    item.time === slotTime
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={bookAppointment}
            disabled={!slotTime || loading}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center gap-2 w-full justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Booking...
              </>
            ) : (
              <>
                <FaCheckCircle />
                Confirm Appointment - {currencySymbol}
                {docInfo.fees}
              </>
            )}
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;