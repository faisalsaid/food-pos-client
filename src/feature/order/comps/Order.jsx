import React from 'react';
import OrderSidebar from './OrderSidebar';
import MenusComp from './MenusComp';

export default function Order() {
  return (
    <div className="  h-[calc(100vh-60px)] block sm:flex  ">
      <MenusComp />
      <OrderSidebar />
    </div>
  );
}
