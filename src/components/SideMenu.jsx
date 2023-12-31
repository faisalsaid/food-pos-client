import React from 'react';
import { IoFastFood } from 'react-icons/io5';
import { SIDEBAR_MENU_LIST, SIDEBAR_OPTIONS_LIST } from '../libs/MenuList';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ImExit } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { logOut, reset } from '../feature/outh/config/user.slice.js';
import { useNavigate } from 'react-router-dom';

export default function SideMenu() {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { data: toggleSideMenu } = useSelector((state) => state.layout);

  const handleLogout = () => {
    dispacth(logOut());
    dispacth(reset());
    navigate('/');
  };

  return (
    <div
      className={`${toggleSideMenu && 'hidden'}  md:flex flex-col overflow-hidden bg-white p-3  drop-shadow-sm ${toggleSideMenu ? 'w-40' : 'w-[60px]'} transition-all duration-500`}
    >
      <Link className="min-w-fit" to={'/dashboard'}>
        {toggleSideMenu ? (
          <div className="w-full ml-3 flex gap-2 items-center py-2 content-center min-w-fit h-9 ">
            <IoFastFood className="text-xl text-orange-600 min-w-fit" /> <span className="font-bold text-base text-green-700 min-w-fit">FOOD</span>
          </div>
        ) : (
          <div className=" text-center flex p-2 items-center w-13 min-w-fit h-9 bg-green-500 rounded-lg text-white ">
            <IoFastFood className="text-xl  text-center min-w-fit" />
          </div>
        )}
      </Link>
      <div className="flex-1 flex flex-col mt-3 min-w-fit gap-1 ">
        {SIDEBAR_MENU_LIST.map((item) => (
          <MenuComps key={item.key} data={item} toggle={toggleSideMenu} />
        ))}
      </div>
      <div className="mb-4 border-t pt-2 ">
        {SIDEBAR_OPTIONS_LIST.map((item) => (
          <MenuComps key={item.key} data={item} toggle={toggleSideMenu} />
        ))}
        <div className="text-slate-400">
          <button onClick={handleLogout} className="w-full h-full flex items-center datas-center gap-2 py-2 px-3 hover:bg-orange-300 hover:text-white font-semibold  rounded-md">
            {toggleSideMenu ? (
              <>
                <span>
                  <ImExit />
                </span>
                <span className="text-sm">Exit</span>
              </>
            ) : (
              <span>
                <ImExit />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const MenuComps = ({ data, toggle }) => {
  const navClass = 'flex items-center datas-center gap-2 py-2 px-3 hover:bg-orange-300 hover:text-white text-sm  rounded-md';
  return (
    <div className=" text-slate-400 overflow-hidden items-center min-w-fit">
      <NavLink className={({ isActive }) => (isActive ? `bg-orange-400 hover:bg-orange-300 text-white ` + navClass : navClass)} key={data.key} to={data.path}>
        {toggle ? <span className="text-sm">{data.icon}</span> : <span className="text-sm">{data.icon}</span>}

        {toggle && <span className="min-w-fit">{data.label}</span>}
      </NavLink>
    </div>
  );
};
