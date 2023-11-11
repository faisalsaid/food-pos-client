import React from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters, useAsyncDebounce, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './empoyeeColumns.js';
import ColumnFIlter from './ColumnFIlter';
import { faker } from '@faker-js/faker';

// import icons
import { AiFillCaretDown, AiFillCaretUp, AiFillCaretRight } from 'react-icons/ai';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const GlobalFilterInput = ({ filter, setFilter }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-600">Search</span>
      <input className="text-slate-600 px-2 border rounded-md outline-slate-50 text-sm py-1" type="text" value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};

const employeeDataFramework = () => {
  return {
    _id: faker.string.uuid(),
    employee: {
      avatar: faker.image.avatar(),
      full_name: faker.person.fullName(),
    },
    email: faker.internet.email(),
    work: {
      isGrow: faker.datatype.boolean(),
      hour: faker.number.int({ min: 40, max: 999 }),
      percn: faker.number.float({ min: 0, max: 15, precision: 0.1 }),
    },
    sale: {
      isGrow: faker.datatype.boolean(),
      item: faker.number.int({ min: 99, max: 9999 }),
      percn: faker.number.float({ min: 0, max: 15, precision: 0.1 }),
    },
  };
};

const employeeData = faker.helpers.multiple(employeeDataFramework, { count: 14 });

const EmployeComponent = ({ employee }) => {
  return (
    <div className="flex items-center gap-2">
      <img className="w-10 h-10 rounded-full" src={employee.avatar} alt="employee_avatar" /> <p>{employee.full_name}</p>
    </div>
  );
};

const WorkComps = ({ data }) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`flex items-center text-sm px-2 rounded-md ${data.isGrow ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {data.isGrow ? <FiArrowUp /> : <FiArrowDown />}
        {data.percn}%
      </span>
      <span>{data.hour}</span>
    </div>
  );
};
const SaleComps = ({ data }) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`flex items-center text-sm px-2 rounded-md ${data.isGrow ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {data.isGrow ? <FiArrowUp /> : <FiArrowDown />}
        {data.percn}%
      </span>
      {data.item}
    </div>
  );
};

const employeeColumns = [
  {
    Header: 'Employee',
    accessor: 'employee',
    Cell: ({ cell: { value } }) => <EmployeComponent employee={value} />,
    disableFilters: true,
  },
  {
    Header: 'Email',
    accessor: 'email',
    disableFilters: true,
  },
  {
    Header: 'Work Hour',
    accessor: 'work',
    Cell: ({ cell: { value } }) => <WorkComps data={value} />,
    disableFilters: true,
  },
  {
    Header: 'Sale Item',
    accessor: 'sale',
    Cell: ({ cell: { value } }) => <SaleComps data={value} />,
    disableFilters: true,
  },
];

export default function TableEmployee() {
  // const data = React.useMemo(() => MOCK_DATA, []);
  // const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => employeeData, []);
  const columns = React.useMemo(() => employeeColumns, []);
  const defaultColumn = React.useMemo(() => {
    return {
      Filter: ColumnFIlter,
    };
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, page, nextPage, previousPage, canNextPage, canPreviousPage, prepareRow, pageOptions, state, setGlobalFilter } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
        initialState: {
          pageSize: 5,
        },
      },
      useFilters,
      useGlobalFilter,
      useSortBy,
      usePagination,
    );

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <div className="flex justify-between mb-2">
        <p className="text-slate-600">Employees performance</p>
        <GlobalFilterInput filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table className=" w-full table-auto   " {...getTableProps()}>
        <thead className="bg-orange-200  ">
          {headerGroups.map((headerGroup) => (
            <tr className="  overflow-hidden " {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // <th className="first:rounded-tl-xl last:rounded-tr-xl py-3 px-2 font-semibold text-white " {...column.getHeaderProps(column.getSortByToggleProps())}>
                <th className="first:rounded-tl-xl last:rounded-tr-xl py-3 px-2 font-semibold text-slate-400 " {...column.getHeaderProps()}>
                  <div className="flex items-center gap-2">
                    <span>{column.render('Header')}</span>
                    {/* <span>{column.isSorted ? column.isSortedDesc ? <AiFillCaretUp /> : <AiFillCaretDown /> : <AiFillCaretRight />}</span> */}
                  </div>
                  <div>{column.canFilter && column.render('Filter')}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-slate-100" {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr className="bg-white border-l border-r hover:bg-teal-50 hover:border-b-2 hover:border-b-teal-400 transition-all duration-300" {...row.getRowProps()}>
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
      <div className="p-2 border flex justify-between">
        <button
          className="bg-orange-500 py-2 text-xs rounded-md px-2 text-white disabled:bg-slate-100 disabled:text-slate-400"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Prev
        </button>
        <div>
          <p>
            Page {pageIndex + 1} of {pageOptions.length}
          </p>
        </div>
        <button className="bg-orange-500 py-2 text-xs rounded-md px-2 text-white disabled:bg-slate-100 disabled:text-slate-400" onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </>
  );
}
