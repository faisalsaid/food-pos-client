import React, { useEffect, useState } from 'react';
import Avatar from './share/Avatar';
import { AiOutlineMenu } from 'react-icons/ai';
import { setToggleMenu } from '../redux/layout/layout.slice.js';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';

export default function Header() {
  const dispatch = useDispatch();

  const [isSidebarOpen, setSidebarOpen] = useState(localStorage.getItem('sidebarOpen') === 'true' || false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Update localStorage when the sidebar state changes
    localStorage.setItem('sidebarOpen', isSidebarOpen);
    dispatch(setToggleMenu(isSidebarOpen));
    console.log(isSidebarOpen);
  }, [isSidebarOpen]);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div className="p-3 flex bg-white drop-shadow-sm sticky top-0 z-20 ">
      <div className="flex-1 flex items-center gap-3">
        <button onClick={() => toggleSidebar()} className="bg-orange-100 p-2 rounded-full text-orange-500">
          <AiOutlineMenu />
        </button>
        <p className="hidden sm:block text-sm">{new Date().toLocaleDateString('en-IN', options)}</p>
      </div>
      <Avatar />
    </div>
  );
}
