import { RiDeleteBinLine } from 'react-icons/ri';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
// import Icons END

import React from 'react';
import { removeOrderList, addQuantity, bateQuantity } from '../config/orderSlice';

export default function ListOrderCard({ orderInfo, index }) {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2 min-w-[250px] mr-2 mb-2 ">
      <img className="w-12 h-12 object-cover rounded-xl" src={orderInfo.item.image.url} alt="order_image" />
      <div className="flex flex-col justify-between w-full">
        <p className="text-sm">{orderInfo.item.title}</p>
        <div className="flex gap-3 items-center text-sm">
          <button onClick={() => dispatch(removeOrderList(index))} className="text-red-700">
            <RiDeleteBinLine />
          </button>
          <p className="w-7 font-semibold text-sm">${orderInfo.item.price}</p>
          <div className="flex items-center gap-2">
            <button className="  bg-orange-400 hover:bg-orange-500 flex justify-center content-center text-white p-[2px] rounded-lg">
              <BiMinus onClick={() => dispatch(bateQuantity(index))} />
            </button>
            <span>{orderInfo.quantity}</span>
            <button className=" bg-orange-400 hover:bg-orange-500 flex justify-center content-center text-white p-[2px] rounded-lg">
              <BiPlus onClick={() => dispatch(addQuantity(index))} />
            </button>
          </div>
          <p className="flex-1 text-right text-lg font-semibold">${orderInfo.orderPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
