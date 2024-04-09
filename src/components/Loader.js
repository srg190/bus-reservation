import React from "react";
import { ReactComponent as YourIcon } from "../assets/icons/loader.svg";

const Loader = () => {
  return (
    <div
      role="status"
      className="absolute left-2/4 top-2/4 flex flex-col items-center -translate-x-2/4 -translate-y-2/4"
    >
      <YourIcon />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
