import React from 'react';

// import icons
import { CiSearch, CiPizza, CiBowlNoodles } from 'react-icons/ci';
import { IoNotifications, IoIceCreamOutline } from 'react-icons/io5';
import { CgMenuGridO } from 'react-icons/cg';
import { PiHamburger, PiCoffee } from 'react-icons/pi';
import { BiBowlRice } from 'react-icons/bi';
import { MdOutlineLocalDrink } from 'react-icons/md';
import { BiPlus, BiMinus, BiAddToQueue } from 'react-icons/bi';

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
      } flex items-center gap-1 hover:text-slate-500 rounded-md py-1 px-2 text-xs hover:bg-orange-100 text-slate-500 min-w-fit`}
    >
      <span>{tag.icon}</span> <span>{tag.label}</span>
    </div>
  );
};

const MenuCard = () => {
  return (
    <div className="max-w-[300px] bg-white p-3 rounded-lg">
      <div className="flex gap-2">
        <img
          className="w-24 h-24 object-cover rounded-md"
          src="https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/62c59f6365a259b03da440de3973f201/Derivates/668cba6648888c61d249c0a5d9651157a4ce3793.jpg"
          alt=""
        />
        <div className="flex flex-col gap-1">
          <h5 className="text-lg font-semibold text-slate-700">Pizza Sweet Corn</h5>
          <p className="flex-1 text-xs text-slate-400">Lorem ipsum dolor sit amet, consectetur...</p>
          <p className="text-sm text-teal-500">Available</p>
        </div>
      </div>
      <div className="flex items-center mt-2 gap-3">
        <p className="flex-1 font-semibold text-lg">$ 80.00</p>
        <div className="flex items-center gap-2">
          <span className="bg-orange-500 w-6 h-6 flex items-center justify-center rounded-lg text-white hover:bg-orange-600 cursor-pointer">
            <BiMinus />
          </span>
          <span>0</span>
          <span className="bg-orange-500 w-6 h-6 flex items-center justify-center rounded-lg text-white hover:bg-orange-600 cursor-pointer">
            <BiPlus />
          </span>
        </div>
        <button className="flex items-center bg-green-600 text-white py-1 px-2 gap-2 rounded-lg hover:bg-green-700 ">
          <BiAddToQueue />
          <span>Add</span>
        </button>
      </div>
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
        <div className="flex gap-3 flex-wrap">
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
        </div>
      </div>
      <div className="max-w-fit bg-white p-4  ">List Order</div>
    </div>
  );
}
