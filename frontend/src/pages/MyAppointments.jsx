/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaMoneyBillWave, FaTimesCircle, FaCheckCircle, FaCreditCard } from "react-icons/fa";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData, currencySymbol } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const months = [
    "", "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-4">
          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
          <span className="text-sm font-medium">Your Appointments</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          MY <span className="text-blue-600">APPOINTMENTS</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manage your upcoming and past medical appointments
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
          <div className="text-gray-400 text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments yet</h3>
          <p className="text-gray-600 mb-6">You havent booked any appointments yet.</p>
          <button 
            onClick={() => window.location.href = '/doctors'}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Book Your First Appointment
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Doctor Image */}
                  <div className="md:w-1/4">
                    <img
                      className="w-full h-48 object-cover rounded-xl"
                      src={item.docData.image}
                      alt={item.docData.name}
                    />
                  </div>

                  {/* Appointment Details */}
                  <div className="md:w-2/4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.docData.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-4">{item.docData.speciality}</p>

                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span>{item.docData.address.line1}, {item.docData.address.line2}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <FaCalendarAlt className="text-gray-400" />
                        <span>{slotDateFormat(item.slotDate)}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <FaClock className="text-gray-400" />
                        <span>{item.slotTime}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <FaMoneyBillWave className="text-gray-400" />
                        <span className="font-semibold">{currencySymbol}{item.docData.fees}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="md:w-1/4 flex flex-col gap-3">
                    {!item.cancelled && !item.isCompleted && (
                      <button className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                        <FaCreditCard />
                        Pay Online
                      </button>
                    )}
                    
                    {!item.cancelled && !item.isCompleted && (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="flex items-center justify-center gap-2 bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                      >
                        <FaTimesCircle />
                        Cancel Appointment
                      </button>
                    )}
                    
                    {item.cancelled && !item.isCompleted && (
                      <div className="bg-red-100 text-red-800 py-3 px-4 rounded-lg text-center">
                        <FaTimesCircle className="inline-block mr-2" />
                        Appointment Cancelled
                      </div>
                    )}
                    
                    {item.isCompleted && (
                      <div className="bg-green-100 text-green-800 py-3 px-4 rounded-lg text-center">
                        <FaCheckCircle className="inline-block mr-2" />
                        Completed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;