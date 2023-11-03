import React from 'react';

// import icons
import { CiSearch, CiPizza, CiBowlNoodles } from 'react-icons/ci';
import { IoNotifications, IoIceCreamOutline } from 'react-icons/io5';
import { CgMenuGridO } from 'react-icons/cg';
import { PiHamburger, PiCoffee } from 'react-icons/pi';
import { BiBowlRice } from 'react-icons/bi';
import { MdOutlineLocalDrink } from 'react-icons/md';

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

const TagMenu = ({ tag, tagActive }) => {
  return (
    <div
      className={`${
        tag.value === tagActive ? 'bg-orange-300 text-white' : 'bg-white'
      } flex items-center gap-1 hover:text-slate-500 rounded-md py-1 px-2 hover:bg-orange-100 text-slate-500`}
    >
      <span>{tag.icon}</span> <span>{tag.label}</span>
    </div>
  );
};

const tagActive = 'all';

export default function Order() {
  return (
    <div className=" flex gap-6 ">
      <div className="flex-1 p-6">
        <div className=" flex justify-between">
          <div className="">
            <h3 className="text-2xl font-semibold text-slate-700">Welcome, Natasha Nauljam</h3>
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
            <div className="flex justify-center items-center bg-orange-400 w-10 h-10 rounded-lg text-white text-2xl">
              <IoNotifications />
            </div>
          </div>
        </div>
        <div className="my-4 flex gap-3">
          {listTag.map((list, i) => (
            <TagMenu key={i} tag={list} tagActive={tagActive} />
          ))}
        </div>
        <div>List Menu</div>
      </div>
      <div className="max-w-fit bg-white p-4 ">List Order</div>
    </div>
  );
}
