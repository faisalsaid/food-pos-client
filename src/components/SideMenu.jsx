import React from 'react';
import { IoFastFood } from 'react-icons/io5';
import { SIDEBAR_MENU_LIST, SIDEBAR_OPTIONS_LIST } from '../libs/MenuList';
import { Link } from 'react-router-dom';

export default function SideMenu() {
  return (
    <div className="flex flex-col bg-white p-3 w-48 drop-shadow-sm">
      <div className="w-full flex gap-2 items-center py-2 content-center">
        <IoFastFood className="text-2xl text-orange-600" /> <span className="font-bold text-2xl text-green-700"> FOOD POS</span>
      </div>
      <div className="flex-1">
        {SIDEBAR_MENU_LIST.map((item) => (
          <MenuComps key={item.key} data={item} />
        ))}
      </div>
      <div className="mb-4 border-t-2 ">
        {SIDEBAR_OPTIONS_LIST.map((item) => (
          <MenuComps key={item.key} data={item} />
        ))}
      </div>
    </div>
  );
}

const MenuComps = ({ data }) => {
  return (
    <Link key={data.key} to={data.path}>
      <div className="flex items-center datas-center gap-2 py-1 px-2 hover:bg-orange-300 hover:text-white font-semibold mt-3 rounded-md ">
        {data.icon}
        <span>{data.label}</span>
      </div>
    </Link>
  );
};
