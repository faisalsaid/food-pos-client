import { BiReset, BiEdit, BiUser, BiEditAlt } from 'react-icons/bi';
import { MdOutlineTableBar } from 'react-icons/md';
// Import icons

import React from 'react';
import ListOrderCard from './ListOrderCard';
import PaymentModal from './PaymentModal';
import { useSelector } from 'react-redux';

export default function OrderSidebar() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { listOrder } = useSelector((state) => state.order);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="max-w-fit bg-white  p-4 flex items-stretch flex-col gap-4 sticky ">
      <div className="flex items-center gap-2 text-sm">
        <button className="flex-1 flex items-center gap-2 justify-center bg-red-500 hover:bg-red-600 text-white py-1 rounded-lg px-2">
          <BiReset />
          <span>Reset</span>
        </button>
        <button className="flex-1 flex items-center gap-2 justify-center bg-green-500 hover:bg-green-600 text-white py-1 rounded-lg min-w-fit px-2">
          <BiEdit />
          <span>Create Order</span>
        </button>
      </div>
      <div className="flex justify-between">
        <p>Order #645</p>
        <p className="text-sm text-slate-400">Date</p>
      </div>
      <div>
        <p className="font-semibold mb-1">Customer Information</p>
        <div>
          <div className="flex items-center text-sm gap-2 text-slate-400 border py-1 px-2 rounded-md mb-1">
            <BiUser />
            <input className="outline-none bg-transparent w-full" type="text" placeholder="Customer Name" />
          </div>
          <div className="flex items-center text-sm gap-2 text-slate-400 border py-1 px-2 rounded-md">
            <MdOutlineTableBar />
            <input className="outline-none bg-transparent w-full" type="text" placeholder="Table" />
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <p className="font-semibold mb-1">Order Details</p>
        <div className="overflow-y-scroll max-h-72 h-full ">
          {listOrder.map((data, i) => (
            <ListOrderCard key={i} orderInfo={data} />
          ))}
        </div>
      </div>
      <div className="">
        <div className="flex bg-green-50 py-1 px-2 rounded-lg text-xs gap-2 mb-2">
          <span className="flex-1 font-semibold">Add</span>
          <button className="text-slate-500">Discound</button>
          <button className="text-slate-500">Coupon Code</button>
          <button className="text-slate-500">Note</button>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg text-xs border-b">
          <div className="flex items-center justify-between">
            <p>Subtotal</p>
            <p>$400.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Discount sales</p>
            <p>-$20.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Total sale tax</p>
            <p>$20.00</p>
          </div>
        </div>
        <div className="bg-slate-50 p-2 rounded-md flex justify-between mb-2 font-bold">
          <p>Total </p>
          <p>$380.00</p>
        </div>
        <button onClick={openModal} className="bg-green-500 text-white justify-center w-full items-center rounded-lg py-1 px-2 hover:bg-green-600">
          Payment Proccess
        </button>
        <PaymentModal isOpen={isModalOpen} closeModel={closeModal} content={'This content'} />
      </div>
    </div>
  );
}
