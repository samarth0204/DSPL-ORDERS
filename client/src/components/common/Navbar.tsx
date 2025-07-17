import { useIsMobile } from "@/hooks/use-mobile";
import BottomNavbar from "./BottomNavbar";
import AppSidebar from "./AppSidebar";
import Header from "./Header";

const Navbar = () => {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <>
          <Header />
          <BottomNavbar />
        </>
      ) : (
        <div className="w-64 shrink-0">
          <AppSidebar />
        </div>
      )}
    </>
  );
};

export default Navbar;
