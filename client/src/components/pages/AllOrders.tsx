import { Search } from "lucide-react";
import { Input } from "../ui/input";
import ShowOrders from "../common/ShowOrders";
import { useOrderStore } from "@/store/useOrderStore";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import type { Order } from "@/types/order";

const AllOrders = () => {
  const orders = useOrderStore((state) => state.orders);
  const [groupBy, setGroupBy] = useState("none");
  const [sortBy, setSortBy] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAndGroupedOrders = useMemo(() => {
    let currentOrders = [...orders];

    // 1. Search Filtering
    if (searchQuery) {
      currentOrders = currentOrders.filter(
        (order) =>
          order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.deliveryDetails
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.products.some((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          order.salesManName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. Sorting
    if (sortBy !== "none") {
      currentOrders.sort((a, b) => {
        if (sortBy === "dateAsc") {
          return (
            new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
          );
        } else if (sortBy === "dateDesc") {
          return (
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          );
        } else if (sortBy === "clientNameAsc") {
          return a.clientName.localeCompare(b.clientName);
        } else if (sortBy === "clientNameDesc") {
          return b.clientName.localeCompare(a.clientName);
        }
        return 0;
      });
    }

    // 3. Grouping
    if (
      groupBy !== "none" &&
      (groupBy === "salesman" || groupBy === "orderDate")
    ) {
      const grouped = currentOrders.reduce(
        (acc: { [key: string]: Order[] }, order) => {
          const key =
            groupBy === "salesman"
              ? order.salesManName || "Unassigned"
              : order.orderDate || "Unknown Date";
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(order);
          return acc;
        },
        {}
      );

      const sortedGroupKeys = Object.keys(grouped).sort((a, b) => {
        if (groupBy === "orderDate") {
          return new Date(a).getTime() - new Date(b).getTime();
        }
        return a.localeCompare(b);
      });

      return sortedGroupKeys.map((key) => ({
        groupKey: key,
        orders: grouped[key],
      }));
    }

    return [{ groupKey: "All Orders", orders: currentOrders }];
  }, [orders, groupBy, sortBy, searchQuery]);

  return (
    <div className="px-3 mt-2 pt-14 ">
      <div className="w-full flex items-center justify-between gap-3 mb-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <Input
            placeholder="Search..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select onValueChange={setGroupBy} value={groupBy}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Group by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">- Group by -</SelectItem>
            <SelectItem value="salesman">Salesman</SelectItem>
            <SelectItem value="orderDate">Date</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setSortBy} value={sortBy}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">- Sort by -</SelectItem>
            <SelectItem value="dateAsc">Date (Asc)</SelectItem>
            <SelectItem value="dateDesc">Date (Desc)</SelectItem>
            <SelectItem value="clientNameAsc">Client (A-Z)</SelectItem>
            <SelectItem value="clientNameDesc">Client (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        {groupBy !== "none" ? (
          <Accordion type="single" collapsible className="w-full">
            {filteredAndGroupedOrders.map((group, groupIndex) => (
              <AccordionItem
                key={groupIndex}
                value={`item-${groupIndex}`}
                className="mb-2 border-0"
              >
                <AccordionTrigger className="text-lg capitalize bg-gray-100 p-3">
                  {groupBy === "salesman"
                    ? `Salesman: ${group.groupKey}`
                    : `Date: ${group.groupKey}`}
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                  <ShowOrders orders={group.orders} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <ShowOrders orders={filteredAndGroupedOrders[0].orders} />
        )}
      </div>
    </div>
  );
};

export default AllOrders;
