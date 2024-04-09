import bookingReducer, { bookingActions } from "./bookingSlice";
import { bookingMock } from "./slick.mock";

describe("bookingSlice reducer", () => {
  const initialState = {
    tempDate: "",
    tempSeat: "",
    allReserveseatsOnDate: [],
    allComlumns: [],
    allData: [],
    users: bookingMock,
  };

  it("should handle reserveSeat", () => {
    const action = {
      type: bookingActions.reserveSeat.type,
      payload: {
        name: "John Doe",
        seatNumber: 5,
        email: "john@example.com",
        dateOfTravelling: "2024-04-07",
      },
    };

    const newState = bookingReducer(initialState, action);

    expect(newState.users["2024-04-07"][5]).toEqual({
      name: "John Doe",
      seatNumber: 5,
      dateOfTravelling: "2024-04-07",
      email: "john@example.com",
    });
  });

  it("should handle removeBooking", () => {
    const action = {
      type: bookingActions.removeBooking.type,
      payload: {
        dateOfBooking: "2024-04-07",
        seatNumber: 1,
      },
    };

    const newState = bookingReducer(initialState, action);

    expect(newState.users["2024-04-07"][1]).toBeUndefined();
  });

  it("should handle getAllReservedSeatesOfDate when seats exist", () => {
    const action = {
      type: bookingActions.getAllReservedSeatesOfDate.type,
      payload: {
        dateOfTravelling: "2024-04-07",
      },
    };

    const newState = bookingReducer(initialState, action);

    expect(newState.allReserveseatsOnDate).toEqual([1, 2, 3, 4]);
  });

  it("should handle getAllReservedSeatesOfDate when no seats exist", () => {
    const action = {
      type: bookingActions.getAllReservedSeatesOfDate.type,
      payload: {
        dateOfTravelling: "2024-04-08",
      },
    };

    const newState = bookingReducer(initialState, action);

    expect(newState.allReserveseatsOnDate).toEqual([]);
  });
});
