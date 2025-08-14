import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "./AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import logo from "../../static/logo.jpg";

const Layout = () => {
  const isMobile = useIsMobile();
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {isMobile && (
            <header className="p-2 flex items-center justify-center backdrop-blur-md bg-white/30 border-b border-white/40 relative">
              <div className="absolute left-2">
                <SidebarTrigger className="p-2 rounded-full hover:bg-accent" />
              </div>

              <div className="flex gap-4 items-center">
                <img src={logo} alt="Logo" className="h-10 w-auto rounded-sm" />
                <h1 className="text-lg font-semibold">Sales Dashboard</h1>
              </div>
            </header>
          )}

          <div className="flex-1 overflow-y-auto p-4 pt-0">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
