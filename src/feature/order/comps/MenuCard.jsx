import React, { useEffect, useState } from 'react';
import { BiPlus, BiMinus, BiAddToQueue } from 'react-icons/bi';
import { addOrderList } from '../config/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { printOption } from '../../../config/helper';
import { listTag } from '../../menu/comps/Menu';

export default function MenuCard({ menuInfo }) {
  const { createdAt, updatedAt, __v, ...payload } = menuInfo; // desctruction menuInfo to get order payload

  const { listOrder } = useSelector((state) => state.order);
  const [listOrderId, setListOrderId] = useState([]);

  useEffect(() => {
    setListOrderId(listOrder.map((data) => data.item._id));
  }, [listOrder]);

  const dispatch = useDispatch();
  return (
    <div className=" bg-white p-3 rounded-lg">
      <div className="flex gap-2">
        <img className="w-24 h-24 object-cover rounded-xl" src={menuInfo.image.url} alt="" />
        <div className="flex flex-col gap-1">
          <h5 className="text-lg font-semibold text-slate-700">{menuInfo.title}</h5>
          <p className="flex-1 text-xs text-slate-400">{menuInfo.description}</p>
          <p className="text-sm text-teal-500">{printOption(menuInfo.category, listTag)}</p>
        </div>
      </div>
      <div className="flex items-center mt-2 gap-3">
        <p className="flex-1 font-semibold text-lg">${menuInfo.price.toFixed(2)}</p>
        {/* <div className="flex items-center gap-2">
          <span className="bg-orange-500 w-6 h-6 flex items-center justify-center rounded-lg text-white hover:bg-orange-600 cursor-pointer">
            <BiMinus />
          </span>
          <span>1</span>
          <span className="bg-orange-500 w-6 h-6 flex items-center justify-center rounded-lg text-white hover:bg-orange-600 cursor-pointer">
            <BiPlus />
          </span>
        </div> */}
        <button
          disabled={listOrderId.includes(menuInfo._id)}
          onClick={() => dispatch(addOrderList(payload))}
          className="flex items-center bg-green-600 text-white py-1 px-2 gap-2 rounded-lg hover:bg-green-700 disabled:bg-slate-100 disabled:text-slate-400 "
        >
          <BiAddToQueue />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}
