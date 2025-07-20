import { useMemo, useState } from "react";
import { useOrderStore } from "@/store/useOrderStore";
import type { Order } from "@/types/order";
import AddOrder from "../common/AddOrder";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import Fuse from "fuse.js";
import ShowOrders from "../common/ShowOrders";
const Completed = () => {
  const orders: Order[] = useOrderStore((state) => state.orders);
  const [query, setQuery] = useState("");
  const options = {
    useExtendedSearch: true,
    keys: [
      {
        name: "clientName",
        weight: 1,
      },
    ],
  };
  const fuse = useMemo(() => new Fuse(orders, options), [orders]);

  const filteredOrder = query
    ? fuse.search(query).map((ele) => ele.item)
    : orders;

  return (
    <div className="px-3 mt-2 pt-14 ">
      <div className="w-full flex items-center justify-between gap-3 mb-2">
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
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-2">
        <ShowOrders filteredOrder={filteredOrder} showCompleted={true} />
      </div>
    </div>
  );
};

export default Completed;
