import { Search } from "lucide-react";
import AddOrder from "../common/AddOrder";
import BillCard from "../common/BillCard";
import { Input } from "../ui/input";

const Bills = () => {
  return (
    <div className="px-3 mt-2 pt-14 ">
      <div className="w-full flex items-center justify-between gap-3 mb-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <Input
            placeholder="Search orders..."
            className="pl-10"
            // value={query}
            // onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <AddOrder />
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-2">
        <BillCard />
      </div>
    </div>
  );
};

export default Bills;
