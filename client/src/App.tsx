import AddOrder from "./components/common/AddOrder";
import AppSidebar from "./components/common/AppSidebar";
import BottomNavbar from "./components/common/BottomNavbar";
import TableGrid from "./components/common/TableGrid";
import LoginPage from "./components/pages/LoginPage";
import { useIsMobile } from "./hooks/use-mobile";

function App() {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen">
      {/* Sidebar or Bottom Navbar */}
      {isMobile ? (
        <BottomNavbar />
      ) : (
        <div className="w-64 shrink-0">
          <AppSidebar />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <TableGrid />
      </div>

      {/* Floating Button */}
      <AddOrder />
    </div>
    // <LoginPage />
  );
}

export default App;
