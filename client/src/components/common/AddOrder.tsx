import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import OrderFormDialog from "./OrderFormDialog";

const AddOrder = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <OrderFormDialog open={open} setOpen={setOpen} />
        </div>
      )}
      <Button
        type="button"
        size="lg"
        className="rounded-full"
        onClick={() => setOpen(true)}
      >
        <Plus />
        New Order
      </Button>
    </>
  );
};

export default AddOrder;
