import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { userActions } from "../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const App = () => {
  const { setTempData, clearTempData } = userActions;
  const { tempDate } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    if (!newValue.startDate) {
      dispatch(clearTempData({ isDate: true }));
    }
    dispatch(setTempData({ date: newValue.startDate?.toString() }));
    setValue(newValue);
  };

  useEffect(() => {
    if (!tempDate) setValue({
      endDate: null,
      startDate: null,
    })
  }, [dispatch, tempDate]);

  return (
    <Datepicker
      useRange={false}
      asSingle={true}
      value={value}
      startFrom={new Date()}
      onChange={handleValueChange}
    />
  );
};
export default App;
