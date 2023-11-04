import React from 'react';
import { BiPlus, BiMinus, BiAddToQueue } from 'react-icons/bi';

export default function MenuCard() {
  return (
    <div className=" bg-white p-3 rounded-lg">
      <div className="flex gap-2">
        <img
          className="w-24 h-24 object-cover rounded-xl"
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
}
