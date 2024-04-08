import React, { useState } from "react";
import Deck from "../../components/Deck";
import DatePicker from "../../components/Datepicker";
import BusReservationForm from "../../components/RegistrationFormModel";
import Loader from "../../components/Loader";

const Booking = () => {
  const [selectedSeat, setSelectedSeats] = useState([]);
  return (
    <>
      <div className="flex mx-12">
        <div className="grid grid-cols-4">
          <div className="col-span-4 mt-20 flex flex-col">
            <div>
              <h1>Select Date: </h1>
              <DatePicker />
            </div>
            <BusReservationForm />
          </div>
        </div>
        <div className="grid grid-cols-8">
          <div className="flex items-start flex-col col-span-6">
            <h1 className="bg-primary text-white w-100 mt-10 px-2">Click on an available seat to proceed with your booking</h1>
            <Deck isLowerDeck={true} selectedSeats={selectedSeat} setSelectedSeats={setSelectedSeats} />
            <Deck isLowerDeck={false} selectedSeats={selectedSeat} setSelectedSeats={setSelectedSeats} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
