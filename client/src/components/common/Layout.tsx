import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-14">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
