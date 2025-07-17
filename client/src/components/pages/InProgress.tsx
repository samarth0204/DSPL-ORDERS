import { useOrderStore } from "@/store/useOrderStore";
import OrderCard from "../common/OrderCard";
import type { Order } from "@/types/order";
const InProgress = () => {
  const orders: Order[] = useOrderStore((state) => state.orders);
  console.log(orders);
  return (
    <div className="px-3 pb-24 pt-14">
      {orders.map((order, index) => {
        return <OrderCard key={index} order={order} />;
      })}
    </div>
  );
};

export default InProgress;
