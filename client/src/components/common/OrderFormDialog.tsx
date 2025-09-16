import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Trash, Plus } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { orderSchema } from "@/constants/schema";
import FormInput from "./FormInput";
import { useRef } from "react";
import FormSelect from "./FormSelect";
import { useEditOrder, useAddOrder } from "@/hooks/orderHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  order?: any;
};

const OrderFormDialog: React.FC<Props> = ({ open, setOpen, order }) => {
  const productListRef = useRef<HTMLDivElement>(null);
  const isEdit = Boolean(order);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      products: [],
      clientName: "",
      deliveryDetails: "",
      description: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });

  useEffect(() => {
    if (isEdit) {
      reset(order);
    } else {
      reset({
        products: [],
        clientName: "",
        deliveryDetails: "",
        description: "",
      });
    }
  }, [isEdit, order, reset]);

  const { fields, prepend, remove, replace } = useFieldArray({
    control,
    name: "products",
  });

  const addOrderMutation = useAddOrder();
  const editOrderMutation = useEditOrder();

  const onSubmit = (data: any) => {
    if (isEdit) {
      editOrderMutation.mutate(
        { ...order, ...data },
        {
          onSuccess: () => {
            reset();
            setOpen(false);
          },
        }
      );
    } else {
      const newOrder = {
        ...data,
        orderDate: new Date(),
        salesmanId: localStorage.getItem("id"),
        status: "Not Started",
      };
      addOrderMutation.mutate(newOrder, {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      });
    }
  };

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

  const handleAddProduct = () => {
    prepend({
      name: "",
      size: "",
      orderBy: "Kg",
      quantity: 1,
      rate: "",
    });
    setTimeout(() => {
      if (productListRef.current) {
        productListRef.current.scrollLeft = 0;
      }
    }, 0);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-full md:max-w-[700px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{order ? "Edit Order" : "Add Order"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <div className="flex items-center justify-between md:justify-end">
              <Button
                variant="outline"
                onClick={() => handleAddProduct()}
                size="sm"
              >
                <Plus />
                Add Product
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => replace([])}
                disabled={fields.length === 0}
                className="text-red-500 hover:text-red-600"
              >
                <Trash className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </div>

            {fields.length === 0 && (
              <p className="text-sm text-muted-foreground italic">
                No product selected.
              </p>
            )}
            {errors.products?.message && (
              <p className="text-sm text-red-500 font-medium">
                {errors.products.message}
              </p>
            )}

            <div
              className="max-h-[400px] md:max-h-[220px] max-w-[88vw] px-1 rounded-xl overflow-x-scroll md:overflow-x-hidden md:overflow-y-auto flex md:block gap-2 space-x-2 md:space-x-0 md:space-y-2"
              ref={productListRef}
            >
              <AnimatePresence>
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative grid grid-cols-3 min-w-[350px] md:min-w-0 gap-2 border border-gray-300 bg-gray-50 p-4 rounded-xl shadow-sm my-4"
                  >
                    <div className="absolute -top-3 left-2 text-sm text-gray-500 bg-white px-1 rounded flex items-center gap-2">
                      {fields.length - index}
                    </div>
                    <div className="absolute -top-3 right-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-1 w-6 h-6"
                        aria-label="Remove product"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                    </div>
                    <FormInput
                      label="Product Name"
                      placeholder="Enter Product Name"
                      {...register(`products.${index}.name`)}
                      error={errors.products?.[index]?.name?.message}
                    />

                    <FormInput
                      label="Size"
                      placeholder="Enter Size"
                      {...register(`products.${index}.size`)}
                      error={errors.products?.[index]?.size?.message}
                    />

                    <FormInput
                      label="Quantity"
                      placeholder="Enter quantity"
                      {...register(`products.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                      error={errors.products?.[index]?.quantity?.message}
                    />

                    <FormSelect
                      label="Order By"
                      value={watch(`products.${index}.orderBy`) ?? ""}
                      onChange={(value) =>
                        setValue(`products.${index}.orderBy`, value, {
                          shouldValidate: true,
                        })
                      }
                      options={["Pcs", "Kg", "Bag"]}
                      placeholder="Select"
                      error={errors.products?.[index]?.orderBy?.message}
                    />

                    <FormInput
                      label="Custom rate"
                      placeholder="Enter custom rate"
                      {...register(`products.${index}.rate`)}
                      error={errors.products?.[index]?.rate?.message}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <FormInput
              label="Client Name"
              placeholder="Enter client name"
              {...register("clientName")}
              error={errors.clientName?.message}
            />

            <FormInput
              label="Town"
              placeholder="Enter Town"
              {...register("deliveryDetails")}
              error={errors.deliveryDetails?.message}
            />
          </div>
          <div className="mt-2">
            <FormInput
              label="transport details"
              placeholder="Enter transport details"
              {...register("description")}
              error={errors.description?.message}
            />
          </div>

          <Button type="submit" className="w-full mt-4" disabled={!isValid}>
            Save Order
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderFormDialog;
