import { FcBullish } from 'react-icons/fc';
import { BiSolidUpArrowAlt } from 'react-icons/bi';

export default function CardGrafik({ data }) {
  // console.log(data);
  return (
    <div className="flex  bg-white hover:drop-shadow-md p-3 rounded-2xl transition-all gap-3 duration-700 items-end min-w-fit  sm:items-center ">
      <div className="flex-1 gap-1">
        <p className="text-slate-400">Total Orders</p>
        <p className="text-xl font-semibold">4.567.657</p>
        <p className="flex items-center text-xs text-green-600">
          <BiSolidUpArrowAlt /> <span>10%</span>
        </p>
      </div>
      <div className="w-16">
        <FcBullish className="text-6xl" />
      </div>
    </div>
  );
}
