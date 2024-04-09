import React from "react";
import Booking from ".";
import { render } from "../../App.Test";

describe("Booking component", () => {
  const renderComponent = () => {
    return render(<Booking />);
  }
  it("renders Booking component with all elements", () => {
    const { getByText } = renderComponent();
    const isUpperDeckExist = getByText('Upper Deck');
    const isLowerDeckExist = getByText('Lower Deck');
    expect(!!isUpperDeckExist && !!isLowerDeckExist).toBe(true);
  });
  
});
