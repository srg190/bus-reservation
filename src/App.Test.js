import React from "react";
import { render } from "@testing-library/react";
import TestWrapper from "./TestWrapper";
import { getConfig } from "@testing-library/react";

console.log(getConfig());

const customRender = (ui, options) => {
  return render(ui, { wrapper: TestWrapper, ...options });
};

export * from "@testing-library/react";
export { customRender as render };