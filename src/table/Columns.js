import { createColumnHelper } from "@tanstack/react-table";
import { TableCell } from "./TableCell";
import { EditCell } from "./EditCell";

const columnHelper = createColumnHelper();

export const columns = [
  // columnHelper.accessor((row, index) => {
  //   // header: "S.No",
  //   id: "S.No",
  // }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: TableCell,
    meta: {
      type: "email",
    },
  }),
  columnHelper.accessor("dateOfBooking", {
    header: "Date Of Booking",
    cell: TableCell,
    meta: {
      type: "date",
    },
  }),
  columnHelper.accessor("seatNumber", {
    header: "Seat Number",
  }),
  columnHelper.display({
    id: "edit",
    cell: EditCell,
  }),
];
