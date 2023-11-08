import React from 'react';

// import Icons
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiPlus, BiMinus } from 'react-icons/bi';

export default function ListOrderCard({ orderInfo }) {
  console.log(orderInfo);
  return (
    <div className="flex gap-2 min-w-[250px] mr-2 mb-2 ">
      <img
        className="w-12 h-12 object-cover rounded-xl"
        src="https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/62c59f6365a259b03da440de3973f201/Derivates/668cba6648888c61d249c0a5d9651157a4ce3793.jpg"
        alt="order_image"
      />
      <div className="flex flex-col justify-between w-full">
        <p className="text-sm">{orderInfo.title}</p>
        <div className="flex gap-2 items-center text-sm">
          <button className="text-red-700">
            <RiDeleteBinLine />
          </button>
          <p className="flex-1 font-semibold text-sm">{orderInfo.price}</p>
          <div className="flex items-center gap-2">
            <button className="  bg-orange-400 hover:bg-orange-500 flex justify-center content-center text-white p-[2px] rounded-lg">
              <BiMinus />
            </button>
            <span>1</span>
            <button className="  bg-orange-400 hover:bg-orange-500 flex justify-center content-center text-white p-[2px] rounded-lg">
              <BiPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
