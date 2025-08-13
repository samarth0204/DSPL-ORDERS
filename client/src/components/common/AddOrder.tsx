import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import OrderFormDialog from "./OrderFormDialog";

const AddOrder = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <OrderFormDialog open={open} setOpen={setOpen} />
        </div>
      )}
      {!open && (
        <div>
          <Button
            size="lg"
            className="rounded-full"
            onClick={() => setOpen(true)}
          >
            <Plus />
            New Order
          </Button>
        </div>
      )}
    </>
  );
};

export default AddOrder;
