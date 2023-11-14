import CardGrafik from '../../../components/share/CardGrafik';
import ChartPayment from '../../../components/share/ChartPayment';
import { faker } from '@faker-js/faker';
import MainChart from '../../../components/share/MainChart';
import DoughnutChart from '../../../components/share/DoughnutChart';
import TableEmployee from '../../../components/table/employee/TableEmployee';
import DetailsCard from './DetailsCard';
import TotalTrancsactionCard from './TotalTrancsactionCard';
import LastOrderTables from './LastOrderTables';

faker.seed(123);
// Generate card grafik data dummy use faker

const orderDataFramework = () => {
  return {
    _id: faker.string.uuid(),
    value: faker.number.int({ min: 1000, max: 999999 }),
    percnt: faker.number.int({ min: 0, max: 100 }),
  };
};

export const Dashboard = () => {
  const titleOrders = ['Total Orders', 'Total Sale', 'Active Order', 'Average Order'];
  const ordersData = faker.helpers.multiple(orderDataFramework, { count: 4 });
  const dataCardGrafik = ordersData.map((data, i) => {
    return {
      ...data,
      title: titleOrders[i],
    };
  });

  return (
    <div className="p-3 flex flex-col gap-4 bg-green-50 ">
      {/* GRAFIK CARD START */}
      <div className="flex flex-col gap-4">
        {/* TOTAL ORDER INCOME START */}
        <div className="flex  items-center gap-4 overflow-x-scroll ">
          {[1, 2].map((item, i) => (
            <CardGrafik key={i} />
          ))}
        </div>
        {/* TOTAL ORDER INCOME END */}

        {/* THREE EAT TIMES START */}
        <div className="flex items-center gap-4 overflow-x-scroll ">
          {[1, 2, 3].map((item, i) => (
            <DetailsCard key={i} />
          ))}
        </div>
        {/* THREE EAT TIMES END */}
      </div>
      {/* GRAFIK CARD END */}

      <div className="flex flex-col gap-4">
        {/* CHART END */}
        <div className="bg-white p-3 rounded-md flex-1 hover:drop-shadow-md transition-all duration-300">
          <MainChart />
        </div>
        {/* CHART END */}
        <div className="bg-white p-3 rounded-md gap  hover:drop-shadow-md transition-all duration-300 ">
          <p className="text-lg font-semibold text-slate-500 mb-3">Total Transaction :</p>
          <div className="flex gap-3 flex-col">
            {['a', 'b', 'c'].map((item, i) => (
              <TotalTrancsactionCard key={i} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex-1 bg-white rounded-md p-3 hover:drop-shadow-md transition-all duration-300 ">
          <LastOrderTables />
        </div>
        <div className="bg-white rounded-md p-3 hover:drop-shadow-md transition-all duration-300">
          <DoughnutChart />
        </div>
      </div>
    </div>
  );
};
