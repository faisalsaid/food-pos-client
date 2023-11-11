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
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: '50',
  },
};

const ListOrder = ({ info }) => {
  return (
    <div className="flex gap-2">
      <img className="w-14 h-14 object-cover rounded-xl" src={info?.item?.image?.url} alt="menu image" />
      <div className="flex-1 flex  flex-col">
        <p className="text-sm text-slate-600 font-semibold">{info?.item?.title}</p>
        <p className="text-xs flex-1 text-slate-400">{info?.item?.description}</p>
        <div className="flex justify-between items-center text-xs">
          <p>{info?.quantity}</p> <p className="font-semibold">${info?.orderPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default function PurchaseModal({ isOpen, closeModel, content, tableOptions, paymentMethodOtptions }) {
  const { listOrder } = content;

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModel} contentLabel="Purchase Modal" style={customStyles} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false}>
      <div className="w-[500px] ">
        <div className="flex items-center gap-2  border-b pb-2 ">
          <p className=" font-semibold">Paymen Order #{content?.orderRef}</p>
          <p className="text-slate-400 text-sm flex-1">{new Date(content?.createdAt).toDateString()}</p>
          <button onClick={closeModel} className="bg-red-600 p-1 text-white rounded-md">
            <AiOutlineClose />
          </button>
        </div>

        <div className="py-2">
          <p className=" text-slate-600 mb-1">Customer Information :</p>
          <div className="flex gap-6 flex-wrap text-lg">
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
        <div className="py-2 border-b">
          <div className="flex justify-between">
            <p className="">Order Details :</p>
            <div className="flex gap-3 items-center text-sm">
              <p className="bg-green-100 px-2 rounded-md text-green-700">{listOrder?.length} Menu</p>
              <p className="bg-green-100 px-2 rounded-md text-green-700">{listOrder?.map((item) => item.quantity).reduce((total, item) => total + item)} Quantity</p>
            </div>
          </div>
          <div className="py-2 flex flex-col gap-2">
            {listOrder?.map((data, i) => (
              <ListOrder key={i} info={data} />
            ))}
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
          <button className="bg-red-500 py-1 text-white px-2 rounded-lg " onClick={closeModel}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
