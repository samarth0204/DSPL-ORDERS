import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Trash, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
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
import { orderSchema } from "@/constants/orderSchema";
import FormInput from "./FormInput";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

type Variant = {
  name: string;
  weightPerUnit: number;
};

type ProductOption = {
  name: string;
  variants: Variant[];
};

const availableProducts: ProductOption[] = [
  {
    name: "Almonds",
    variants: [
      { name: "Gold", weightPerUnit: 1 },
      { name: "Royal", weightPerUnit: 0.5 },
    ],
  },
  {
    name: "Cashews",
    variants: [
      { name: "Gold", weightPerUnit: 0.75 },
      { name: "Royal", weightPerUnit: 0.4 },
    ],
  },
];

const AddNewOrder: React.FC<Props> = ({ open, setOpen }) => {
  const [hoveredProduct, setHoveredProduct] = useState<ProductOption | null>(
    null
  );
  const [popoverOpen, setPopoverOpen] = useState(false);
  const productListRef = useRef<HTMLDivElement>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderSchema),
    defaultValues: {
      clientName: "",
      deliveryDetails: "",
      products: [],
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = (data: any) => {
    console.log("Order submitted:", data);
    reset();
    setOpen(false);
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

  const handleAddProductWithVariant = (
    product: ProductOption,
    variant: Variant
  ) => {
    append({
      name: `${product.name} - ${variant.name}`,
      mrp: "",
      quantity: "",
      weight: variant.weightPerUnit.toString(),
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
      <DialogContent className="max-w-full lg:max-w-[600px] sm:h-auto max-h-[100vh]  overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
          <DialogDescription>
            Click on the plus icon and select the product to add to order
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Client Name"
            placeholder="Enter client name"
            {...register("clientName")}
            error={errors.clientName?.message}
          />

          <FormInput
            label="Delivery Option"
            placeholder="Enter Delivery Details"
            {...register("deliveryDetails")}
            error={errors.deliveryDetails?.message}
          />

          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Add New Product
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="p-0 w-[300px] overflow-visible"
                  side="bottom"
                  align="start"
                  sideOffset={4}
                >
                  <Command className="max-h-[300px] overflow-visible">
                    <CommandInput placeholder="Search product..." />
                    <CommandEmpty>No product found.</CommandEmpty>
                    <CommandGroup className="overflow-visible">
                      {availableProducts.map((product) => (
                        <div
                          key={product.name}
                          className="relative"
                          onMouseEnter={() => setHoveredProduct(product)}
                          onMouseLeave={() => setHoveredProduct(null)}
                        >
                          <CommandItem className="cursor-pointer">
                            <span className="flex items-center justify-between w-full">
                              {product.name}
                              <span className="text-xs text-gray-400">
                                {product.variants.length} variants
                              </span>
                            </span>
                          </CommandItem>
                          {hoveredProduct?.name === product.name && (
                            <div className="absolute top-0 left-full w-48 bg-white border rounded-md shadow-lg p-1 z-[100]">
                              {product.variants.map((variant) => (
                                <Button
                                  key={variant.name}
                                  variant="ghost"
                                  className="w-full justify-start text-left text-sm h-8 px-2"
                                  onClick={() =>
                                    handleAddProductWithVariant(
                                      product,
                                      variant
                                    )
                                  }
                                >
                                  {variant.name} ({variant.weightPerUnit}kg)
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </CommandGroup>
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
              className="max-h-[500px] md:max-h-[220px] overflow-y-auto px-1 rounded-xl space-y-2 md:bg-gray-100"
              ref={productListRef}
            >
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative grid grid-cols-1 md:grid-cols-3 gap-2 items-start border border-gray-300 bg-gray-100 md:bg-white p-4 rounded-xl shadow-sm my-4"
                >
                  <div className="absolute -top-3 left-2 text-sm text-gray-500 bg-white px-1 rounded ">
                    {field.name}
                  </div>
                  <FormInput
                    label="MRP"
                    placeholder="MRP"
                    {...register(`products.${index}.mrp`)}
                    error={errors.products?.[index]?.mrp?.message}
                  />
                  <FormInput
                    label="Quantity"
                    placeholder="Qty (e.g. 5pkt)"
                    {...register(`products.${index}.quantity`)}
                    error={errors.products?.[index]?.quantity?.message}
                  />
                  <div className="flex w-full items-center gap-2">
                    <FormInput
                      label="Weight"
                      placeholder="Weight"
                      {...register(`products.${index}.weight`)}
                      error={errors.products?.[index]?.weight?.message}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
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
