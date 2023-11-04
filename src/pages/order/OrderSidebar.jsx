import React from 'react';
import ListOrderCard from './ListOrderCard';
import Modal from 'react-modal';

import { CiSearch, CiPizza, CiBowlNoodles } from 'react-icons/ci';
import { IoNotifications, IoIceCreamOutline } from 'react-icons/io5';
import { CgMenuGridO } from 'react-icons/cg';
import { PiHamburger, PiCoffee } from 'react-icons/pi';
import { BiBowlRice } from 'react-icons/bi';
import { AiOutlineCloseCircle, AiOutlineClose } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdOutlineLocalDrink } from 'react-icons/md';
import { BiPlus, BiMinus, BiReset, BiEdit, BiUser, BiEditAlt } from 'react-icons/bi';

// init react modal
Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '100',
  },
};

const PaymentModal = ({ isOpen, closeModel, content }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModel} contentLabel="Payment Modal" style={customStyles}>
      <div className="max-w-md">
        <div className="flex items-center gap-2 mb-2 border-b pb-2">
          <p className="flex-1">Paymen Order #654</p>
          <p className="text-slate-400 text-sm">Sunday, 01 Januari 2001</p>
          <button onClick={closeModel} className="bg-red-600 p-1 text-white rounded-md">
            <AiOutlineClose />
          </button>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex accusamus repellat doloremque officia porro amet aspernatur alias. Quia dolores est molestiae nam, explicabo
          voluptates rem ad ducimus aut similique dolorem!
        </p>
        <button onClick={closeModel}>Close</button>
      </div>
    </Modal>
  );
};

export default function OrderSidebar() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
            <BiEditAlt />
            <input className="outline-none bg-transparent w-full" type="text" placeholder="Table" />
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <p className="font-semibold mb-1">Order Details</p>
        <div className="overflow-y-scroll max-h-72 h-full ">
          {[1, 2, 3, 2, 2, 2, 2, 2, 2, 2].map((index, i) => (
            <ListOrderCard key={i} />
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
