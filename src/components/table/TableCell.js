import { useState, useEffect } from "react";
import "./table.css";
import { useAppSelector } from "../../redux/store";

export const TableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);
  const [emailError, setEmailError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const { users: bookingData, cancelButtonClicked } = useAppSelector(
    (state) => state.booking
  );

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];
  useEffect(() => {
    setValue(initialValue);
    setEmailError(false);
  }, [initialValue, cancelButtonClicked]);

  const onSelectChange = (e) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };

  const handleOnchange = (e) => {
    if (columnMeta?.type === "email") {
      const newVal = e.target.value;
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(newVal)) {
        row.original.emailError = true;
        setEmailError(true);
      } else {
        row.original.emailError = false;
        row.original.email = e.target.value;
        setEmailError(false);
      }
    }
    if (
      columnMeta?.type === "date" &&
      row.original.dateOfBooking !== e.target.value
    ) {
      const isBookingExists = bookingData[e.target.value]?.[
        row.original.seatNumber
      ]
        ? true
        : false;
      if (isBookingExists) {
        row.original.dateError = true;
        setDateError(true);
      } else {
        row.original.dateError = false;
        row.original.dateOfBooking = e.target.value;
        setDateError(false);
      }
    } else {
      row.original.dateError = false;
      setDateError(false);
    }
    if (columnMeta?.type === "text") row.original.name = e.target.value;
    setValue(e.target.value);
  };

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <select onChange={onSelectChange} value={initialValue}>
        {columnMeta?.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <>
        <input
          value={value}
          onChange={handleOnchange}
          type={columnMeta?.type || "text"}
          min={minDate}
        />
        {emailError && (
          <p className="!text-error text-xs">*Please enter a valid email</p>
        )}
        {dateError && (
          <p className="!text-error text-xs">
            Seat already booked for the selected date
          </p>
        )}
      </>
    );
  }
  return <span>{value}</span>;
};
