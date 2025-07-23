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
} from "../ui/accordion"; // Assuming you have your shadcn/ui Accordion here
import type { Order } from "@/types/order"; // Import the Order type

const AllOrders = () => {
  const orders = useOrderStore((state) => state.orders);
  const [groupBy, setGroupBy] = useState("none"); // Initialize with "none"
  const [sortBy, setSortBy] = useState("none"); // Initialize with "none"
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
      // Only apply sorting if sortBy is not "none"
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
        return 0; // Should not be reached
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

      // Sort group keys for consistent display
      const sortedGroupKeys = Object.keys(grouped).sort((a, b) => {
        if (groupBy === "orderDate") {
          return new Date(a).getTime() - new Date(b).getTime(); // Sort dates chronologically
        }
        return a.localeCompare(b); // Sort salesman names alphabetically
      });

      return sortedGroupKeys.map((key) => ({
        groupKey: key,
        orders: grouped[key],
      }));
    }

    // If no grouping (i.e., groupBy is "none"), return a single group with all orders
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
        {/* Use Accordion only when grouping is active */}
        {groupBy !== "none" ? (
          // Accordion type="multiple" can be used if you want multiple groups open
          <Accordion type="single" collapsible className="w-full">
            {filteredAndGroupedOrders.map((group, groupIndex) => (
              <AccordionItem
                key={groupIndex}
                value={`item-${groupIndex}`}
                className="mb-2 border-0"
              >
                <AccordionTrigger className="text-lg capitalize bg-gray-100 p-3 ">
                  {groupBy === "salesman"
                    ? `Salesman: ${group.groupKey}`
                    : `Date: ${group.groupKey}`}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    <ShowOrders orders={group.orders} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          // If no grouping, display all orders in a single grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 col-span-full">
            <ShowOrders orders={filteredAndGroupedOrders[0].orders} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
