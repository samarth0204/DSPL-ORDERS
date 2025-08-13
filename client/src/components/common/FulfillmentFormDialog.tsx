import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormInput from "./FormInput";
import DatePicker from "./DatePicker";
import { Button } from "../ui/button";
import FormTextArea from "./FormTextArea";
import type { Order } from "@/types/order";

interface FulfillmentFormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  order: Order;
}

const FulfillmentFormDialog = ({
  open,
  setOpen,
  order,
}: FulfillmentFormDialogProps) => {
  const handleOpenChange = (shouldOpen: boolean) => {
    if (!shouldOpen) {
      const confirmClose = window.confirm(
        "You have unsaved changes. Are you sure you want to discard them?"
      );
      if (!confirmClose) return;
    }
    setOpen(shouldOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-full md:max-w-[700px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Bill</DialogTitle>
          <DialogDescription>Order id# {order.id}</DialogDescription>
        </DialogHeader>

        <form onSubmit={(e) => e.preventDefault()}>
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <FormInput label="Bill Number" placeholder="Enter Bill Number" />
            <FormInput label="Amount" placeholder="Enter bill amount" />
            <DatePicker label="Pick Bill date" />
            <FormTextArea
              label="Description"
              placeholder="Enter bill description"
            />
          </div>

          {/* Product List */}
          {order.products && order.products.length > 0 && (
            <div className="mt-4">
              <div className="font-semibold mb-2">Products</div>
              <div className="space-y-3">
                {order.products.map((p) => {
                  // Calculate fulfilled quantity
                  const fulfilledQty =
                    order.fulfillments?.reduce((total, f) => {
                      const match = f.fulfilledProducts?.find(
                        (fp) => fp.id === p.id
                      );
                      return total + (match?.quantity || 0);
                    }, 0) || 0;

                  const remainingQty = Number(p.quantity) - fulfilledQty;

                  return (
                    <div
                      key={p.id}
                      className="flex items-center justify-between gap-4 border-b pb-2"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{p.name}</span>
                        <span className="text-xs text-gray-500">
                          {p.size} • Ordered: {p.quantity} {p.orderBy}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <FormInput
                          label=""
                          type="number"
                          min={0}
                          max={remainingQty}
                          className="border rounded px-2 py-1 w-20"
                          placeholder="Qty"
                          disabled={remainingQty <= 0}
                        />
                        <span className="text-xs text-gray-500">
                          Remaining: {remainingQty}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Save Button */}
          <Button className="w-full mt-4" type="submit">
            Save Bill
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FulfillmentFormDialog;
