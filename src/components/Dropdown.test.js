import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import DropdownMenu from "./Dropdown";

describe("DropdownMenu component", () => {
  const navItems = [
    { name: "Home", route: "/" },
    { name: "About", route: "/about" },
    { name: "Contact", route: "/contact" },
  ];

  it("renders correctly", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <DropdownMenu navItems={navItems} />
      </MemoryRouter>
    );
    expect(getByTestId("list-item-About")).toHaveTextContent("About");
    expect(getByTestId("list-item-Home")).toHaveTextContent("Home");
    expect(getByTestId("list-item-Contact")).toHaveTextContent("Contact");
  });
});
