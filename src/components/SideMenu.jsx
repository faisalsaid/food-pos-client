import React from 'react';
import { IoFastFood } from 'react-icons/io5';
import { SIDEBAR_MENU_LIST, SIDEBAR_OPTIONS_LIST } from '../libs/MenuList';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function SideMenu() {
  const { data: toggleSideMenu } = useSelector((state) => state.layout);

  return (
    <div className={`flex flex-col bg-white p-3  drop-shadow-sm ${toggleSideMenu ? 'w-48' : 'w-[70px]'} transition-all duration-500`}>
      <Link to={'/dashboard'}>
        {toggleSideMenu ? (
          <div className="w-full flex gap-2 items-center py-2 content-center ">
            <IoFastFood className="text-2xl text-orange-600" /> <span className="font-bold text-2xl text-green-700">FOOD POS</span>
          </div>
        ) : (
          <div className=" text-center flex p-2 items-center w-13 ">
            <IoFastFood className="text-4xl text-orange-600 text-center" />
          </div>
        )}
      </Link>
      <div className="flex-1 mt-3">
        {SIDEBAR_MENU_LIST.map((item) => (
          <MenuComps key={item.key} data={item} toggle={toggleSideMenu} />
        ))}
      </div>
      <div className="mb-4 border-t-2 ">
        {SIDEBAR_OPTIONS_LIST.map((item) => (
          <MenuComps key={item.key} data={item} toggle={toggleSideMenu} />
        ))}
      </div>
    </div>
  );
}

const MenuComps = ({ data, toggle }) => {
  const navClass = 'flex items-center datas-center gap-2 py-3 px-3 hover:bg-orange-300 hover:text-white font-semibold mt-3 rounded-md';
  return (
    <div>
      <NavLink className={({ isActive }) => (isActive ? `bg-orange-400 hover:bg-orange-300 text-white ` + navClass : navClass)} key={data.key} to={data.path}>
        {toggle ? <span>{data.icon}</span> : <span className="text-2xl">{data.icon}</span>}

        {toggle && <span>{data.label}</span>}
      </NavLink>
    </div>
  );
};
