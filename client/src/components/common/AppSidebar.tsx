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
import { LoaderCircle, LogOut, UserRoundCog, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLogout } from "@/hooks/userHooks";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";
import Profile from "./Profile";

export default function AppSidebar() {
  const navigate = useNavigate();
  const { toggleSidebar, isMobile } = useSidebar();
  const [openProfile, setOpenProfile] = useState(false);

  const handleNavClick = (route?: string) => {
    navigate(route ?? "#");
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  const currRoute = useLocation().pathname.split("/")[1];

  const { isAdmin, isSalesman, isFulfillment } = useUserStore();

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
  const logoutMutation = useLogout();

  return (
    <>
      {openProfile && <Profile open={openProfile} setOpen={setOpenProfile} />}
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
          {(isAdmin || isSalesman) && (
            <SidebarGroup>
              <SidebarGroupLabel>Your Orders</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>{renderMenuItems(salesManNavItems)}</SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {(isAdmin || isFulfillment) && (
            <SidebarGroup>
              <SidebarGroupLabel>Fulfillment Panel</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>{renderMenuItems(fulfilmentNavItems)}</SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {isAdmin && (
            <SidebarGroup>
              <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>{renderMenuItems(adminNavItems)}</SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
          <SidebarGroup>
            <SidebarGroupLabel>Profile & Settings</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => {
                      setOpenProfile(true);
                      if (isMobile) toggleSidebar();
                    }}
                  >
                    <UserRoundCog />
                    Profile
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => {
                        if (
                          window.confirm("Are you sure you want to logout?")
                        ) {
                          logoutMutation.mutate();
                        }
                      }}
                      className="flex items-center gap-2 w-full p-2 text-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={logoutMutation.isPending}
                    >
                      {logoutMutation.isPending ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        <LogOut />
                      )}
                      <span>
                        {logoutMutation.isPending ? "Logging out..." : "Logout"}
                      </span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
