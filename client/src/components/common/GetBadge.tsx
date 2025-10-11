import { BadgeCheck, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import type { Order } from "@/types/order";

const GetBadge = ({ order }: { order: Order }) => {
  if (order.status === "Completed") {
    return (
      <Badge
        variant="secondary"
        className="bg-green-700 text-white dark:bg-blue-600"
      >
        <BadgeCheck />
        Completed
      </Badge>
    );
  }
  const createdAtMs = order.createdAt ? new Date(order.createdAt).getTime() : 0;
  const diffMinutes = Math.floor((Date.now() - createdAtMs) / (1000 * 60));
  if (diffMinutes >= 5) {
    return (
      <Badge
        variant="secondary"
        className="bg-yellow-500 text-white dark:bg-blue-600"
      >
        <Clock />
        In Progress
      </Badge>
    );
  }
  return <Badge variant="destructive">Not Started</Badge>;
};

export default GetBadge;
