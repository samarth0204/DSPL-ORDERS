import { useOrderStore } from "@/store/useOrderStore";
const InProgress = () => {
  const orders = useOrderStore((state) => state.orders);
  return <div>{orders.length}</div>;
};

export default InProgress;
