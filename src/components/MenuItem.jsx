import React from 'react';

export default function MenuItem({ props }) {
  console.log(props);
  return (
    <div>
      {console.log(toggle)}
      <NavLink className={({ isActive }) => (isActive ? `bg-orange-400 hover:bg-orange-300 text-white ` + navClass : navClass)} key={data.key} to={data.path}>
        <span>{data.icon}</span>
        <span>{data.label}</span>
      </NavLink>
    </div>
  );
}
