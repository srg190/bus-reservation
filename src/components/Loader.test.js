import React from "react";
import { render } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader component", () => {
  it("renders loading text", () => {
    const { getByText } = render(<Loader />);
    const loadingText = getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });
});
