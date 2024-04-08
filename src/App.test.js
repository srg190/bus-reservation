import React from "react";
import { render } from "@testing-library/react";
import TestWrapper from "Test";
import { getConfig } from "@testing-library/react";

console.log(getConfig());

const customRender = (
  ui,
  RenderOptions
) => { 
  return render(ui, {
    wrapper: TestWrapper,
    ...RenderOptions,
  });
};

export * from "@testing-library/react";
export { customRender as render };