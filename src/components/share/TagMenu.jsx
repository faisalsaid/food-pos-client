import React from 'react';

export default function TagMenu({ tag, tagActive }) {
  return (
    <div
      className={`${
        tag.value === tagActive ? 'bg-orange-300 text-white' : 'bg-white'
      } flex items-center gap-1 hover:text-slate-500 rounded-md py-1 px-2 text-xs hover:bg-orange-100 text-slate-500 min-w-fit`}
    >
      <span>{tag.icon}</span> <span>{tag.label}</span>
    </div>
  );
}
