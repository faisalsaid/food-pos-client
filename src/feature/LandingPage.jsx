import { FcShop } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const { curentUser } = useSelector((state) => state.user);
  return (
    <div className="flex w-screen h-screen items-center content-center">
      <div className="flex-auto text-center text-slate-500">
        <p className="text-3xl">Hi Folks! Welcome to</p>
        <p className="text-9xl"> Food POS App</p>
        <p className="text-xl mt-3">
          <Link className="" to={curentUser ? '/dashboard' : '/signin'}>
            <span className="">Click Here to Conitinue</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
