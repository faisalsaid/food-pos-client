import CardGrafik from '../components/share/CardGrafik';
import ChartPayment from '../components/share/ChartPayment';
import { faker } from '@faker-js/faker';

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
  const ordersData = faker.helpers.multiple(orderDataFramework, { count: 4 });

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="">
        <div className="flex items-center gap-4">
          {ordersData.map((item, i) => (
            <CardGrafik key={i} data={item} />
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="bg-white p-3 rounded-md flex-1">Chart</div>
        <div className="bg-white p-3 rounded-md gap ">
          <p className="text-lg font-semibold text-slate-500 mb-3">Payment Statistics</p>
          <div className="flex gap-3 flex-col">
            {['a', 'b', 'c'].map((item, i) => (
              <ChartPayment key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
