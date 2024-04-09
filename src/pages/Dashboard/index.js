import { useEffect, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "../../components/table/Columns";
import { useAppSelector } from "../../redux/store";

export const Dashboard = () => {
  const { users: bookingData, currentPage } = useAppSelector(
    (state) => state.booking
  );
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
    pageSize: 5,
  });

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
          return;
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
  const gotoPage = (pageIndex) => {
    table.setPagination({ pageIndex, pageSize: pagination.pageSize });
  };
  useEffect(() => {
    table.setPagination({ pageIndex: currentPage, pageSize: 5 });
    setData(dashboard);
  }, [bookingData]);
  console.log(pagination, "pagination");

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
      <div className="flex justify-center">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="py-0 px-2"
        >
          {"<"}
        </button>
        {Array.from({ length: table.getPageCount() }, (_, i) => {
          return (
            <button key={i} onClick={() => gotoPage(i)} className="py-0 px-2">
              {i + 1}
            </button>
          );
        })}
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
      </div>
      <div className="flex justify-evenly">
        <div>{`Page ${
          pagination.pageIndex + 1
        } of ${table.getPageCount()}`}</div>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Dashboard;
