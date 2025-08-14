import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Import Accordion components
import { useFetchFulfillments } from "@/hooks/fulfillmentHooks";
import Loader from "../common/Loader";
import ShowFulfillments from "../common/ShowFulfillments";

const Bills = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupBy, setGroupBy] = useState<"date" | "order" | "none">("none");
  const [sortBy, setSortBy] = useState<
    "amountAsc" | "amountDesc" | "dateAsc" | "dateDesc" | "none"
  >("none");
  const [filterStatus, setFilterStatus] = useState<"All" | "PAID" | "PENDING">(
    "All"
  );
  //   if (groupBy === "none") {
  //     // If no grouping, treat all fulfillments as a single "group" for consistent rendering
  //     return { "All Fulfillments": filteredAndSortedFulfillments };
  //   }

  //   const groups: { [key: string]: typeof dummyFulfillments } = {};
  //   filteredAndSortedFulfillments.forEach((fulfillment) => {
  //     const key = groupBy === "date" ? fulfillment.date : fulfillment.orderId;
  //     if (!groups[key]) {
  //       groups[key] = [];
  //     }
  //     groups[key].push(fulfillment);
  //   });
  //   return groups;
  // }, [filteredAndSortedFulfillments, groupBy]);

  const { data, isLoading, error } = useFetchFulfillments({ groupBy });
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error occured</div>;
  }
  const groupedFulfillments = data;

  return (
    <div className="px-3 mt-2 pt-14 md:pt-0">
      <div className="w-full flex items-center justify-between gap-3 mb-2 sticky top-14 md:top-0  backdrop-blur-md bg-white/30 border-b border-white/40 z-10 py-2">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <Input
            placeholder="Search fulfillments..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {/* Group By Selector */}
          <Select
            value={groupBy}
            onValueChange={(value: "date" | "order" | "none") =>
              setGroupBy(value)
            }
          >
            <SelectTrigger className="w-[180px] sm:max-w-1/3">
              <SelectValue placeholder="Group By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">
                <p className="text-sm text-muted-foreground">Group by</p>
              </SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="order">Order ID</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort By Selector */}
          <Select
            value={sortBy}
            onValueChange={(
              value:
                | "amountAsc"
                | "amountDesc"
                | "dateAsc"
                | "dateDesc"
                | "none"
            ) => setSortBy(value)}
          >
            <SelectTrigger className="w-[180px] sm:max-w-1/3">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">
                <p className="text-sm text-muted-foreground">Sort by</p>
              </SelectItem>
              <SelectItem value="amountDesc">Amount (High to Low)</SelectItem>
              <SelectItem value="amountAsc">Amount (Low to High)</SelectItem>
              <SelectItem value="dateDesc">Date (Newest First)</SelectItem>
              <SelectItem value="dateAsc">Date (Oldest First)</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter by Status Selector */}
          <Select
            value={filterStatus}
            onValueChange={(value: "All" | "PAID" | "PENDING") =>
              setFilterStatus(value)
            }
          >
            <SelectTrigger className="w-[180px] sm:max-w-1/3">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">
                <p className="text-sm text-muted-foreground">Status</p>
              </SelectItem>
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Accordion for Grouped Fulfillments */}
      {groupBy !== "none" ? (
        <Accordion type="single" collapsible className="w-full">
          {groupedFulfillments.map(
            (
              group: { groupKey: string; fulfillments: any[] },
              groupIndex: number
            ) => (
              <AccordionItem
                key={groupIndex}
                value={`item-${groupIndex}`}
                className="mb-2 border-0"
              >
                <AccordionTrigger className="text-lg capitalize bg-gray-100 p-3">
                  {groupBy === "order"
                    ? `Order: ${group.groupKey}`
                    : `Date: ${group.groupKey}`}
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                  <ShowFulfillments
                    fulfillments={group.fulfillments}
                    filterStatus={filterStatus}
                  />
                </AccordionContent>
              </AccordionItem>
            )
          )}
        </Accordion>
      ) : (
        <ShowFulfillments
          fulfillments={
            groupedFulfillments && groupedFulfillments[0]?.fulfillments
          }
          filterStatus={filterStatus}
        />
      )}
    </div>
  );
};

export default Bills;
