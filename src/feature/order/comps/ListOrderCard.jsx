import { RiDeleteBinLine } from 'react-icons/ri';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
// import Icons END

import React from 'react';
import { removeOrderList } from '../config/orderSlice';

export default function ListOrderCard({ orderInfo, index }) {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2 min-w-[250px] mr-2 mb-2 ">
      <img className="w-12 h-12 object-cover rounded-xl" src={orderInfo.image.url} alt="order_image" />
      <div className="flex flex-col justify-between w-full">
        <p className="text-sm">{orderInfo.title}</p>
        <div className="flex gap-2 items-center text-sm">
          <button onClick={() => dispatch(removeOrderList(index))} className="text-red-700">
            <RiDeleteBinLine />
          </button>
          <p className="flex-1 font-semibold text-sm">${orderInfo.price}</p>
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
