import type { Order } from "@/types/order";
import OrderCard from "./OrderCard";

type ShowOrdersProps = {
  orders: Order[];
  filterStatus?: "All" | string | string[];
};

const ShowOrders = ({ orders, filterStatus = "All" }: ShowOrdersProps) => {
  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) =>
          Array.isArray(filterStatus)
            ? filterStatus.includes(order.status)
            : order.status === filterStatus
        );

  return (
    <div className="flex flex-col gap-2">
      {filteredOrders.map((order, index) => (
        <OrderCard key={index} order={order} />
      ))}
    </div>
  );
};

export default ShowOrders;
