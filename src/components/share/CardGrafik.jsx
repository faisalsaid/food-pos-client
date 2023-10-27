import { FcBullish } from 'react-icons/fc';
import { BiSolidUpArrowAlt } from 'react-icons/bi';

export default function CardGrafik() {
  return (
    <div className="flex flex-1 bg-white hover:drop-shadow-md p-3 rounded-md transition-all duration-700 items-end">
      <div className="flex-1 gap-1">
        <p className="text-slate-400">Total Orders</p>
        <p className="text-2xl font-semibold">123234534</p>
        <p className="flex items-center text-sm text-green-600">
          <BiSolidUpArrowAlt /> <span>52%</span>
        </p>
      </div>
      <div className="w-16">
        <FcBullish className="text-6xl" />
      </div>
    </div>
  );
}
