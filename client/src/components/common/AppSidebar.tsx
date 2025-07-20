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
  SidebarProvider,
} from "@/components/ui/sidebar";
import logo from "../../static/logo.jpg";

import {
  adminNavItems,
  fulfilmentNavItems,
  salesManNavItems,
} from "@/constants/navItems";
import { Link } from "react-router-dom";

export default function AppSidebar() {
  return (
    <SidebarProvider>
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
          {/* <SidebarGroup>
            <SidebarGroupLabel>Salesman Name</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {salesManNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup> */}
          <SidebarGroup>
            <SidebarGroupLabel>Fulfillment Panel</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {fulfilmentNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.route ?? "#"}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Admin Panal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.route ?? "#"}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
