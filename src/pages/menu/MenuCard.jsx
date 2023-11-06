import React from 'react';

import { BiEditAlt } from 'react-icons/bi';

export default function MenuCard() {
  return (
    <div className="p-2 bg-white rounded-lg">
      <div className="flex gap-2">
        <img
          className="h-16 aspect-square rounded-2xl object-cover"
          src="https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/62c59f6365a259b03da440de3973f201/Derivates/668cba6648888c61d249c0a5d9651157a4ce3793.jpg"
          alt="menu_image"
        />
        <div>
          <h6 className="font-semibold text-slate-600">Choclate Blueberry</h6>
          <p className="text-xs text-slate-400">Lorem ipsum dolor sit amet consectetur adipisicing...</p>
          <p className="text-sm text-green-400">Available</p>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <div className="flex">
          <span className="text-xs">$</span>
          <span className="font-bold text-xl">10.00</span>
        </div>
        <button className="flex items-center bg-green-400 text-white rounded-lg py-1 px-2 gap-2 hover:bg-green-500">
          <BiEditAlt />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
}
