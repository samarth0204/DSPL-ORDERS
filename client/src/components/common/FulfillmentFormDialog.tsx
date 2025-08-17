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
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { fulfillmentSchema } from "@/constants/schema";
import { z } from "zod";
import {
  useAddFulfillment,
  useEditFulfillment,
} from "@/hooks/fulfillmentHooks";

interface FulfillmentFormDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  order: Order;
  fulfillment?: any;
}

type FulfillmentFormValues = z.infer<typeof fulfillmentSchema>;

const FulfillmentFormDialog = ({
  open,
  setOpen,
  order,
  fulfillment,
}: FulfillmentFormDialogProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FulfillmentFormValues>({
    resolver: zodResolver(fulfillmentSchema),
    defaultValues: {
      billNumber: "",
      amount: "",
      date: new Date(),
      description: "",
      fulfilledProducts: [],
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const { fields } = useFieldArray({
    control,
    name: "fulfilledProducts",
  });

  useEffect(() => {
    if (open) {
      if (fulfillment) {
        reset({
          billNumber: fulfillment.billNumber,
          amount: String(fulfillment.amount),
          date: new Date(fulfillment.date),
          description: fulfillment.description || "",
          fulfilledProducts: fulfillment.fulfilledProducts.map((fp: any) => ({
            productId: fp.productId,
            quantity: fp.quantity,
          })),
        });
      } else if (order?.products?.length) {
        reset({
          billNumber: "",
          amount: "",
          date: new Date(),
          description: "",
          fulfilledProducts: order.products.map((p) => ({
            productId: p.id,
            quantity: 0,
          })),
        });
      }
    }
  }, [open, fulfillment, order, reset]);

  const handleClose = (shouldOpen: boolean) => {
    if (!shouldOpen) {
      const confirmClose = window.confirm(
        "You have unsaved changes. Are you sure you want to discard them?"
      );
      if (!confirmClose) return;
      reset();
    }
    setOpen(shouldOpen);
  };
  const addFulfillmentMutation = useAddFulfillment();
  const editFulfillmentMutation = useEditFulfillment();
  const onSubmit = (data: any) => {
    const payload = { ...data, orderId: order.id };

    if (fulfillment) {
      // Editing
      editFulfillmentMutation.mutate(
        { id: fulfillment.id, ...payload },
        {
          onSuccess: () => {
            reset();
            setOpen(false);
          },
        }
      );
    } else {
      // Adding new
      addFulfillmentMutation.mutate(payload, {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-full md:max-w-[700px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Bill</DialogTitle>
          <DialogDescription>Order id# {order.id}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <FormInput
              label="Bill Number"
              placeholder="Enter Bill Number"
              {...register("billNumber")}
              error={errors.billNumber?.message}
            />
            <FormInput
              label="Amount"
              placeholder="Enter bill amount"
              {...register("amount")}
              error={errors.amount?.message}
            />
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Pick Bill date"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <FormTextArea
              label="Description"
              placeholder="Enter bill description"
              {...register("description")}
              error={errors.description?.message}
            />
          </div>

          {fields.length > 0 && (
            <div className="mt-4">
              <div className="font-semibold mb-2">Products</div>
              <div className="space-y-3">
                {fields.map((field, index) => {
                  const product = order.products[index];

                  // Calculate fulfilled quantity
                  const fulfilledQty =
                    order.fulfillments?.reduce((total, f) => {
                      const match = f.fulfilledProducts?.find(
                        (fp) => fp.id === product.id
                      );
                      return total + (match?.quantity || 0);
                    }, 0) || 0;

                  const remainingQty = Number(product.quantity) - fulfilledQty;

                  return (
                    <div
                      key={field.id}
                      className="flex items-center justify-between gap-4 border-b pb-2"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{product.name}</span>
                        <span className="text-xs text-gray-500">
                          {product.size} • Ordered: {product.quantity}{" "}
                          {product.orderBy}
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
                          {...register(`fulfilledProducts.${index}.quantity`, {
                            valueAsNumber: true,
                          })}
                          error={
                            errors.fulfilledProducts?.[index]?.quantity?.message
                          }
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
