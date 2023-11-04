import React from 'react';
import Modal from 'react-modal';

// import icons
import { CiSearch, CiPizza, CiBowlNoodles } from 'react-icons/ci';
import { IoNotifications, IoIceCreamOutline } from 'react-icons/io5';
import { CgMenuGridO } from 'react-icons/cg';
import { PiHamburger, PiCoffee } from 'react-icons/pi';
import { BiBowlRice } from 'react-icons/bi';
import { AiOutlineCloseCircle, AiOutlineClose } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdOutlineLocalDrink } from 'react-icons/md';
import { BiPlus, BiMinus, BiAddToQueue, BiReset, BiEdit, BiUser, BiEditAlt } from 'react-icons/bi';

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

const listTag = [
  {
    label: 'All Menu',
    value: 'all',
    icon: <CgMenuGridO />,
  },
  {
    label: 'Pizza',
    value: 'pizza',
    icon: <CiPizza />,
  },
  {
    label: 'Burger',
    value: 'burger',
    icon: <PiHamburger />,
  },
  {
    label: 'Rice',
    value: 'rice',
    icon: <BiBowlRice />,
  },
  {
    label: 'Noodle',
    value: 'noodle',
    icon: <CiBowlNoodles />,
  },
  {
    label: 'Coffee',
    value: 'coffee',
    icon: <PiCoffee />,
  },
  {
    label: 'Drink',
    value: 'drink',
    icon: <MdOutlineLocalDrink />,
  },
  {
    label: 'Ice Cream',
    value: 'ice_cream',
    icon: <IoIceCreamOutline />,
  },
];

const TagMenu = ({ tag, tagActive }) => {
  return (
    <div
      className={`${
        tag.value === tagActive ? 'bg-orange-300 text-white' : 'bg-white'
      } flex items-center gap-1 hover:text-slate-500 rounded-md py-1 px-2 text-xs hover:bg-orange-100 text-slate-500 min-w-fit`}
    >
      <span>{tag.icon}</span> <span>{tag.label}</span>
    </div>
  );
};

const MenuCard = () => {
  return (
    <div className=" bg-white p-3 rounded-lg">
      <div className="flex gap-2">
        <img
          className="w-24 h-24 object-cover rounded-xl"
          src="https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/62c59f6365a259b03da440de3973f201/Derivates/668cba6648888c61d249c0a5d9651157a4ce3793.jpg"
          alt=""
        />
        <div className="flex flex-col gap-1">
          <h5 className="text-lg font-semibold text-slate-700">Pizza Sweet Corn</h5>
          <p className="flex-1 text-xs text-slate-400">Lorem ipsum dolor sit amet, consectetur...</p>
          <p className="text-sm text-teal-500">Available</p>
        </div>
      </div>
      <div className="flex items-center mt-2 gap-3">
        <p className="flex-1 font-semibold text-lg">$ 80.00</p>
        <div className="flex items-center gap-2">
          <span className="bg-orange-500 w-6 h-6 flex items-center justify-center rounded-lg text-white hover:bg-orange-600 cursor-pointer">
            <BiMinus />
          </span>
          <span>0</span>
          <span className="bg-orange-500 w-6 h-6 flex items-center justify-center rounded-lg text-white hover:bg-orange-600 cursor-pointer">
            <BiPlus />
          </span>
        </div>
        <button className="flex items-center bg-green-600 text-white py-1 px-2 gap-2 rounded-lg hover:bg-green-700 ">
          <BiAddToQueue />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

const ListOrderCard = ({ order }) => {
  return (
    <div className="flex gap-2 min-w-[250px] ">
      <img
        className="w-12 h-12 object-cover rounded-xl"
        src="https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/62c59f6365a259b03da440de3973f201/Derivates/668cba6648888c61d249c0a5d9651157a4ce3793.jpg"
        alt="order_image"
      />
      <div className="flex flex-col justify-between w-full">
        <p className="text-sm">Pizza Tandori Paneer</p>
        <div className="flex gap-2 items-center text-sm">
          <button className="text-red-700">
            <RiDeleteBinLine />
          </button>
          <p className="flex-1 font-semibold text-sm">$150,00</p>
          <div className="flex items-center gap-2">
            <button className="  bg-orange-400 hover:bg-orange-500 flex justify-center content-center text-white p-[2px] rounded-lg">
              <BiMinus />
            </button>
            <span>1</span>
            <button className="  bg-orange-400 hover:bg-orange-500 flex justify-center content-center text-white p-[2px] rounded-lg">
              <BiPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const tagActive = 'all';

export default function Order() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className=" flex ">
      <div className="flex-1 p-6">
        <div className=" flex justify-between">
          <div className="">
            <h3 className="text-2xl font-semibold text-slate-700">Welcome, Natasha Nauljam</h3>
            <p className="text-sm text-slate-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-white px-2 py-2 h-10 rounded-md border">
                <CiSearch />
                <input className="bg-transparent text-base outline-none" type="text" placeholder="Find some menu" />
              </div>
              <button className="bg-orange-400 hover:bg-orange-500 py-2 px-3 rounded-lg text-white">Search</button>
            </div>
            <div className="flex justify-center items-center bg-orange-400 w-10 h-10 rounded-lg text-white text-2xl">
              <IoNotifications />
            </div>
          </div>
        </div>
        <div className="my-4 flex gap-3">
          {listTag.map((list, i) => (
            <TagMenu key={i} tag={list} tagActive={tagActive} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 ">
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
        </div>
      </div>
      <div className="max-w-fit bg-white p-4 flex flex-col gap-4">
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
              <input className="outline-none" type="text" placeholder="Customer Name" />
            </div>
            <div className="flex items-center text-sm gap-2 text-slate-400 border py-1 px-2 rounded-md">
              <BiEditAlt />
              <input className="outline-nonet" type="text" placeholder="Table" />
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold">Order Details</p>
          <div className="flex flex-col gap-2">
            {[1, 2, 3].map(() => (
              <ListOrderCard />
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
          <div className="bg-slate-50 p-2 rounded-md flex justify-between">
            <p>Total </p>
            <p>$180.00</p>
          </div>
          <button onClick={openModal} className="bg-green-500 text-white justify-center w-full items-center rounded-lg py-1 px-2 hover:bg-green-600">
            Payment Proccess
          </button>
          <PaymentModal isOpen={isModalOpen} closeModel={closeModal} content={'This content'} />
        </div>
      </div>
    </div>
  );
}
