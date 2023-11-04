import React from 'react';

import OrderSidebar from './OrderSidebar';
import MenusComp from './MenusComp';

// import icons
import { CiSearch, CiPizza, CiBowlNoodles } from 'react-icons/ci';
import { IoNotifications, IoIceCreamOutline } from 'react-icons/io5';
import { CgMenuGridO } from 'react-icons/cg';
import { PiHamburger, PiCoffee } from 'react-icons/pi';
import { BiBowlRice } from 'react-icons/bi';
import { AiOutlineCloseCircle, AiOutlineClose } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdOutlineLocalDrink } from 'react-icons/md';
import { BiPlus, BiMinus, BiReset, BiEdit, BiUser, BiEditAlt } from 'react-icons/bi';

export default function Order() {
  return (
    <div className=" flex items-stretch  max-h-screen relative ">
      <MenusComp />
      <OrderSidebar />
    </div>
  );
}
