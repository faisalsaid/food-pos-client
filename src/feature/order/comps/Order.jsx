import React from 'react';
import OrderSidebar from './OrderSidebar';
import MenusComp from './MenusComp';

export default function Order() {
  return (
    <div className=" flex items-stretch  max-h-screen relative ">
      <MenusComp />
      <OrderSidebar />
    </div>
  );
}
