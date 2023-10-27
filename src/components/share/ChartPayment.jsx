import { FcMoneyTransfer } from 'react-icons/fc';

export default function ChartPayment() {
  return (
    <div className="flex gap-3 items-center border p-3 rounded-md ">
      <div className="w-10 h-10 text-3xl flex items-center content-center">
        <FcMoneyTransfer />
      </div>
      <div className="flex-1">
        <p className="text-sm">Total Transactions</p>
        <p className="text-xl font-semibold">$68,434,40</p>
      </div>
    </div>
  );
}
