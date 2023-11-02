import React from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters, useAsyncDebounce } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './empoyeeColumns.js';
import ColumnFIlter from './ColumnFIlter';

// import icons
import { AiFillCaretDown, AiFillCaretUp, AiFillCaretRight } from 'react-icons/ai';

const GlobalFilterInput = ({ filter, setFilter }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-600">Search</span>
      <input className="text-slate-600 px-2 border rounded-md outline-slate-50 text-sm py-1" type="text" value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};

// export const ColumFilter = ({ column }) => {
//   const { filterValue, setFilter } = column;
//   return <input className="text-slate-600 px-2  rounded-md  text-sm py-1" type="text" value={filter || ''} onChange={(e) => setFilter(e.target.value)} />;
// };

export default function TableEmployee() {
  const data = React.useMemo(() => MOCK_DATA, []);
  const columns = React.useMemo(() => COLUMNS, []);
  const defaultColumn = React.useMemo(() => {
    return {
      Filter: ColumnFIlter,
    };
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
  );

  const { globalFilter } = state;

  return (
    <>
      <div className="flex justify-between mb-2">
        <p className="text-slate-600">Employees performance</p>
        <GlobalFilterInput filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table className="bg-slate-100 w-full table-auto text-xs  " {...getTableProps()}>
        <thead className="bg-orange-400  ">
          {headerGroups.map((headerGroup) => (
            <tr className="  overflow-hidden " {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="first:rounded-tl-md last:rounded-tr-md py-3 px-2 font-semibold text-white " {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="flex items-center gap-2">
                    <span>{column.render('Header')}</span>
                    <span>{column.isSorted ? column.isSortedDesc ? <AiFillCaretUp /> : <AiFillCaretDown /> : <AiFillCaretRight />}</span>
                  </div>
                  <div>{column.canFilter && column.render('Filter')}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr className="bg-white border-l border-r hover:bg-orange-100 hover:border-b-2 hover:border-b-orange-400 transition-all duration-300" {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td className="py-2 px-2" {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
