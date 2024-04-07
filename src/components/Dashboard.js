import { useEffect, useState } from "react";
import "../table.css";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "../table/Columns";
import { useAppSelector } from "../redux/store";

export const Dashboard = () => {
  const { users: bookingData } = useAppSelector((state) => state.user);
  // const bookingData = useSelector((state) => state.user.users);
  const dashboard = Object.entries(bookingData).flatMap(
    ([dateOfBooking, seats]) => {
      return Object.entries(seats).map(([seatNumber, data]) => {
        return {
          dateOfBooking,
          seatNumber,
          ...data,
        };
      });
    }
  );
  const [data, setData] = useState(() => [...dashboard]);
  const [originalData, setOriginalData] = useState(() => [...dashboard]);
  const [editedRows, setEditedRows] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  useEffect(() => {
    setData(dashboard);
  }, [bookingData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex, revert) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  return (
    <>
      <article className="table-container">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* <pre>{JSON.stringify(data, null, "\t")}</pre> */}
      </article>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>
    </>
  );
};

export default Dashboard;
