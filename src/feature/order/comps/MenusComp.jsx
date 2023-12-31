import { CiSearch, CiPizza, CiBowlNoodles } from 'react-icons/ci';
import { IoNotifications, IoIceCreamOutline } from 'react-icons/io5';
import { CgMenuGridO } from 'react-icons/cg';
import { PiHamburger, PiCoffee } from 'react-icons/pi';
import { BiBowlRice } from 'react-icons/bi';
import { MdOutlineLocalDrink } from 'react-icons/md';
// impror icons end

import { useEffect, useState } from 'react';
import TagMenu from '../../../components/share/TagMenu';
import MenuCard from './MenuCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMenu } from '../../menu/config/menuSlice';
const listTag = [
  {
    label: 'All Menu',
    value: 'all',
    icon: <CgMenuGridO />,
  },
  {
    label: 'Pizza',
    value: 'pizza',
    icon: <CiPizza />,
  },
  {
    label: 'Burger',
    value: 'burger',
    icon: <PiHamburger />,
  },
  {
    label: 'Rice',
    value: 'rice',
    icon: <BiBowlRice />,
  },
  {
    label: 'Noodle',
    value: 'noodle',
    icon: <CiBowlNoodles />,
  },
  {
    label: 'Coffee',
    value: 'coffee',
    icon: <PiCoffee />,
  },
  {
    label: 'Drink',
    value: 'drink',
    icon: <MdOutlineLocalDrink />,
  },
  {
    label: 'Ice Cream',
    value: 'ice_cream',
    icon: <IoIceCreamOutline />,
  },
];

export default function MenusComp() {
  const dispatch = useDispatch();

  const [tagActive, setTagActive] = useState('all');
  const { curentUser } = useSelector((state) => state.user);
  const { listMenu } = useSelector((state) => state.menu);
  const [menuDisplay, setMenuDisplay] = useState(listMenu);

  // fetch all menu from menu state
  useEffect(() => {
    dispatch(fetchAllMenu());
  }, []);

  // populate menu for diplay from list menu
  useEffect(() => {
    setMenuDisplay(listMenu);
  }, [listMenu]);

  // Filter display menu by category
  const filterDisplay = (category) => {
    setTagActive(category);
    if (category === 'all') {
      setMenuDisplay(listMenu);
    } else {
      const data = listMenu.filter((menu) => menu.category === category);
      setMenuDisplay(data);
    }
  };

  return (
    <div className="flex-1 p-3 sm:p-6 h-[80%] md:h-full overflow-y-scroll">
      <div className=" flex flex-col lg:flex-row gap-2 justify-between">
        <div className="">
          <h3 className="text-2xl font-semibold text-slate-700">Welcome, {curentUser.name} </h3>
          <p className="text-sm text-slate-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white px-2 py-2 h-10 rounded-md border">
              <CiSearch />
              <input className="bg-transparent text-base outline-none" type="text" placeholder="Find some menu" />
            </div>
            <button className="bg-orange-400 hover:bg-orange-500 py-2 px-3 rounded-lg text-white">Search</button>
          </div>
          {/* <div className="flex justify-center items-center bg-orange-400 w-10 h-10 rounded-lg text-white text-2xl">
            <IoNotifications />
          </div> */}
        </div>
      </div>
      <div className="my-4 overflow-x-scroll pb-1 flex gap-3">
        {listTag.map((list, i) => (
          <TagMenu key={i} tag={list} tagActive={tagActive} setTag={filterDisplay} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-3 ">
        {menuDisplay.map((menu, i) => (
          <MenuCard key={i} menuInfo={menu} />
        ))}
      </div>
    </div>
  );
}
