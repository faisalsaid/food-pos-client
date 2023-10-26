import { useSelector } from 'react-redux';

export default function Profile() {
  const { data, isLoading, error } = useSelector((state) => state.user.curentUser);
  return <div>Profile</div>;
}
