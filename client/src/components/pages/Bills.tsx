import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import BillCard from "../common/BillCard";
import { Input } from "../ui/input";
import { dummyFulfillments } from "@/constants/data";
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

const Bills = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupBy, setGroupBy] = useState<"date" | "order" | "none">("none");
  const [sortBy, setSortBy] = useState<
    "amountAsc" | "amountDesc" | "dateAsc" | "dateDesc" | "none"
  >("none");
  const [filterStatus, setFilterStatus] = useState<"All" | "Paid" | "Pending">(
    "All"
  );

  const filteredAndSortedFulfillments = useMemo(() => {
    let result = [...dummyFulfillments];

    // 1. Filter by Search Term (if any)
    if (searchTerm) {
      result = result.filter(
        (f) =>
          f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.fulfilledProducts.some(
            (p) =>
              p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              p.size.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // 2. Filter by Status
    if (filterStatus !== "All") {
      result = result.filter((f) => f.status === filterStatus);
    }

    // 3. Sort
    result.sort((a, b) => {
      if (sortBy === "amountAsc") {
        return a.amount - b.amount;
      } else if (sortBy === "amountDesc") {
        return b.amount - a.amount;
      } else if (sortBy === "dateAsc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "dateDesc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

    return result;
  }, [dummyFulfillments, searchTerm, filterStatus, sortBy]);

  const groupedFulfillments = useMemo(() => {
    if (groupBy === "none") {
      // If no grouping, treat all fulfillments as a single "group" for consistent rendering
      return { "All Fulfillments": filteredAndSortedFulfillments };
    }

    const groups: { [key: string]: typeof dummyFulfillments } = {};
    filteredAndSortedFulfillments.forEach((f) => {
      const key = groupBy === "date" ? f.date : f.orderId;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(f);
    });
    return groups;
  }, [filteredAndSortedFulfillments, groupBy]);

  // Determine the default value for the accordion (all items open if no grouping, or first group open)
  const defaultAccordionValue =
    groupBy === "none"
      ? ["All Fulfillments"] // If no grouping, ensure the single "All Fulfillments" item is open
      : Object.keys(groupedFulfillments).length > 0
      ? [Object.keys(groupedFulfillments)[0]] // Open the first group by default
      : []; // No groups, nothing to open
  return (
    <div className="px-3 mt-2 pt-14">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
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
              <SelectItem value="none">- Group by -</SelectItem>
              <SelectItem value="date">Group by Date</SelectItem>
              <SelectItem value="order">Group by Order ID</SelectItem>
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
              <SelectItem value="none">- Sort by -</SelectItem>
              <SelectItem value="amountDesc">Amount (High to Low)</SelectItem>
              <SelectItem value="amountAsc">Amount (Low to High)</SelectItem>
              <SelectItem value="dateDesc">Date (Newest First)</SelectItem>
              <SelectItem value="dateAsc">Date (Oldest First)</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter by Status Selector */}
          <Select
            value={filterStatus}
            onValueChange={(value: "All" | "Paid" | "Pending") =>
              setFilterStatus(value)
            }
          >
            <SelectTrigger className="w-[180px] sm:max-w-1/3">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Accordion for Grouped Fulfillments */}
      <div>
        {groupBy !== "none" ? (
          <Accordion
            type="multiple"
            defaultValue={defaultAccordionValue}
            className="w-full"
          >
            {Object.entries(groupedFulfillments).map(
              ([groupKey, fulfillmentsInGroup]) => (
                <AccordionItem
                  value={groupKey}
                  key={groupKey}
                  className="mb-2 border-0"
                >
                  <AccordionTrigger className="text-lg capitalize bg-gray-100 p-3">
                    {groupKey} ({fulfillmentsInGroup.length})
                  </AccordionTrigger>
                  <AccordionContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 py-2">
                    {fulfillmentsInGroup.map((f) => (
                      <BillCard key={f.id} f={f} />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 py-2">
            {filteredAndSortedFulfillments.map((f) => (
              <BillCard f={f} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bills;
