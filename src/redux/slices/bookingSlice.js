import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tempDate: "",
  tempSeat: "",
  allReserveseatsOnDate: [],
  allComlumns: [],
  allData: [],
  users: {
    "2024-04-07": {
      1: {
        name: "test",
        email: "test@test.com",
      },
      2: {
        name: "test",
        email: "test@test.com",
      },
      3: {
        name: "test",
        email: "test@test.com",
      },
      4: {
        name: "test",
        email: "test@test.com",
      },
    },
    "2024-04-09": {
      1: {
        name: "test",
        email: "test@test.com",
      },
      2: {
        name: "test",
        email: "test@test.com",
      },
      3: {
        name: "test",
        email: "test@test.com",
      },
      4: {
        name: "test",
        email: "test@test.com",
      },
    },
    "2024-04-10": {
      1: {
        name: "test",
        email: "test@test.com",
      },
      2: {
        name: "test",
        email: "test@test.com",
      },
      3: {
        name: "test",
        email: "test@test.com",
      },
      4: {
        name: "test",
        email: "test@test.com",
      },
    },
    "2024-04-11": {
      1: {
        name: "test",
        email: "test@test.com",
      },
      2: {
        name: "test",
        email: "test@test.com",
      },
      3: {
        name: "test",
        email: "test@test.com",
      },
      4: {
        name: "test",
        email: "test@test.com",
      },
    },
    "2024-04-12": {
      1: {
        name: "test",
        email: "test@test.com",
      },
      2: {
        name: "test",
        email: "test@test.com",
      },
      3: {
        name: "test",
        email: "test@test.com",
      },
      4: {
        name: "test",
        email: "test@test.com",
      },
    },
  },
};

const bookingSlice = createSlice({
  name: "booking",
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
            dateOfTravelling,
            email,
          },
        };
      } else {
        state.users[dateOfTravelling] = {
          [seatNumber]: {
            name,
            seatNumber,
            dateOfTravelling,
            email,
          },
        };
      }
    },
    removeBooking: (state, action) => {
      delete state.users[action.payload.dateOfBooking][
        action.payload.seatNumber
      ];
      if (Object.keys(state.users[action.payload.dateOfBooking]).length === 0)
        delete state.users[action.payload.dateOfBooking];
    },
    updateBooking: (state, action) => {
      const { dateOfBooking, seatNumber, name, email } = action.payload;
      state.users[dateOfBooking] = {
        ...state.users[dateOfBooking],
        [seatNumber]: {
          name,
          email,
        },
      };
      if (action.payload.oldDateOfBooking) {
        delete state.users[action.payload.oldDateOfBooking][seatNumber];
        if (Object.keys(state.users[action.payload.dateOfBooking]).length === 0)
          delete state.users[action.payload.dateOfBooking];
      }
    },
    getAllReservedSeatesOfDate: (state, action) => {
      const { dateOfTravelling } = action.payload;
      if (state.users.hasOwnProperty(dateOfTravelling))
        state.allReserveseatsOnDate = Object.keys(
          state.users?.[dateOfTravelling]
        ).map((key) => +key);
      else {
        state.allReserveseatsOnDate = [];
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

export const bookingActions = bookingSlice.actions;
export default bookingSlice.reducer;
