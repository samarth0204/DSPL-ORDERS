import type { Order } from "@/types/order";
import OrderCard from "./OrderCard";

const ShowOrders = ({
  orders,
  showCompleted,
}: {
  orders: Order[];
  showCompleted?: boolean;
}) => {
  const filteredOrders =
    showCompleted === undefined
      ? orders
      : orders.filter((order) =>
          showCompleted
            ? order.status === "Completed"
            : order.status !== "Completed"
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
