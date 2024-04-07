/* eslint-disable no-unused-expressions */
/* eslint-disable no-labels */
/* eslint-disable no-label-var */
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/slices/userSlice";

let rowData;

export const EditCell = ({ row, table }) => {
  const [deleteBooking, setDeleteBooking] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const dispatch = useDispatch();
  const bookingData = useSelector((state) => state.userReducer.users);
  const meta = table.options.meta;
  const setEditedRows = (e) => {
    rowData = row.original;
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old) => {
      return {
        ...old,
        [row.id]: !old[row.id],
      };
    });
    if (elName !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel");
    }
  };
  const handleEdit = (e) => {
    let updatedData;
    const regex = /^[^\s@]+@[^\s@]+\.(?:com|org)$/i;
    if (rowData.dateOfBooking !== row.original.dateOfBooking) {
      const isBookingExists = bookingData[row.original.dateOfBooking]?.[
        row.original.seatNumber
      ]
        ? true
        : false;
      const isEmailInvalid = !regex.test(row.original.email) ? true : false;
      setDateError(isBookingExists);
      setEmailError(isEmailInvalid);
      updatedData = {
        dateOfBooking: isBookingExists
          ? rowData.dateOfBooking
          : row.original.dateOfBooking,
        seatNumber: row.original.seatNumber,
        name: row.original.name,
        email: isEmailInvalid ? rowData.email : row.original.email,
        ...(!isBookingExists && { oldDateOfBooking: rowData.dateOfBooking }),
      };
    } else if (rowData.email !== row.original.email) {
      setDateError(false);
      const isEmailInValid = !regex.test(row.original.email) ? true : false;
      setEmailError(isEmailInValid);
      updatedData = {
        dateOfBooking: row.original.dateOfBooking,
        seatNumber: row.original.seatNumber,
        name: row.original.name,
        email: isEmailInValid ? rowData.email : row.original.email,
      };
    } else {
      setDateError(false);
      setEmailError(false);
      updatedData = {
        dateOfBooking: row.original.dateOfBooking,
        seatNumber: row.original.seatNumber,
        name: row.original.name,
        email: row.original.email,
      };
    }
    dispatch(userActions.updateBooking(updatedData));

    const elName = e.currentTarget.name;
    meta?.setEditedRows((old) => {
      return {
        ...old,
        [row.id]: !old[row.id],
      };
    });
    if (elName !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel");
    }
  };
  const handleOnClick = () => {
    setDeleteBooking(!deleteBooking);
  };
  const handleDelete = () => {
    setDeleteBooking(false);
    dispatch(
      userActions.removeBooking({
        dateOfBooking: row.original.dateOfBooking,
        seatNumber: row.original.seatNumber,
      })
    );
  };

  return (
    <>
      <div className="edit-cell-container">
        {meta?.editedRows[row.id] ? (
          <div className="edit-cell">
            <button onClick={setEditedRows} name="cancel">
              X
            </button>{" "}
            <button onClick={handleEdit} name="done">
              ✔
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            {new Date(row.original.dateOfBooking).getTime() >= Date.now() ? (
              <button onClick={setEditedRows} name="edit">
                ✐
              </button>
            ) : null}

            {deleteBooking ? (
              <div className="fixed inset-0 flex items-center justify-center">
                <div className="fixed inset-0 bg-black opacity-50"></div>

                <div className="relative bg-white p-8 rounded shadow-lg">
                  <h2 className="text-lg font-semibold mb-4">
                    Are you sure you want to delete?
                  </h2>
                  <div className="flex justify-end">
                    <button
                      className="px-4 py-2 mr-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>

                    <button
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                      onClick={handleOnClick}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <MdDelete
                className="text-[#ffb918] text-lg cursor-pointer"
                onClick={handleOnClick}
              />
            )}
          </div>
        )}
      </div>
      {dateError && <p>Already Booked</p>}
      {emailError && <p>Email invalid</p>}
    </>
  );
};
