import { User } from "lucide-react";
import logo from "../../static/logo.jpg";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-14 px-4 flex items-center justify-between z-50 backdrop-blur-md bg-white/30 border-b border-white/40">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-auto rounded-sm" />
      </div>
      <div className="text-gray-800 border-2 rounded-full p-2">
        <User className="h-6 w-6" />
      </div>
    </div>
  );
};

export default Header;
