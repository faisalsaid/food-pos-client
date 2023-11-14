import React, { useEffect, useState } from 'react';

const Tooltip = ({ type, data }) => {
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    setBgColor(type === 'menu' ? 'bg-green-200' : type === 'item' ? 'bg-orange-200' : 'bg-slate-100');
  }, [type]);

  return (
    <div className={`${bgColor} py-1 px-2 rounded-xl text-xs`}>
      <span className="mr-1">{data}</span>
      <span>{type === 'menu' ? 'Menu' : 'Item'}</span>
    </div>
  );
};

export default function TotalTrancsactionCard() {
  return (
    <div className="bg-white p-4 rounded-xl border flex gap-4 items-center min-w-fit ">
      <div className="bg-sky-200 rounded-lg w-16 h-16 flex items-center justify-center text-white">
        <div className="text-2xl">2023</div>
      </div>
      <div className="flex flex-col  ">
        <p>Today</p>
        <p className="font-semibold text-lg">$434.43</p>
        <div className="flex gap-1 ">
          <Tooltip type={'menu'} data={12} />
          <Tooltip type={'item'} data={47} />
        </div>
      </div>
    </div>
  );
}
