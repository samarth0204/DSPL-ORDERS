import { Button } from "@/components/ui/button";
// import { Clock, CircleCheck, Notebook } from "lucide-react";
import { salesManNavItems } from "@/constants/navItems";
function BottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 w-full h-14 bg-white border-t shadow-md z-50  grid grid-cols-4 divide-x-2">
      {salesManNavItems.map((item) => (
        <Button
          key={item.title}
          variant="ghost"
          size="sm"
          className="w-full h-full rounded-none"
        >
          <item.icon />
          {item.title}
        </Button>
      ))}
    </div>
  );
}

export default BottomNavbar;
