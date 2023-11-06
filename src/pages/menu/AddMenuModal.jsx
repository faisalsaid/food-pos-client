import React from 'react';
import Modal from 'react-modal';

// Import icons
import { AiOutlineClose } from 'react-icons/ai';
import { BiUpload, BiBookAdd } from 'react-icons/bi';
import { MdOutlineCancel } from 'react-icons/md';

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

export default function AddMenuModal({ isOpen, closeModel, content, isEdit }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModel} contentLabel="Payment Modal" style={customStyles}>
      <div className="w-[500px] ">
        <div className="flex items-center gap-2  border-b pb-2 ">
          <p className="flex-1 font-semibold">{isEdit ? 'Edit Menu' : 'Add New Menu'}</p>
          <button onClick={closeModel} className="bg-red-600 p-1 text-white rounded-md">
            <AiOutlineClose />
          </button>
        </div>
        <form action="">
          <div className="flex flex-col gap-3 mt-3">
            <div className="flex flex-col gap-2 ">
              <label className=" text-slate-700" htmlFor="title">
                Menu Title
              </label>
              <input className="border py-1 px-2 outline-slate-400 rounded-lg" name="title" id="title" type="text" placeholder="Input menu title..." />
            </div>
            <div className="flex flex-col gap-2">
              <label className=" text-slate-700" htmlFor="desc">
                Description
              </label>
              <textarea placeholder="Type menu description..." className="p-2 border outline-slate-400 rounded-lg" id="desc" name="desc" rows={6}></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="category">Category :</label>
              <select className="border p-2 border-slate-400 rounded-lg" id="category" name="category " defaultValue={'pizza'}>
                <option className="p-2" value="coofee">
                  Coffee
                </option>
                <option className="p-2" value="pizza">
                  Pizza
                </option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1 bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className="w-[45%] bg-green-400 h-1"></div>
              </div>
              <button type="button" className=" bg-green-500 flex items-center gap-2 hover:bg-green-600 text-white rounded-md py-1 px-2">
                <BiUpload /> <span> {isEdit ? 'Change Image' : 'Upload Image'}</span>
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price</label>
              <div className=" flex gap-2 items-center p-2 border rounded-lg">
                <span>$</span>
                <input className="w-full outline-none" type="number" id="price" name="price" />
              </div>
            </div>
            <div className="py-2 flex justify-end gap-2">
              <button onClick={closeModel} className="flex items-center gap-1 bg-red-500 text-white py-1 px-2 rounded-md">
                <MdOutlineCancel /> <span>Cancel</span>
              </button>
              <button type="button" className="flex items-center gap-1 bg-green-500 text-white py-1 px-2 rounded-md  text-center">
                <BiBookAdd /> <span>{isEdit ? 'Update Menu' : 'Add Menu'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
