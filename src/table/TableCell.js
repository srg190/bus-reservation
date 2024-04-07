import { useState, useEffect } from "react";
import "../table.css";

export const TableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value);
  };

  const onSelectChange = (e) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };

  const handleOnchange = (e) => {
    if (columnMeta?.type === "email") {
      const newVal = e.target.value;
      const regex = /^[^\s@]+@[^\s@]+\.(?:com|org)$/i;
      if (!regex.test(newVal)) {
        setError(true);
      } else {
        setError(false);
      }
    }
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
          onBlur={onBlur}
          type={columnMeta?.type || "text"}
          min={minDate}
        />
        {error && <p className="!text-error text-xs">*Please enter a valid email</p>}
      </>
    );
  }
  return <span>{value}</span>;
};
