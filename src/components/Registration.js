import React, { useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { userActions } from "../../redux/slices/userSlice";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { login } = userActions;

  const handleClick = () => {
    dispatch(login({ email, password, isAuthenticated: true }));
  };

  return (
    <>
      <div>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button onClick={handleClick}>Submit</button>
        <p className="text-gray-700">Hello</p>
      </div>
    </>
  );
};

export default Index;
