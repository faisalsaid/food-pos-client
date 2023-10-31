import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Avatar() {
  const { data: curentUser } = useSelector((state) => state.user.curentUser);

  return (
    <div className="flex gap-3 items-center">
      <Link to={'/profile'}>
        <img className=" w-9 h-9 rounded-full drop-shadow-lg" src={curentUser.avatar} alt="" />
      </Link>
      <div>
        <p className="text-sm ">{curentUser.name}</p>
        <p className="text-xs text-slate-400">{curentUser.email}</p>
      </div>
    </div>
  );
}
