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
import { useNavigate } from "react-router-dom";

export default function AppSidebar() {
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();

  const handleNavClick = (route?: string) => {
    navigate(route ?? "#");
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  const renderMenuItems = (items: typeof salesManNavItems) =>
    items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
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
      <SidebarHeader>
        <div className="flex gap-5 items-center justify-center">
          <div className="w-20">
            <img src={logo} alt="logo" className="w-full" />
          </div>
          <div className="font-bold">DSPL</div>
        </div>
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
