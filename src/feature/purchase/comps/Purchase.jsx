import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import CardGrafik from '../../../components/share/CardGrafik';
import PurchaseTable from './table/PurchaseTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../dashboard/config/dashboardSlice';
import TotalTrancsactionCard from '../../dashboard/comps/TotalTrancsactionCard';
import SkeletonCard1 from '../../../components/skeleton/SkeletonCard1';

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
  const dispatch = useDispatch();
  const { dashboardData } = useSelector((state) => state.dashboard);
  const [totalTransData, setTotalTransData] = useState({});

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, []);

  useEffect(() => {
    dashboardData && setTotalTransData(dashboardData.totalTransaction);
  }, [dashboardData]);

  // useEffect(() => {
  //   totalTransData && console.log(totalTransData);
  // }, [totalTransData]);

  return (
    <div className="p-4 flex flex-col gap-4">
      <p className="font-semibold text-xl">Total Transaction :</p>
      <div className="flex flex-col sm:flex-row gap-2">
        {totalTransData.length > 0 ? totalTransData.map((item, i) => <TotalTrancsactionCard key={i} data={item} />) : [1, 2, 3].map((data, i) => <SkeletonCard1 key={i} />)}
      </div>
      <PurchaseTable />
    </div>
  );
}
