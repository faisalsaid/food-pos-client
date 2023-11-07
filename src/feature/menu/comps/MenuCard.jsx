import React from 'react';
import { BiEditAlt } from 'react-icons/bi';
import AddMenuModal from './AddMenuModal';
import { useDispatch } from 'react-redux';
import { deleteMenu } from '../config/menuSlice';

// import icons
import { RiDeleteBinLine } from 'react-icons/ri';

export default function MenuCard({ menuInfo, ...rest }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditMenu = () => {
    openModal();
  };

  const handleDelete = (id) => {
    dispatch(deleteMenu(id));
    console.log('delete', id);
  };

  return (
    <>
      <div className="p-2 bg-white rounded-lg">
        <div className="flex gap-2">
          <img className="h-16 aspect-square rounded-2xl object-cover" src={menuInfo.image.url} alt="menu_image" />
          <div>
            <h6 className="font-semibold text-slate-600">{menuInfo.title}</h6>
            <p className="text-xs text-slate-400">{menuInfo.description}</p>
            <p className="text-sm text-green-400">Available</p>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex">
            <span className="text-xs">$</span>
            <span className="font-bold text-xl">{menuInfo.price}</span>
          </div>
          <div className="flex items-center gap-2 ">
            <button onClick={() => handleDelete(menuInfo._id)} className=" flex items-center gap-1 bg-rose-500 hover:bg-rose-600 text-white rounded-lg py-1 px-2">
              <RiDeleteBinLine /> <span>Delete</span>
            </button>
            <button onClick={handleEditMenu} className="flex items-center bg-green-500 text-white rounded-lg py-1 px-2 gap-1 hover:bg-green-600">
              <BiEditAlt />
              <span>Edit</span>
            </button>
          </div>
        </div>
      </div>
      <AddMenuModal isOpen={isModalOpen} closeModel={closeModal} isEdit={true} content={'This content'} />
    </>
  );
}
