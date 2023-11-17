import React, { useEffect, useMemo, useState } from 'react';
import TagMenu from '../../../components/share/TagMenu';
import MenuCard from './MenuCard';
import AddMenuModal from './AddMenuModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMenu } from '../config/menuSlice';

// imports icons
import { BiSearch, BiAddToQueue } from 'react-icons/bi';
import { CiPizza, CiBowlNoodles } from 'react-icons/ci';
import { IoIceCreamOutline } from 'react-icons/io5';
import { CgMenuGridO } from 'react-icons/cg';
import { PiHamburger, PiCoffee } from 'react-icons/pi';
import { BiBowlRice } from 'react-icons/bi';
import { MdOutlineLocalDrink } from 'react-icons/md';

export const listTag = [
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

export default function Menu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tagActive, setTagActive] = useState('all');
  const { listMenu, isError, isLoading, message } = useSelector((state) => state.menu);
  const [menuDisplay, setMenuDisplay] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('fetch all menu');
    dispatch(fetchAllMenu());
  }, []);

  useEffect(() => {
    setMenuDisplay(listMenu);
  }, [listMenu]);

  const filterDisplay = (category) => {
    setTagActive(category);
    if (category === 'all') {
      setMenuDisplay(listMenu);
    } else {
      const data = listMenu.filter((menu) => menu.category === category);
      setMenuDisplay(data);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddMenu = () => {
    openModal();
  };

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 ">
          <h5 className="font-semibold text-xl flex-1">Menu</h5>
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 bg-white border rounded-lg px-2 py-1">
              <BiSearch className="text-slate-400" />
              <input className=" w-full outline-none bg-transparent  " type="text" placeholder="Search menu..." />
            </div>
            <button className=" hidden sm:block bg-orange-400 text-white py-1 px-2 rounded-lg hover:bg-orange-500 text-base">Search</button>
          </div>
          <button onClick={handleAddMenu} className="flex items-center justify-center gap-2 bg-orange-400 rounded-lg py-1 px-2 text-white hover:bg-orange-500">
            <BiAddToQueue /> <span>Add new menu</span>
          </button>
        </div>
        <div className="my-4 flex gap-3 overflow-x-scroll pb-2">
          {listTag.map((list, i) => (
            <TagMenu key={i} tag={list} tagActive={tagActive} setTag={filterDisplay} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {menuDisplay.length === 0 ? <p>Menu Empty...</p> : menuDisplay.map((data, i) => <MenuCard menuInfo={data} key={i} />)}
        </div>
      </div>
      <AddMenuModal isOpen={isModalOpen} closeModel={closeModal} content={'This content'} />
    </>
  );
}
