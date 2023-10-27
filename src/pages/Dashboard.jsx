import { render } from 'react-dom';
import CardGrafik from '../components/share/CardGrafik';
import ChartPayment from '../components/share/ChartPayment';

export const Dashboard = () => {
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="">
        <div className="flex items-center gap-4">
          {['a', 'b', 'v', 'd'].map((item, i) => (
            <CardGrafik key={i} />
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="bg-white p-3 rounded-md flex-1">Chart</div>
        <div className="bg-white p-3 rounded-md ">
          <p className="text-xl font-semibold text-slate-500 mb-3">Payment Statistics</p>
          {['a', 'b', 'c'].map((item, i) => (
            <ChartPayment />
          ))}
        </div>
      </div>
    </div>
  );
};
