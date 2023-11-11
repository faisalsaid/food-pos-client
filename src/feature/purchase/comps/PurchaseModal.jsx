import React from 'react';
import Modal from 'react-modal';

// Import icons
import { AiOutlineClose } from 'react-icons/ai';
import { BiReset, BiEdit, BiUser, BiEditAlt, BiWallet } from 'react-icons/bi';
import { MdOutlineTableBar } from 'react-icons/md';
import { render } from 'react-dom';
import { printOption } from '../../../config/helper';

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

const ListOrder = ({ info }) => {
  console.log(info);
  return (
    <div className="flex gap-2">
      <img className="w-14 h-14 object-cover rounded-xl" src={info?.item?.image?.url} alt="menu image" />
      <div className="flex-1 flex  flex-col">
        <p className="text-sm text-slate-600 font-semibold">{info?.item?.title}</p>
        <p className="text-xs flex-1 text-slate-400">{info?.item?.description}</p>
        <div className="flex justify-between items-center text-xs">
          <p>{info?.quantity}</p> <p className="font-bold">${info?.orderPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default function PurchaseModal({ isOpen, closeModel, content, tableOptions, paymentMethodOtptions }) {
  const { listOrder } = content;

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModel} contentLabel="Purchase Modal" style={customStyles}>
      <div className="w-[500px] ">
        <div className="flex items-center gap-2  border-b pb-2 ">
          <p className="flex-1 font-semibold">Paymen Order #{content?.orderRef}</p>
          <p className="text-slate-400 text-sm">Sunday, 01 Januari 2001</p>
          <button onClick={closeModel} className="bg-red-600 p-1 text-white rounded-md">
            <AiOutlineClose />
          </button>
        </div>
        <div className="py-2 border-b">
          <p className="">Order Details</p>
          <div className="py-2 flex flex-col gap-2">
            {listOrder?.map((data, i) => (
              <ListOrder key={i} info={data} />
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
              <span>{content?.customerName}</span>
            </p>
            <p className="flex gap-2 items-center">
              <span>
                <MdOutlineTableBar />
              </span>
              <span>{printOption(content?.table, tableOptions)}</span>
            </p>
            <p className="flex gap-2 items-center">
              <span>
                <BiWallet />
              </span>
              <span>{printOption(content?.paymentMethod, paymentMethodOtptions)}</span>
            </p>
          </div>
        </div>
        <div>
          <div className="bg-slate-100 p-2 rounded-lg text-slate-400 border-b">
            <div className="flex items-center justify-between">
              <p>Subtotal</p> <p>${content?.subtotal?.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Discount sales</p> <p>-${content?.discountSales?.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Total sales tax</p> <p>${content?.saleTax?.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-slate-100 p-2 rounded-lg">
            <div className="flex items-center justify-between font-semibold text-xl">
              <p>Total</p> <p>${content?.finalPrice?.toFixed(2)}</p>
            </div>
            {content?.change && (
              <div className="flex items-center justify-between">
                <p>Change</p> <p>${content?.change?.toFixed(2)}</p>
              </div>
            )}
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
