import { User, Clock, CircleCheck, Notebook, ChartBarBig } from "lucide-react";
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
  {
    title: "Stats",
    icon: Notebook,
    route: "stats",
  },
  // { title: "Profile", url: "#", icon: User },
];

export const fulfilmentNavItems: ItemType[] = [
  {
    title: "In Progress Orders",
    icon: Clock,
    route: "in-progress",
  },
  {
    title: "Completed",
    icon: CircleCheck,
    route: "completed",
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
    title: "Salesman",
    icon: Clock,
  },
  // {
  //   title: "Stock Mangement",
  //   icon: CircleCheck,
  // },
  { title: "Profile", icon: User },
];
