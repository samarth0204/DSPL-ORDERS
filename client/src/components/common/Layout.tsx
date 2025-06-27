import { Outlet } from "react-router-dom";
import AddOrder from "./AddOrder";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>

      {/* Floating Button */}
      <AddOrder />
    </div>
  );
};

export default Layout;
