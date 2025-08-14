import { useState } from "react";
// import { useOrderStore } from "@/store/useOrderStore";
// import type { Order } from "@/types/order";
import AddOrder from "../common/AddOrder";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
// import Fuse from "fuse.js";
import ShowOrders from "../common/ShowOrders";
import { useFetchOrders } from "@/hooks/orderHooks";
import Loader from "../common/Loader";
const Completed = () => {
  // const orders: Order[] = useOrderStore((state) => state.orders);
  const { data, isLoading, error } = useFetchOrders({
    salesmanId: "d25f6cd6-a798-437c-b9e7-61f4a9ce2fc3",
  });
  const [query, setQuery] = useState("");
  // const options = {
  //   useExtendedSearch: true,
  //   keys: [
  //     {
  //       name: "clientName",
  //       weight: 1,
  //     },
  //   ],
  // };
  // const fuse = useMemo(() => new Fuse(orders, options), [orders]);

  // const filteredOrder = query
  //   ? fuse.search(query).map((ele) => ele.item)
  //   : orders;

  if (isLoading) return <Loader />;
  if (error) return <div>Error occurred</div>;

  const filteredOrder = data;

  return (
    <div>
      <div className="w-full flex items-center justify-between gap-3 mb-2 sticky top-0  backdrop-blur-md bg-white/30 border-b border-white/40 z-10 py-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <Input
            placeholder="Search orders..."
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <AddOrder />
      </div>
      <ShowOrders orders={filteredOrder} filterStatus="Completed" />
    </div>
  );
};

export default Completed;
