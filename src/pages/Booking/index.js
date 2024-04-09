import React, { useEffect, useState } from "react";

import Deck from "../../components/Deck";
import DatePicker from "../../components/Datepicker";
import BusReservationForm from "../../components/RegistrationFormModel";
import { bookingActions } from "../../redux/slices/bookingSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const Booking = () => {
  const [selectedSeat, setSelectedSeats] = useState([]);
  const [isBookingEnabled, setIsBookingEnabled] = useState(false);
  const { clearTempData } = bookingActions;
  const { tempDate } = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tempDate) setIsBookingEnabled(true);
    if (!tempDate) setIsBookingEnabled(false);
  }, [tempDate]);

  useEffect(() => {
    if (window.location.pathname === "/seat-booking") {
      dispatch(clearTempData({ isDate: true, isSeat: true }));
    }
  }, [dispatch, clearTempData]);
  return (
    <>
      <div className="flex mx-12 justify-center justify-items-center	">
        <div className="grid grid-cols-4 mr-4">
          <div className="mt-20 flex flex-col">
            <div className="bg-primary rounded p-4 shadow-md">
              <h1 className="text-secondary-100 font-serif text-xl mb-2">
                Select Date:
              </h1>
              <DatePicker className="border border-gray rounded px-3 py-2 focus:outline-none focus:border-primary" />
            </div>
            <div className="mt-2">
              <BusReservationForm />
            </div>

          </div>
        </div>
        <div className="grid grid-cols-8 ml-4">
          <div className="col-span-6">
            <h1 className="bg-primary text-white w-100 mt-10 px-2">
              Click on an available seat to proceed with your booking
            </h1>
            <div
              className={` flex items-start flex-col ${
                isBookingEnabled
                  ? ""
                  : "opacity-50 pointer-events-none cursor-not-allowed"
              }`}
            >
              <Deck
                isLowerDeck={true}
                selectedSeats={selectedSeat}
                setSelectedSeats={setSelectedSeats}
              />
              <Deck
                isLowerDeck={false}
                selectedSeats={selectedSeat}
                setSelectedSeats={setSelectedSeats}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
