import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import ShowOrders from "../common/ShowOrders";
import { useState } from "react";
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
import Loader from "../common/Loader";
import { useFetchOrders } from "@/hooks/orderHooks";
import { useIsMobile } from "@/hooks/use-mobile";

const AllOrders = () => {
  const isMobile = useIsMobile();
  const [groupBy, setGroupBy] = useState<"none" | "salesman" | "orderDate">(
    "none"
  );
  const [sortBy, setSortBy] = useState<
    "none" | "dateAsc" | "dateDesc" | "clientNameAsc" | "clientNameDesc"
  >("dateDesc");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Completed" | "In Progress" | "Not Started"
  >("All");
  const [showSearchBar, setShowSearchBar] = useState(false);

  const { data, isLoading, error } = useFetchOrders({ groupBy });

  if (isLoading) return <Loader />;
  if (error) return <div>Error occurred</div>;

  const groupedOrders = data;

  return (
    <div>
      <div className="w-full flex items-center gap-3 mb-2 sticky top-0 backdrop-blur-md bg-white/30 border-b border-white/40 z-10 py-2 overflow-scroll">
        {isMobile ? (
          <div
            className={`flex items-center gap-2 transition-all duration-300 ease-in-out ${
              showSearchBar ? "max-w-full flex-1" : "max-w-[40px]"
            }`}
          >
            {showSearchBar ? (
              <div className="relative flex-1">
                <Input
                  placeholder="Search orders..."
                  className="pr-8"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <X
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 cursor-pointer"
                  onClick={() => {
                    setShowSearchBar(false);
                    setSearchQuery("");
                  }}
                />
              </div>
            ) : (
              <Search
                className="text-gray-500 w-5 h-5 cursor-pointer"
                onClick={() => setShowSearchBar(true)}
              />
            )}
          </div>
        ) : (
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input
              placeholder="Search orders..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {(!isMobile || !showSearchBar) && (
          <div className="flex gap-2 w-full sm:w-auto transition-opacity duration-300">
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
                <SelectItem value="none">Group by</SelectItem>
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
                <SelectItem value="none">Sort by</SelectItem>
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
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Orders Display */}
      <div>
        {groupBy !== "none" ? (
          <Accordion type="single" collapsible className="w-full">
            {groupedOrders.map((group: any, groupIndex: any) => (
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
                  <ShowOrders
                    orders={group.orders}
                    filterStatus={filterStatus}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <ShowOrders
            orders={groupedOrders && groupedOrders[0].orders}
            filterStatus={filterStatus}
          />
        )}
      </div>
    </div>
  );
};

export default AllOrders;
