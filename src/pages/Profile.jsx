import { useSelector } from 'react-redux';

export default function Profile() {
  const { data, isLoading, error } = useSelector((state) => state.user.curentUser);
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold text-slate-700 py-4">Profile</h1>
      <div>
        <p>{data.name}</p>
        <img className="rounded-full" src={data.avatar} alt="profile picture" />
      </div>
    </div>
  );
}
