import { IoFastFoodOutline } from 'react-icons/io5';
import { RiCoupon3Line } from 'react-icons/ri';
import { BiUser, BiDollarCircle, BiCalendar } from 'react-icons/bi';
// Import Icons END

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { getAllPurchase } from '../../purchase/config/purchaseSlice';
import TableRowHead from '../../../components/share/TableRowHead';
import { useNavigate } from 'react-router-dom';

// Table Header
const tableColumns = [
  {
    Header: () => <TableRowHead />,
    accessor: 'rowHead',
    Cell: ({ cell: { value } }) => <TableRowHead />,
  },
  {
    Header: () => (
      <div className="flex gap-1 items-center">
        <span>
          <RiCoupon3Line />
        </span>
        <span>Order</span>
      </div>
    ),
    accessor: 'orderRef',
  },
  {
    Header: () => (
      <div className="flex gap-1 items-center">
        <span>
          <BiUser />
        </span>
        <span>Customer</span>
      </div>
    ),
    accessor: 'customerName',
  },
  {
    Header: () => (
      <div className="flex gap-1 items-center">
        <span>
          <IoFastFoodOutline />
        </span>
        <span>Item</span>
      </div>
    ),
    accessor: 'listOrder',
    Cell: ({ cell: { value } }) => <> {value.length > 0 ? value.map((item) => item.quantity).reduce((total, item) => total + item) : 0}</>,
  },
  {
    // price
    Header: () => (
      <div className="flex gap-1 items-center">
        <span>
          <BiDollarCircle />
        </span>
        <span>Price</span>
      </div>
    ),
    accessor: 'finalPrice',
    Cell: ({ cell: { value } }) => <p className="text-right">${value.toFixed(2)}</p>,
  },
  {
    // date
    Header: () => (
      <div className="flex gap-1 items-center min-w-[130px] ">
        <span>
          <BiCalendar />
        </span>
        <span>Date</span>
      </div>
    ),

    accessor: 'createdAt',
    Cell: ({ cell: { value } }) => new Date(value).toDateString(),
  },
];

const LastOrderTables = () => {
  const navigate = useNavigate();
  const { listPurchase } = useSelector((state) => state.purchase);
  const dispatch = useDispatch();
  const columns = useMemo(() => tableColumns, []);
  const [data, setData] = useState([]);

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } = useTable({ columns, data });

  useEffect(() => {
    dispatch(getAllPurchase());
  }, []);

  useEffect(() => {
    setData(listPurchase.slice(0, 6));
  }, [listPurchase]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-between items-center">
        <p className="font-semibold">Last Order:</p>
        <button onClick={() => navigate('/purchase')} className="bg-green-400 py-1 px-2 rounded-lg hover:bg-green-500 text-green-800">
          See All
        </button>
      </div>
      <div className="overflow-x-scroll">
        <table {...getTableProps()} className=" table-auto w-full">
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  <th key={i} {...column.getHeaderProps()} className="bg-green-600  text-white font-semibold p-2 first:rounded-tl-xl last:rounded-tr-xl text-left">
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i} {...row.getRowProps()} className="bg-white hover:bg-green-50 hover:border-b-green-400 border-b text-left min-w-fit">
                  {row.cells.map((cell, i) => (
                    <td key={i} {...cell.getCellProps} className="text-slate-500 p-2 min-w-fit">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LastOrderTables;
