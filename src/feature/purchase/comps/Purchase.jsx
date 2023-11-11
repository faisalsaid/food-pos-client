import React from 'react';
import { faker } from '@faker-js/faker';
import CardGrafik from '../../../components/share/CardGrafik';
import PurchaseTable from './table/PurchaseTable';

const orderDataFramework = () => {
  return {
    _id: faker.string.uuid(),
    value: faker.number.int({ min: 1000, max: 999999 }),
    percnt: faker.number.int({ min: 0, max: 100 }),
  };
};

const titleOrders = ['Total Orders', 'Total Sales', 'Active Order'];
const ordersData = faker.helpers.multiple(orderDataFramework, { count: 3 });
const dataCardGrafik = ordersData.map((data, i) => {
  return {
    ...data,
    title: titleOrders[i],
  };
});

export default function Purchase() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <p className="font-semibold text-xl">Purchase List</p>
      <div className="flex flex-col sm:flex-row gap-2">
        {dataCardGrafik.map((item, i) => (
          <CardGrafik key={i} data={item} />
        ))}
      </div>
      <PurchaseTable />
    </div>
  );
}
