import type { Order } from "@/types/order";
import OrderCard from "./OrderCard";

type ShowOrdersProps = {
  orders: Order[];
};

const ShowOrders = ({ orders }: ShowOrdersProps) => {
  return (
    <div className="flex flex-col gap-2">
      {orders.map((order, index) => (
        <OrderCard key={index} order={order} />
      ))}
    </div>
  );
};

export default ShowOrders;
