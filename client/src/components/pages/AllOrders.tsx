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
  // Refined type for groupBy and sortBy states
  const [groupBy, setGroupBy] = useState<"none" | "salesman" | "orderDate">(
    "none"
  );
  const [sortBy, setSortBy] = useState<
    "none" | "dateAsc" | "dateDesc" | "clientNameAsc" | "clientNameDesc"
  >("dateDesc"); // Defaulting to newest date first
  const [searchQuery, setSearchQuery] = useState("");
  // New state for status filter
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Completed" | "In Progress" | "Not Started"
  >("All");

  const processedOrders = useMemo(() => {
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

    // 2. Status Filtering (New step)
    if (filterStatus !== "All") {
      currentOrders = currentOrders.filter(
        (order) => order.status === filterStatus
      );
    }

    // 3. Sorting
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
      return 0; // No specific sorting or sortBy is 'none'
    });

    return currentOrders;
  }, [orders, sortBy, searchQuery, filterStatus]); // Added filterStatus to dependencies

  const groupedOrders = useMemo(() => {
    if (groupBy === "none") {
      // Return a single group containing all processed orders
      return [{ groupKey: "All Orders", orders: processedOrders }];
    }

    const groups: { [key: string]: Order[] } = {};
    processedOrders.forEach((order) => {
      const key =
        groupBy === "salesman"
          ? order.salesManName || "Unassigned"
          : order.orderDate || "Unknown Date"; // Ensure 'orderDate' is used for date grouping
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(order);
    });

    const sortedGroupKeys = Object.keys(groups).sort((a, b) => {
      if (groupBy === "orderDate") {
        return new Date(a).getTime() - new Date(b).getTime();
      }
      return a.localeCompare(b);
    });

    return sortedGroupKeys.map((key) => ({
      groupKey: key,
      orders: groups[key],
    }));
  }, [processedOrders, groupBy]);

  // Determine the default value for the accordion (all items open if no grouping, or first group open)
  // const defaultAccordionValue =
  //   groupBy === "none"
  //     ? ["All Orders"]
  //     : groupedOrders.length > 0
  //     ? [groupedOrders[0].groupKey]
  //     : [];

  return (
    <div className="px-3 mt-2 pt-14 ">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <Input
            placeholder="Search orders..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Select
            onValueChange={(value: "none" | "salesman" | "orderDate") =>
              setGroupBy(value)
            }
            value={groupBy}
          >
            <SelectTrigger className="w-[180px] sm:max-w-1/3">
              <SelectValue placeholder="Group by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">- Group by -</SelectItem>
              <SelectItem value="salesman">Salesman</SelectItem>
              <SelectItem value="orderDate">Date</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(
              value:
                | "none"
                | "dateAsc"
                | "dateDesc"
                | "clientNameAsc"
                | "clientNameDesc"
            ) => setSortBy(value)}
            value={sortBy}
          >
            <SelectTrigger className="w-[180px] sm:max-w-1/3">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">- Sort by -</SelectItem>
              <SelectItem value="dateAsc">Date (Oldest First)</SelectItem>
              <SelectItem value="dateDesc">Date (Newest First)</SelectItem>
              <SelectItem value="clientNameAsc">Client (A-Z)</SelectItem>
              <SelectItem value="clientNameDesc">Client (Z-A)</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(
              value: "All" | "Completed" | "In Progress" | "Not Started"
            ) => setFilterStatus(value)}
            value={filterStatus}
          >
            <SelectTrigger className="w-[180px] sm:max-w-1/3">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Not Started">Not Started</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        {groupBy !== "none" ? (
          <Accordion type="single" collapsible className="w-full">
            {groupedOrders.map((group, groupIndex) => (
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
          <ShowOrders orders={groupedOrders[0].orders} />
        )}
      </div>
    </div>
  );
};

export default AllOrders;
