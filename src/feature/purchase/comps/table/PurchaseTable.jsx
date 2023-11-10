import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters, useAsyncDebounce, usePagination } from 'react-table';
import { faker } from '@faker-js/faker';

// Import Icons
import { BiTrash, BiFile, BiEdit } from 'react-icons/bi';
import PurchaseModal from '../PurchaseModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPurchase } from '../../config/purchaseSlice';

faker.seed(123);
const purchaseDataFramework = () => {
  return {
    _id: faker.string.uuid(),
    order: faker.string.alphanumeric(5),
    customer_name: faker.person.fullName(),
    table: faker.number.int({ min: 1, max: 15 }),
    items: faker.number.int({ min: 10, max: 29 }),
    price: faker.number.float({ min: 1, max: 999, precision: 0.01 }),
    sales_name: faker.person.fullName(),
  };
};

const employeeData = faker.helpers.multiple(purchaseDataFramework, { count: 83 });

const ActionComp = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [dataContent, setDataContent] = React.useState({});

  const handleDetails = (data) => {
    setDataContent(data);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="flex justify-center items-center gap-2">
        <button className="p-1 bg-red-300 hover:bg-red-400 rounded-lg text-white">
          <BiTrash />
        </button>
        <button className="p-1 bg-sky-300 hover:bg-sky-400 rounded-lg text-white" onClick={() => handleDetails(data.original)}>
          <BiFile />
        </button>
        <button className="p-1 bg-green-300 hover:bg-green-400 rounded-lg text-white">
          <BiEdit />
        </button>
      </div>
      <PurchaseModal isOpen={isModalOpen} closeModel={closeModal} content={dataContent} />
    </>
  );
};

const tableColumns = [
  {
    Header: 'Order',
    accessor: 'orderRef',
  },
  {
    Header: 'Customer',
    accessor: 'customerName',
  },
  {
    Header: 'Table',
    accessor: 'table',
    Cell: ({ cell: { value } }) => <p> {value}</p>,
  },
  {
    Header: 'Total Item',
    accessor: 'listOrder',
    Cell: ({ cell: { value } }) => <p> {value.length > 0 ? value.map((item) => item.quantity).reduce((total, item) => total + item) : 0}</p>,
  },
  {
    Header: 'Price',
    accessor: 'finalPrice',
    Cell: ({ cell: { value } }) => <p className="text-right">${parseFloat(value.toFixed(2))}</p>,
  },
  {
    Header: 'Payment Method',
    accessor: 'paymentMethod',
  },
  {
    Header: 'Action',
    accessor: 'action',
    Cell: ({ row }) => <ActionComp data={row} />,
  },
];

export default function PurchaseTable() {
  const dispatch = useDispatch();
  const allOrder = useSelector((state) => state.purchase.listPurchase);
  const [data, setData] = useState([]);
  const columns = useMemo(() => tableColumns, []);

  console.log(data);

  useEffect(() => {
    dispatch(getAllPurchase());
  }, []);

  useEffect(() => {
    setData(allOrder);
  }, [allOrder]);

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, state, setGlobalFilter } = useTable(
    { columns, data },
    usePagination,
  );

  const { globalFilter, pageIndex } = state;
  return (
    <div>
      <div>serach filter bar</div>
      <div>
        <table className="table-auto w-full" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  <th key={i} className="bg-green-200 font-normal p-2 first:rounded-tl-xl last:rounded-tr-xl" {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr className="bg-white hover:bg-green-50 hover:border-b-green-400 border-b" key={i} {...row.getRowProps()}>
                  {row.cells.map((cell, i) => (
                    <td key={i} className="text-slate-500 p-2 " {...cell.getCellProps}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="p-2 rounded-b-lg bg-slate-100 flex justify-between">
          <button
            className="bg-green-300 hover:bg-green-400 py-2 text-xs rounded-md px-2 text-white disabled:bg-slate-100 disabled:text-slate-400 disabled:border"
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
          <button
            className="bg-green-300 hover:bg-green-400 py-2 text-xs rounded-md px-2 text-white disabled:bg-slate-100 disabled:text-slate-400 disabled:border"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
