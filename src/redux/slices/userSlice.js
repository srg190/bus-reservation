import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  isAuthenticated: "",
};

const userSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    logout: (state, action) => {
      state = {};
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
