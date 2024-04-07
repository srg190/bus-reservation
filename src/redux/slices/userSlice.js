import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tempDate: "",
  tempSeat: "",
  allDates: [],
  allReserveseatsOnDate: [],
  changedId: 0,
  allComlumns: [],
  allData: [],
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
    getAllBookedDates: (state) => {
      state.allDates = Object.keys(state.users);
    },
    getAllReservedSeatesOfDate: (state, action) => {
      const { dateOfTravelling } = action.payload;
      if (state.users.hasOwnProperty(dateOfTravelling))
      state.allReserveseatsOnDate = Object.keys(
        state.users?.[dateOfTravelling]
      ).map(key => +key);
      else {
        state.allReserveseatsOnDate = []
      }
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
      state.allData = Object.keys(state.users)
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
