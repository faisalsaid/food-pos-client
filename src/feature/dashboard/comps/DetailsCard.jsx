import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';

import React, { useEffect, useState } from 'react';

const Tooltip = ({ type, data }) => {
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    setBgColor(type === 'menu' ? 'bg-green-200' : type === 'item' ? 'bg-orange-200' : 'bg-slate-100');
  }, [type]);

  return (
    <div className={`${bgColor} py-1 px-2 rounded-xl text-sm`}>
      <span className="mr-1">{data}</span>
      <span>{type === 'menu' ? 'Menu' : 'Item'}</span>
    </div>
  );
};

export default function DetailsCard() {
  return (
    <div className="bg-white p-4 rounded-2xl justify-between flex gap-4 min-w-fit sm:h-32">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-end">
          <p className="font-semibold">Breakfast</p> <span className="text-sm text-slate-400">Last 7 days</span>
        </div>
        <p className="text-2xl font-semibold">$345.34</p>
        <div className="flex gap-2">
          <Tooltip type={'menu'} data={12} />
          <Tooltip type={'item'} data={47} />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <img src="/growgraphic.svg" alt="" />
        <p className="flex gap-2 items-center text-green-400">
          <span>
            <BsArrowUpShort />
          </span>
          <span>2,7%</span>
        </p>
      </div>
    </div>
  );
}
