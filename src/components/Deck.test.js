import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import BusSeatReservation from "./Deck";

// Mocking Redux store
const mockStore = configureStore([]);
const initialState = {
  booking: {
    tempSeat: null,
    allReserveseatsOnDate: [],
    tempDate: null,
  },
};

const store = mockStore(initialState);

describe("BusSeatReservation component", () => {
  const setSelectedSeats = jest.fn();

  const renderComponent = (isLowerDeck = true) => {
    return render(
      <Provider store={store}>
        <BusSeatReservation
          setSelectedSeats={setSelectedSeats}
          isLowerDeck={isLowerDeck}
        />
      </Provider>
    );
  };

  afterEach(() => {
    setSelectedSeats.mockClear();
  });

  it("selects a seat when clicked and it's not reserved", () => {
    const { getByText } = renderComponent();
    const seat = getByText("1");
    fireEvent.click(seat);
    expect(setSelectedSeats).toHaveBeenCalledWith([1]);
  });

  it("deselects a seat when clicked again", () => {
    const { getByText } = renderComponent();
    const seat = getByText("1");
    fireEvent.click(seat);
    expect(setSelectedSeats).toHaveBeenCalledWith([]);
  });

  it("changes color of unreserved and selected seats", () => {
    const { getByText } = renderComponent();
    const unreservedSeat = getByText("2");
    fireEvent.click(unreservedSeat);
    expect(setSelectedSeats).toHaveBeenCalledWith([2]);
  });

  describe("Deck selection", () => {
    it("renders with default props for Upper Deck", () => {
      const { getByTestId } = renderComponent(false);
      expect(getByTestId("deck")).toHaveTextContent("Upper Deck");
    });

    it("renders with default props for Lower Deck", () => {
      const { getByTestId } = renderComponent();
      expect(getByTestId("deck")).toHaveTextContent("Lower Deck");
    });

    it("renders steering wheel image for Lower Deck", () => {
      const { getByAltText } = renderComponent();
      const steeringWheelImage = getByAltText("Steering Wheel");
      expect(steeringWheelImage).toBeInTheDocument();
    });
  });
});
