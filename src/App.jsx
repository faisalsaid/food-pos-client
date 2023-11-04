import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import SideMenu from './components/SideMenu';
import Header from './components/Header';
import Order from './pages/order/Order';
import LandingPage from './pages/LandingPage';
import Purchase from './pages/purchase/Purchase';
import Menu from './pages/menu/Menu';
import Chart from './pages/Chart';

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
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/order" element={<Order />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chart" element={<Chart />} />
          </Route>
        </Route>
        <Route path="/*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
