import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../redux/store";
import { bookingActions } from "../redux/slices/bookingSlice";

const BusReservationForm = () => {
  const { tempDate, tempSeat } = useAppSelector((state) => state.booking);
  const { clearTempData, reserveSeat, getAllReservedSeatesOfDate } =
    bookingActions;
  const dispatch = useAppDispatch();

  const [isSelected, setIsSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    seat: "",
    email: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsOpen(false);
    dispatch(clearTempData({ isDate: true, isSeat: true }));
    dispatch(
      reserveSeat({
        name: formData.name,
        seatNumber: formData.seat,
        email: formData.email,
        dateOfTravelling: formData.date,
      })
    );
    toast.success("Booking successful");
    dispatch(getAllReservedSeatesOfDate({ dateOfTravelling: "" }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    if (tempDate && tempSeat) {
      setFormData({
        ...formData,
        date: tempDate,
        seat: tempSeat,
      });
      setIsSelected(true);
    }
    if (!tempDate || !tempSeat) {
      setFormData({
        ...formData,
        date: tempDate,
        seat: tempSeat,
      });
      setIsSelected(false);
    }
  }, [tempDate, tempSeat, dispatch]);
  return (
    <div>
      {isSelected && (
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
          <>
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Apply Changes
              </h2>
              <button
                onClick={() => setIsOpen(true)}
                className="bg-primary text-white px-4 py-2 rounded-md focus:outline-none focus:bg-opacity-80"
              >
                Register to proceed
              </button>

              {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md w-96">
                    <div className="px-6 py-4">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Bus Reservation Form
                      </h2>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4 flex justify-between">
                          <label
                            htmlFor="date"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Seat #: {tempSeat}
                          </label>
                          <label
                            htmlFor="date"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Date #:{" "}
                            {new Date(tempDate.toLocaleString()).toLocaleString(
                              "en",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </label>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="name"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Your Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="email"
                            className="block text-gray-700 font-medium mb-2"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="flex justify-between">
                          <button
                            onClick={() => setIsOpen(false)}
                            className="bg-white text-primary px-4 py-2 rounded-md focus:outline-none focus:bg-opacity-80 border border-2"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 rounded-md focus:outline-none focus:bg-opacity-80"
                          >
                            Reserve Now
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default BusReservationForm;
