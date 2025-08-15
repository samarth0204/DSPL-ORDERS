import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import logo from "../../static/logo.jpg";
import {
  adminNavItems,
  fulfilmentNavItems,
  salesManNavItems,
} from "@/constants/navItems";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AppSidebar() {
  const navigate = useNavigate();
  const { toggleSidebar, isMobile } = useSidebar();

  const handleNavClick = (route?: string) => {
    navigate(route ?? "#");
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  const currRoute = useLocation().pathname.split("/")[1];

  const renderMenuItems = (items: typeof salesManNavItems) =>
    items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton
          asChild
          className={cn(currRoute === item.route && "bg-gray-200")}
        >
          <button
            onClick={() => handleNavClick(item.route)}
            className="flex items-center gap-2 w-full p-2 text-sm hover:bg-accent"
          >
            <item.icon />
            <span>{item.title}</span>
          </button>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));

  return (
    <Sidebar>
      <SidebarHeader className="relative">
        <div className="flex gap-5 items-center justify-center">
          <div className="w-20">
            <img src={logo} alt="logo" className="w-full" />
          </div>
          <div className="font-bold">DSPL</div>
        </div>
        {isMobile && (
          <div
            className="absolute top-1 right-1 hover:bg-accent rounded-full p-2"
            onClick={() => toggleSidebar()}
          >
            <X />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Your Orders</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(salesManNavItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Fulfillment Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(fulfilmentNavItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(adminNavItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
