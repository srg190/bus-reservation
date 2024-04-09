import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { bookingActions } from "../../redux/slices/bookingSlice";
import { useAppDispatch } from "../../redux/store";
import { toast } from "react-toastify";

let rowData;

export const EditCell = ({ row, table }) => {
  const [deleteBooking, setDeleteBooking] = useState(false);
  const dispatch = useAppDispatch();
  const meta = table.options.meta;
  const setEditedRows = (e) => {
    rowData = row.original;
    const elName = e.currentTarget.name;
    if (elName === "cancel") {
      dispatch(bookingActions.updateCancelClick());
    }
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
    if (row.original.dateError || row.original.emailError) return;
    let newData;
    if (rowData.dateOfBooking !== row.original.dateOfBooking) {
      newData = {
        dateOfBooking: row.original.dateOfBooking,
        seatNumber: row.original.seatNumber,
        name: row.original.name,
        email: row.original.email,
        oldDateOfBooking: rowData.dateOfBooking,
      };
    } else {
      newData = {
        dateOfBooking: row.original.dateOfBooking,
        seatNumber: row.original.seatNumber,
        name: row.original.name,
        email: row.original.email,
      };
    }
    dispatch(bookingActions.updateBooking(newData));

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
    toast.success("Booking edited successfully");
  };
  const handleOnClick = () => {
    setDeleteBooking(!deleteBooking);
  };
  const handleDelete = () => {
    setDeleteBooking(false);
    dispatch(
      bookingActions.removeBooking({
        dateOfBooking: row.original.dateOfBooking,
        seatNumber: row.original.seatNumber,
        currentPage: table.getState().pagination.pageIndex,
      })
    );
    toast.success("Booking deleted successfully");
  };
  const isEditable =
    new Date(row.original.dateOfBooking).getTime() >= Date.now();
  return (
    <>
      <div className="edit-cell-container">
        {meta?.editedRows[row.id] ? (
          <div className="edit-cell">
            <button onClick={setEditedRows} name="cancel">
              X
            </button>{" "}
            <button onClick={(e) => handleEdit(e)} name="done">
              ✔
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            {isEditable ? (
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
                  <div className="flex justify-center">
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
                className="text-primary text-lg cursor-pointer "
                onClick={handleOnClick}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};
