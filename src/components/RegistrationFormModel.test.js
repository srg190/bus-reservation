import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import BusReservationForm from "./RegistrationFormModel";

const mockStore = configureStore([]);

describe("BusReservationForm component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      booking: {
        tempDate: "2024-04-10",
        tempSeat: "1",
        users: [],
      },
    });
  });

  it("renders with correct initial values", () => {
    const { getByText } = render(
      <Provider store={store}>
        <BusReservationForm />
      </Provider>
    );

    expect(getByText("Apply Changes")).toBeInTheDocument();
    expect(getByText("Register to proceed")).toBeInTheDocument();
  });

  it("opens registration form on button click", () => {
    const { getByText, getByLabelText, queryByLabelText } = render(
      <Provider store={store}>
        <BusReservationForm />
      </Provider>
    );

    fireEvent.click(getByText("Register to proceed"));
    expect(getByLabelText("Your Name")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();

    // Check isSelected and isOpen
    expect(queryByLabelText("Your Name")).toBeTruthy();
    expect(queryByLabelText("Email")).toBeTruthy();
  });

  it("cancels registration form when cancel button is clicked", () => {
    const { getByText, queryByLabelText } = render(
      <Provider store={store}>
        <BusReservationForm />
      </Provider>
    );

    fireEvent.click(getByText("Register to proceed"));
    expect(getByText("Cancel")).toBeInTheDocument();

    fireEvent.click(getByText("Cancel"));
    expect(queryByLabelText("Your Name")).not.toBeInTheDocument();
    expect(queryByLabelText("Email")).not.toBeInTheDocument();

    // Check isSelected and isOpen
    expect(queryByLabelText("Your Name")).toBeFalsy();
    expect(queryByLabelText("Email")).toBeFalsy();
  });

  it("checks the form inputs and the presence of the 'Reserve Now' button", () => {
    const { getByText, getByLabelText, getByRole } = render(
      <Provider store={store}>
        <BusReservationForm />
      </Provider>
    );
    fireEvent.click(getByText("Register to proceed"));

    fireEvent.change(getByLabelText("Your Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });

    expect(getByLabelText("Your Name").value).toBe("John Doe");
    expect(getByLabelText("Email").value).toBe("john@example.com");
    expect(getByRole("button", { name: "Reserve Now" })).toBeInTheDocument();
  });
});
