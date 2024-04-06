import React, { useState } from "react";
import Deck from "../../components/Deck";
import DatePicker from "../../components/Datepicker";
import BusReservationForm from "../../components/RegistrationFromModel";

const Index = () => {
  return (
    <>
      <div className="flex mx-12">
        <div className="grid grid-cols-8">
          <div className="flex items-start flex-col-reverse col-span-6">
            <Deck isLowerDeck={false} />
            <Deck isLowerDeck={true} />
          </div>
        </div>
        <div className="grid grid-cols-4">
          <div className="col-span-4 mt-20 flex flex-col">
            <div>
              <h1>Select Date: </h1>
              <DatePicker />
            </div>
            <BusReservationForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
