import React, { useEffect, useState } from 'react';

const Tooltip = ({ type, data }) => {
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    setBgColor(type === 'order' ? 'bg-green-200' : type === 'item' ? 'bg-orange-200' : 'bg-slate-100');
  }, [type]);

  return (
    <div className={`${bgColor} py-1 px-2 rounded-xl text-xs`}>
      <span className="mr-1">{data}</span>
      <span>{type === 'order' ? 'Order' : 'Item'}</span>
    </div>
  );
};

export default function TotalTrancsactionCard({ data }) {
  console.log(data);
  return (
    <div className="bg-white p-4 rounded-xl border flex gap-4 items-center min-w-fit ">
      <div className="bg-sky-200 rounded-lg w-16 h-16 flex items-center justify-center text-white">
        <div className="text-2xl">{data.label}</div>
      </div>
      <div className="flex flex-col  ">
        <p>{data.title}</p>
        <p className="font-semibold text-lg">${data?.income > 0 ? data?.income.toFixed(2) : (0).toFixed(2)}</p>
        <div className="flex gap-1 ">
          <Tooltip type={'order'} data={data?.totalOrders > 0 ? data?.totalOrders : 0} />
          <Tooltip type={'item'} data={data?.totalItems > 0 ? data?.totalItems : 0} />
        </div>
      </div>
    </div>
  );
}
