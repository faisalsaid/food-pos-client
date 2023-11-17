import CardGrafik from '../../../components/share/CardGrafik';
import ChartPayment from '../../../components/share/ChartPayment';
import { faker } from '@faker-js/faker';
import MainChart from '../../../components/share/MainChart';
import DoughnutChart from '../../../components/share/DoughnutChart';
import TableEmployee from '../../../components/table/employee/TableEmployee';
import DetailsCard from './DetailsCard';
import TotalTrancsactionCard from './TotalTrancsactionCard';
import LastOrderTables from './LastOrderTables';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchDashboardData } from '../config/dashboardSlice';

// Generate card grafik data dummy use faker
faker.seed(123);
const orderDataFramework = () => {
  return {
    _id: faker.string.uuid(),
    value: faker.number.int({ min: 1000, max: 999999 }),
    percnt: faker.number.int({ min: 0, max: 100 }),
  };
};
// Generate card grafik data dummy use faker end

export const Dashboard = () => {
  // init faker data start
  const titleOrders = ['Total Orders', 'Total Sale', 'Active Order', 'Average Order'];
  const ordersData = faker.helpers.multiple(orderDataFramework, { count: 4 });
  const dataCardGrafik = ordersData.map((data, i) => {
    return {
      ...data,
      title: titleOrders[i],
    };
  });
  // init faker data end

  const dispatch = useDispatch();
  const { dashboardData, isSuccess, isLoading, message, isError } = useSelector((state) => state.dashboard);
  // console.log('REDUX DASHBOARD >>', dashboardData, isSuccess, isLoading, message, isError);

  const [displayDashData, setDisplayDashData] = useState(null);
  // console.log(displayDashData);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, []);
  useEffect(() => {
    setDisplayDashData(dashboardData);
  }, [dashboardData]);

  return (
    <div className="p-3 flex flex-col gap-4">
      {/* GRAFIK CARD START */}
      <div className="flex flex-col gap-4 sm:flex-row  sm:overflow-x-scroll pb-2  ">
        {displayDashData?.dataTotal ? displayDashData?.dataTotal.map((data, i) => <CardGrafik key={i} data={data} />) : '..loading'}

        {displayDashData?.mealTime ? displayDashData?.mealTime.slice(0, 3).map((mealtTime, i) => <DetailsCard key={i} data={mealtTime} />) : '...loading'}
      </div>
      {/* GRAFIK CARD END */}

      <div className="flex flex-col gap-4 sm:flex-row">
        {/* CHART END */}
        <div className="bg-white p-3 rounded-md flex-1 hover:drop-shadow-md transition-all duration-300 flex-shrink">
          <MainChart />
        </div>
        {/* CHART END */}
        <div className="bg-white p-3 rounded-md gap  hover:drop-shadow-md transition-all duration-300 min-w-fit sm:w-64 ">
          <p className="text-lg font-semibold text-slate-500 mb-3">Total Transaction :</p>
          <div className="flex gap-3 flex-col">
            {displayDashData?.totalTransaction ? displayDashData?.totalTransaction.map((item, i) => <TotalTrancsactionCard key={i} data={item} />) : '...loading'}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex-1 bg-white rounded-md p-3 hover:drop-shadow-md transition-all duration-300 ">
          <LastOrderTables />
        </div>
        <div className="bg-white rounded-md p-3 hover:drop-shadow-md transition-all duration-300 min-w-fit min-h-fit w-full sm:w-36 h-[480px]">
          <p className="font-semibold mb-2">Popular Menu :</p>
          <DoughnutChart topMenu={displayDashData?.popularMenu} />
        </div>
      </div>
    </div>
  );
};
