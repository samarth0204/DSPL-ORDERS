import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import AddNewOrder from "./AddNewOrder";

const AddOrder = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <AddNewOrder open={open} setOpen={setOpen} />
        </div>
      )}
      {!open && (
        <div className="fixed bottom-20 right-10">
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
