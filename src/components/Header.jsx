import React from 'react';
import Avatar from './share/Avatar';
import { AiOutlineMenu } from 'react-icons/ai';
import { setToggleMenu } from '../redux/layout/layout.slice.js';
import { useDispatch } from 'react-redux';

export default function Header() {
  const dispatch = useDispatch();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div className="p-3 flex bg-white drop-shadow-sm ">
      <div className="flex-1 flex items-center gap-3">
        <button onClick={() => dispatch(setToggleMenu())} className="bg-orange-100 p-2 rounded-full text-orange-500">
          <AiOutlineMenu />
        </button>
        <p className="text-sm">{new Date().toLocaleDateString('en-IN', options)}</p>
      </div>
      <Avatar />
    </div>
  );
}
