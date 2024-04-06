import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  tempDate: "",
  tempSeat: "",
  allDates: [],
  allReserveseatsOnDate: [],
  allComlumns: [],
  users: {
    "14-02-12": {
      1: {
        name: "Sundar ban",
        seatNumber: 1,
        birth: "Lower",
        email: "test@example.com",
        dateOfTravelling: "14-02-12",
        status: "booked",
      },
    },
  },
};

const userSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    logout: (state) => {
      state = {};
    },
    reserveSeat: (state, action) => {
      const { name, seatNumber, email, dateOfTravelling } = action.payload;
      if (state.users[dateOfTravelling]) {
        state.users[dateOfTravelling] = {
          ...state.users[dateOfTravelling],
          [seatNumber]: {
            name,
            seatNumber,
            birth: seatNumber > 20 ? "Upper" : "Lower",
            dateOfTravelling,
            email,
          },
        };
      } else {
        state.users[dateOfTravelling] = {
          [seatNumber]: {
            name,
            seatNumber,
            birth: seatNumber > 20 ? "Upper" : "Lower",
            dateOfTravelling,
            email,
          },
        };
      }
    },
    isReserved: (state, action) => {
      const { seatNumber, dateOfTravelling } = action.payload;
      if (state.users?.[dateOfTravelling]?.[seatNumber]?.status === "booked") {
        return true;
      }
      return false;
    },
    getAllBookedDates: (state) => {
      state.allDates = Object.keys(state.users);
    },
    getAllReservedSeatesOfDate: (state, action) => {
      state.allReserveseatsOnDate = Object.keys(
        state.users?.[action.payload.dateOfTravelling]
      );
    },
    getColumns: (state) => {
      state.allComlumns = [
        "name",
        "seateNumber",
        "birth",
        "dateOfTravelling",
        "email",
      ];
    },
    getData: (state) => {
      return Object.keys(state.users)
        .map((seatNumber, idx) => {
          const userData = state.users[seatNumber];
          return Object.keys(userData).map((dataKey) => {
            const data = userData[dataKey];
            return {
              id: dataKey,
              seatId: seatNumber,
              email: data.email,
              status: data.status,
              reservationDate: data.dateOfTravelling,
              birth: data.birth,
              name: data.name,
            };
          });
        })
        .flat();
    },
    setTempData: (state, action) => {
      const { date, seat } = action.payload;
      if (date) state.tempDate = date;
      if (seat) state.tempSeat = seat;
    },
    clearTempData: (state, action) => {
      const { isDate, isSeat } = action.payload;
      if (isDate) state.tempDate = "";
      if (isSeat) state.tempSeat = "";
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
