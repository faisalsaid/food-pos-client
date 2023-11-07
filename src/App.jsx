import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Dashboard } from './feature/Dashboard';
import { Signin } from './feature/outh/comps/Signin';
import { Signup } from './feature/outh/comps/Signup';
import Profile from './feature/profile/Profile';
import PrivateRoute from './components/PrivateRoute';
import SideMenu from './components/SideMenu';
import Header from './components/Header';
import Order from './feature/order/Order';
import LandingPage from './feature/LandingPage';
import Purchase from './feature/purchase/Purchase';
import Menu from './feature/menu/comps/Menu';
import Chart from './feature/chart/Chart';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden bg-neutral-50 text-slate-600">
      <div className=" flex">
        <SideMenu />
      </div>
      <div className="flex-1 overflow-y-scroll">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  const { curentUser } = useSelector((state) => state.user);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<LandingPage />} />
          <Route element={<PrivateRoute authenticated={curentUser} />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/order" element={<Order />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chart" element={<Chart />} />
            </Route>
          </Route>
          <Route element={<PrivateRoute authenticated={!curentUser} />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="/*" element={<LandingPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
