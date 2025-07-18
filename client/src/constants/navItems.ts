import { User, Clock, CircleCheck, Notebook } from "lucide-react";
type ItemType = {
  title: string;
  url: string;
  icon: any;
  route?: string;
};

export const salesManNavItems: ItemType[] = [
  {
    title: "In Progress",
    url: "#",
    icon: Clock,
    route: "in-progress",
  },
  {
    title: "Completed",
    url: "#",
    icon: CircleCheck,
    route: "completed",
  },
  {
    title: "Stats",
    url: "#",
    icon: Notebook,
    route: "stats",
  },
  // { title: "Profile", url: "#", icon: User },
];

export const fulfilmentNavItems: ItemType[] = [
  {
    title: "Orders",
    url: "#",
    icon: Clock,
  },
  {
    title: "Completed",
    url: "#",
    icon: CircleCheck,
  },
];

export const adminNavItems: ItemType[] = [
  {
    title: "Salesman",
    url: "#",
    icon: Clock,
  },
  {
    title: "Stock Mangement",
    url: "#",
    icon: CircleCheck,
  },
  {
    title: "Bills",
    url: "#",
    icon: Notebook,
  },
  { title: "Profile", url: "#", icon: User },
];
