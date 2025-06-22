import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const AddOrder = () => {
  const isMobile = useIsMobile();
  return (
    <div className="fixed bottom-20 right-10">
      <Button size="lg" className="rounded-full">
        <Plus />
        New Order
      </Button>
    </div>
  );
};

export default AddOrder;
