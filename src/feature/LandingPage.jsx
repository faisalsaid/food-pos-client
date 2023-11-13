import { FcShop } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const { curentUser } = useSelector((state) => state.user);
  return (
    <div className="h-screen sm:flex sm:max-w-8xl mx-auto xl:bg-green-50  ">
      <div className="bg-orange-300 h-1/2 justify-center content-center flex items-center sm:h-full sm:w-1/2 ">
        <div className=" w-[70%]">
          <img className="mx-auto" src="/mockup.png" alt="" />
        </div>
      </div>
      <div className=" text-slate-500 h-1/2 flex flex-col justify-center content-center items-center  sm:w-1/2 sm:h-full">
        <div className="max-w-[250px]">
          <p className="">Hi Folks!</p>
          <p className="text-4xl font-semibold"> Kasir Kuliner</p>
          <p>Point of sales, calculate sales revenue and analyze your food product sales</p>
          <div className="py-4">
            <Link className="py-2 px-4 bg-green-500 max-w-fit rounded-2xl text-white" to={curentUser ? '/dashboard' : '/signin'}>
              <span className="">Discover</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
