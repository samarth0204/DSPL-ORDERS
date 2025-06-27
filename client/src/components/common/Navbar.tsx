import { useIsMobile } from "@/hooks/use-mobile";
import BottomNavbar from "./BottomNavbar";
import AppSidebar from "./AppSidebar";

const Navbar = () => {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <BottomNavbar />
      ) : (
        <div className="w-64 shrink-0">
          <AppSidebar />
        </div>
      )}
    </>
  );
};

export default Navbar;
