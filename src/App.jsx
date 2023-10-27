import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import SideMenu from './components/SideMenu';
import Header from './components/Header';
import Order from './pages/Order';
import LandingPage from './pages/LandingPage';

const Layout = () => {
  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden bg-neutral-50 text-slate-600">
      <SideMenu />
      <div className=" flex-1">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard" element={<Order />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
