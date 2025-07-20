import type { Order } from "@/types/order";
import OrderCard from "./OrderCard";

const ShowOrders = ({
  filteredOrder,
  showCompleted,
}: {
  filteredOrder: Order[];
  showCompleted: boolean;
}) => {
  const data = showCompleted
    ? filteredOrder.filter((ele) => ele.status === "Completed")
    : filteredOrder.filter((ele) => ele.status !== "Completed");
  return (
    <>
      {data.map((order, index) => (
        <OrderCard key={index} order={order} />
      ))}
    </>
  );
};

export default ShowOrders;
