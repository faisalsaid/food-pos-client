import React from 'react';
import Modal from 'react-modal';

// Import icons
import { AiOutlineClose } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { MdOutlineTableBar } from 'react-icons/md';

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
    maxHeight: '70%',
    zIndex: '100',
  },
};

export default function PaymentModal({ isOpen, closeModel, content }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModel} contentLabel="Payment Modal" style={customStyles}>
      <div className="w-[500px] ">
        <div className="flex items-center gap-2  border-b pb-2 ">
          <p className="flex-1">Paymen Order #654</p>
          <p className="text-slate-400 text-sm">Sunday, 01 Januari 2001</p>
          <button onClick={closeModel} className="bg-red-600 p-1 text-white rounded-md">
            <AiOutlineClose />
          </button>
        </div>
        <div className="py-8 flex flex-col gap-5">
          <div>
            <p className="text-center text-sm mb-2 text-slate-500">Amount tendered</p>
            <div className="flex gap-2 border rounded-lg p-2 items-center">
              <span>$</span>
              <input className="flex-1 text-center text-2xl font-bold outline-none" type="number" placeholder="eg: 100.00" />
            </div>
          </div>
          <div className="flex gap-2 ">
            <button className="flex-1 bg-slate-400 hover:bg-green-400 text-white py-1 px-2 rounded-lg ">Cash</button>
            <button className="flex-1 bg-slate-400 hover:bg-green-400 text-white py-1 px-2 rounded-lg">Debit Card</button>
            <button className="flex-1 bg-slate-400 hover:bg-green-400 text-white py-1 px-2 rounded-lg">Credit Card</button>
          </div>
          <div>
            <p className="text-center text-sm mb-2 text-slate-500">Quick cash payment</p>
            <div className="flex gap-2">
              <button className="bg-green-500 flex-1 py-1 text-white rounded-md">$5</button>
              <button className="bg-green-500 flex-1 py-1 text-white rounded-md">$10</button>
              <button className="bg-green-500 flex-1 py-1 text-white rounded-md">$50</button>
              <button className="bg-green-500 flex-1 py-1 text-white rounded-md">$100</button>
            </div>
          </div>
        </div>
        <div className="py-3 border-t text-slate-500">
          <p className="text-xs">Customer Information</p>
          <div>
            <p className="flex gap-2 items-center">
              <span>
                <BiUser />
              </span>
              <span>Michael Angelo</span>
            </p>
            <p className="flex gap-2 items-center">
              <span>
                <MdOutlineTableBar />
              </span>
              <span>Table 1</span>
            </p>
          </div>
        </div>
        <div>
          <div className="bg-slate-100 p-2 rounded-md text-sm text-slate-500 border-b">
            <div className="flex justify-between">
              <p>Subtotal</p> <p>$200.00</p>
            </div>
            <div className="flex justify-between">
              <p>Discount sales</p> <p>-$20.00</p>
            </div>
            <div className="flex justify-between">
              <p>Total sales tax</p> <p>$2.00</p>
            </div>
          </div>
          <div className="bg-slate-100 p-2 rounded-lg">
            <div className="flex justify-between text-xl font-semibold">
              <p>Total</p> <p>$160</p>
            </div>
            <div className="flex justify-between">
              <p>Change</p> <p>$40</p>
            </div>
          </div>
        </div>
        <div className="py-2 flex gap-2">
          <button onClick={closeModel} className="bg-red-500 text-white py-1 px-2 rounded-md">
            Cancel
          </button>
          <button className="flex-1 bg-green-500 text-white py-1 px-2 rounded-md  text-center">Confirm</button>
        </div>
      </div>
    </Modal>
  );
}
