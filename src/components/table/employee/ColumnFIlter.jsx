import React from 'react';

export default function ColumnFIlter({ column }) {
  const { filterValue, setFilter } = column;
  return (
    <input
      placeholder="filter"
      className="text-slate-600 px-2  rounded-sm font-normal w-full outline-0  text-xs py-1 mt-1"
      type="text"
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
}
