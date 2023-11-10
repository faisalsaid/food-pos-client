import React from 'react';
import Modal from 'react-modal';

// Import icons
import { AiOutlineClose } from 'react-icons/ai';
import { BiReset, BiEdit, BiUser, BiEditAlt, BiWallet } from 'react-icons/bi';
import { MdOutlineTableBar } from 'react-icons/md';
import { render } from 'react-dom';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '70%',
    zIndex: '100',
  },
};

const ListOrder = () => {
  return (
    <div className="flex gap-2">
      <img
        className="w-14 h-14 object-cover rounded-xl"
        src="https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/62c59f6365a259b03da440de3973f201/Derivates/668cba6648888c61d249c0a5d9651157a4ce3793.jpg"
        alt=""
      />
      <div className="flex-1 flex  flex-col">
        <p className="text-sm text-slate-600 font-semibold">Pizza Tandorri Paineer</p>
        <p className="text-xs flex-1 text-slate-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit...</p>
        <div className="flex justify-between items-center text-xs">
          <p>1 items</p> <p className="font-bold">$120.00</p>
        </div>
      </div>
    </div>
  );
};

export default function PurchaseModal({ isOpen, closeModel, content }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModel} contentLabel="Purchase Modal" style={customStyles}>
      <div className="w-[500px] ">
        <div className="flex items-center gap-2  border-b pb-2 ">
          <p className="flex-1 font-semibold">Paymen Order #{content?.order}</p>
          <p className="text-slate-400 text-sm">Sunday, 01 Januari 2001</p>
          <button onClick={closeModel} className="bg-red-600 p-1 text-white rounded-md">
            <AiOutlineClose />
          </button>
        </div>
        <div className="py-2 border-b">
          <p className="">Order Details</p>
          <div className="py-2 flex flex-col gap-2">
            {[1, 2, 3, 4].map((data, i) => (
              <ListOrder key={i} />
            ))}
          </div>
        </div>
        <div className="py-2">
          <p className="text-sm text-slate-400 mb-1">Customer Information :</p>
          <div>
            <p className="flex gap-2 items-center">
              <span>
                <BiUser />
              </span>
              <span>{content?.customer_name}</span>
            </p>
            <p className="flex gap-2 items-center">
              <span>
                <MdOutlineTableBar />
              </span>
              <span>Table {content?.table}</span>
            </p>
            <p className="flex gap-2 items-center">
              <span>
                {' '}
                <BiWallet />
              </span>
              <span>Cash</span>
            </p>
          </div>
        </div>
        <div>
          <div className="bg-slate-100 p-2 rounded-lg text-slate-400 border-b">
            <div className="flex items-center justify-between">
              <p>Subtotal</p> <p>$200.00</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Discount sales</p> <p>-$20.00</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Total sales tax</p> <p>$2.00</p>
            </div>
          </div>
          <div className="bg-slate-100 p-2 rounded-lg">
            <div className="flex items-center justify-between font-semibold text-xl">
              <p>Total</p> <p>${content.price}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Change</p> <p>$40.00</p>
            </div>
          </div>
        </div>
        <div className="py-2 flex justify-end">
          <button className="bg-red-500 py-1 text-white px-2 rounded-lg textwh" onClick={closeModel}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
