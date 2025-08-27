import { Clock, CircleCheck, Notebook, ChartBarBig, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
type ItemType = {
  title: string;
  icon: LucideIcon;
  route?: string;
};

export const salesManNavItems: ItemType[] = [
  {
    title: "In Progress",
    icon: Clock,
    route: "in-progress",
  },
  {
    title: "Completed",
    icon: CircleCheck,
    route: "completed",
  },
  // {
  //   title: "Stats",
  //   icon: Notebook,
  //   route: "stats",
  // },
  // { title: "Profile", url: "#", icon: User },
];

export const fulfilmentNavItems: ItemType[] = [
  {
    title: "All Orders",
    icon: Clock,
    route: "all-orders",
  },
  {
    title: "Bills",
    icon: Notebook,
    route: "bills",
  },
  {
    title: "Stats",
    icon: ChartBarBig,
    route: "stats",
  },
];

export const adminNavItems: ItemType[] = [
  {
    title: "Users",
    icon: Users,
    route: "users",
  },
  // {
  //   title: "Stock Mangement",
  //   icon: CircleCheck,
  // },
];
