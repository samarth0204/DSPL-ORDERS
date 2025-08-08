import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Trash, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { orderSchema } from "@/constants/schema";
import FormInput from "./FormInput";
import { useProductStore } from "@/store/useProductStore";
import { useRef, useState } from "react";
import FormSelect from "./FormSelect";
import useAddOrder from "../../hooks/orderHooks/useAddOrder";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

type Size = {
  size: string;
  orderBy: string[];
};

type ProductOption = {
  name: string;
  sizes: Size[];
};

const AddNewOrder: React.FC<Props> = ({ open, setOpen }) => {
  const availableProducts = useProductStore((store) => store.availableProducts);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const productListRef = useRef<HTMLDivElement>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(orderSchema),
    defaultValues: {
      clientName: "",
      deliveryDetails: "",
      description: "",
      products: [],
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "products",
  });

  const addOrderMutation = useAddOrder();

  const onSubmit = (data: any) => {
    const newOrder = {
      ...data,
      orderDate: new Date(),
      salesmanId: "d25f6cd6-a798-437c-b9e7-61f4a9ce2fc3",
      status: "Not Started",
    };
    addOrderMutation.mutate(newOrder, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
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

  const handleAddProduct = (product: ProductOption) => {
    append({
      name: product.name,
      size: "",
      orderBy: "",
      quantity: 1,
      rate: "",
    });
    setPopoverOpen(false);
    setTimeout(() => {
      if (productListRef.current) {
        productListRef.current.scrollTop = productListRef.current.scrollHeight;
      }
    }, 0);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-full md:max-w-[700px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <FormInput
              label="Client Name"
              placeholder="Enter client name"
              {...register("clientName")}
              error={errors.clientName?.message}
            />

            <FormInput
              label="Delivery Option"
              placeholder="Enter delivery details"
              {...register("deliveryDetails")}
              error={errors.deliveryDetails?.message}
            />
          </div>
          <div className="mt-2">
            <FormInput
              label="Order description"
              placeholder="Enter order description"
              {...register("description")}
              error={errors.description?.message}
            />
          </div>

          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <Popover
                modal={true}
                open={popoverOpen}
                onOpenChange={setPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Add New Product
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="p-0 w-[300px] max-h-[300px] overflow-hidden"
                  side="bottom"
                  align="start"
                  sideOffset={4}
                >
                  <Command className="w-full h-full">
                    {/* Fixed Search */}
                    <div className="sticky top-0 z-10 bg-white px-2">
                      <CommandInput placeholder="Search product..." />
                    </div>

                    {/* Scrollable area must be a constrained CommandGroup wrapper */}
                    <div className="overflow-y-auto max-h-[240px] px-2">
                      <CommandEmpty className="py-2 text-sm text-muted-foreground">
                        No product found.
                      </CommandEmpty>

                      <CommandGroup>
                        {availableProducts.map((product) => (
                          <CommandItem
                            key={product.name}
                            onSelect={() => handleAddProduct(product)}
                          >
                            <span className="flex justify-between w-full">
                              {product.name}
                              <span className="text-xs text-gray-400">
                                {product.sizes.length} sizes
                              </span>
                            </span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </div>
                  </Command>
                </PopoverContent>
              </Popover>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => replace([])}
                disabled={fields.length === 0}
                className="text-red-500 hover:text-red-600"
              >
                <Trash className="w-4 h-4 mr-1" />
                Remove All
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
              className="max-h-[400px] md:max-h-[220px] overflow-y-auto px-1 rounded-xl space-y-2"
              ref={productListRef}
            >
              {fields.map((field, index) => {
                const product = availableProducts.find(
                  (p) => p.name === field.name
                );
                const sizeOptions = product?.sizes ?? [];

                const selectedSize = watch(`products.${index}.size`);
                const selectedSizeObj = sizeOptions.find(
                  (s) => s.size === selectedSize
                );

                return (
                  <div
                    key={field.id}
                    className="relative grid grid-cols-2 gap-2 border border-gray-300 bg-gray-50 p-4 rounded-xl shadow-sm my-4"
                  >
                    <div className="absolute -top-3 left-2 text-sm text-gray-500 bg-white px-1 rounded flex items-center gap-2">
                      {field.name}
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

                    <div>
                      <FormSelect
                        label="Size"
                        value={watch(`products.${index}.size`)}
                        onChange={(value) =>
                          setValue(`products.${index}.size`, value)
                        }
                        options={sizeOptions.map((s) => s.size)}
                        placeholder="Select size"
                        error={errors.products?.[index]?.size?.message}
                      />
                      {errors.products?.[index]?.size && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.products[index]?.size?.message}
                        </p>
                      )}
                    </div>

                    <FormInput
                      label="Quantity"
                      placeholder="Enter quantity"
                      {...register(`products.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                      error={errors.products?.[index]?.quantity?.message}
                    />

                    <div>
                      <div className="flex gap-2">
                        <FormSelect
                          label="Order By"
                          value={watch(`products.${index}.orderBy`)}
                          onChange={(value) =>
                            setValue(`products.${index}.orderBy`, value)
                          }
                          options={selectedSizeObj?.orderBy || []}
                          placeholder="Select"
                          error={errors.products?.[index]?.orderBy?.message}
                        />
                      </div>
                      {errors.products?.[index]?.orderBy && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.products[index]?.orderBy?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <FormInput
                        label="Custom rate"
                        placeholder="Enter custom rate"
                        {...register(`products.${index}.rate`)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Button type="submit" className="w-full mt-4">
            Save Order
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewOrder;
