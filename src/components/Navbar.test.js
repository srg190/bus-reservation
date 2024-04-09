import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import Navbar from "./Navbar";

describe("Navbar component", () => {
  it("navigates to the selected route", () => {
    const { getByText } = render(
      <Router>
        <Navbar />
      </Router>
    );

    fireEvent.click(getByText("Booking"));
    expect(window.location.pathname).toBe("/seat-booking");
    
    fireEvent.click(getByText("Dashboard"));
    expect(window.location.pathname).toBe("/");
  });
});
