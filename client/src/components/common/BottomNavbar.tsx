import { Button } from "@/components/ui/button";
import { salesManNavItems } from "@/constants/navItems";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils"; // optional: if using class name merging utility

function BottomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 w-full h-14 bg-white border-t shadow-md z-50 grid grid-cols-2 divide-x-2">
      {salesManNavItems.map((item) => {
        const isActive = location.pathname.slice(1) === item.route;
        return (
          <Button
            key={item.title}
            variant="ghost"
            size="sm"
            className={cn(
              "w-full h-full flex flex-col items-center justify-center",
              isActive && "border-2 border-blue-600 bg-blue-50"
            )}
            onClick={() => item.route && navigate(item.route)}
          >
            <item.icon className={cn("text-xl", isActive && "text-blue-600")} />
            <span className="text-xs">{item.title}</span>
          </Button>
        );
      })}
    </div>
  );
}

export default BottomNavbar;
