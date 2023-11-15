import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';

import React, { useEffect, useState } from 'react';

const Tooltip = ({ type, data }) => {
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    setBgColor(type === 'order' ? 'bg-green-200' : type === 'item' ? 'bg-orange-200' : 'bg-slate-100');
  }, [type]);

  return (
    <div className={`${bgColor}  px-1 rounded-xl text-xs`}>
      <span className="mr-1">{data}</span>
      <span>{type === 'order' ? 'Order' : 'Item'}</span>
    </div>
  );
};

export default function DetailsCard({ data }) {
  // console.log(data);
  return (
    <div className="bg-white p-3 rounded-2xl justify-between flex gap-2 min-w-fit ">
      <div className="flex flex-col justify-between ">
        <div className="flex gap-2 items-end">
          <p className="font-semibold">{data.label}</p> <span className="text-xs text-slate-400">Last 7 days</span>
        </div>
        <p className="text-xl font-semibold">${data.income.toFixed(2)}</p>
        <div className="flex gap-2">
          <Tooltip type={'order'} data={data.totalOrders} />
          <Tooltip type={'item'} data={data.totalItems} />
        </div>
      </div>
      <div className="flex flex-col justify-end w-10 ">
        <img src="/growgraphic.svg" alt="" />
        <p className="  flex  justify-center text-green-400">
          <span className="w-full">
            <BsArrowUpShort />
          </span>
          <span className="text-xs">2,7%</span>
        </p>
      </div>
    </div>
  );
}
