"use client";

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
import { useEffect, useState } from "react";
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

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

type Variant = {
  name: string;
  weightPerUnit: number;
};

type Product = {
  name: string;
  mrp: string;
  quantity: string;
  weight: string;
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
  const [clientName, setClientName] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const productListRef = React.useRef<HTMLDivElement>(null);
  const [hoveredProduct, setHoveredProduct] = useState<ProductOption | null>(
    null
  );
  const [popoverOpen, setPopoverOpen] = useState(false);

  const hasEnteredData =
    clientName.trim() !== "" ||
    products.some(
      (p) =>
        p.name.trim() !== "" ||
        p.mrp.trim() !== "" ||
        p.quantity.trim() !== "" ||
        p.weight.trim() !== ""
    );

  const handleRemoveProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Product, value: string) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const handleSubmit = () => {
    if (products.length === 0) {
      setError("Please add at least one product.");
      return;
    }

    const hasEmpty = products.some(
      (p) =>
        !p.name.trim() ||
        !p.mrp.trim() ||
        !p.quantity.trim() ||
        !p.weight.trim()
    );
    if (hasEmpty) {
      setError("Please fill all product fields before saving.");
      return;
    }

    const order = {
      client: clientName,
      products,
    };
    console.log("Order submitted:", order);

    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setClientName("");
    setProducts([]);
    setError("");
  };

  const handleClose = (shouldOpen: boolean) => {
    if (!shouldOpen && hasEnteredData) {
      const confirmClose = window.confirm(
        "You have unsaved changes. Are you sure you want to discard them?"
      );
      if (!confirmClose) return;
      resetForm();
    }

    setOpen(shouldOpen);
  };

  const handleClearAllProducts = () => {
    setProducts([]);
    setError("");
  };

  const handleAddProductWithVariant = (
    product: ProductOption,
    variant: Variant
  ) => {
    setProducts((prev) => [
      ...prev,
      {
        name: `${product.name} - ${variant.name}`,
        mrp: "",
        quantity: "",
        weight: variant.weightPerUnit.toString(),
      },
    ]);
    setPopoverOpen(false);
    setTimeout(() => {
      if (productListRef.current) {
        productListRef.current.scrollTop = productListRef.current.scrollHeight;
      }
    }, 0);
  };

  useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-full lg:max-w-[600px] sm:h-auto max-h-[100vh]  overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
          <DialogDescription>
            Click on the plus icon and select the product to add to order
          </DialogDescription>
        </DialogHeader>

        {/* Client Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Client Name</label>
          <Input
            placeholder="Enter client name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Delivery Option</label>
          <Input
            placeholder="Enter Delivery Details"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>
        {/* Product Section */}
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
              onClick={handleClearAllProducts}
              disabled={products.length === 0}
              className="text-red-500 hover:text-red-600"
            >
              <Trash className="w-4 h-4 mr-1" />
              Remove All
            </Button>
          </div>

          {/* No product message */}
          {products.length === 0 && (
            <p className="text-sm text-muted-foreground italic">
              No product selected.
            </p>
          )}

          {/* Scrollable Product List */}
          <div
            className="max-h-[500px] md:max-h-[220px] overflow-y-auto px-1 rounded-xl space-y-2 md:bg-gray-100"
            ref={productListRef}
          >
            {products.map((product, index) => (
              <div
                key={index}
                className="relative grid grid-cols-1 md:grid-cols-3 gap-2 items-start border border-gray-300 bg-gray-100 md:bg-white p-4 rounded-xl shadow-sm my-4"
              >
                <div className="absolute -top-3 left-2 text-sm text-gray-500 bg-white px-1 rounded ">
                  {product.name}
                </div>
                <Input
                  placeholder="MRP"
                  className="w-full"
                  value={product.mrp}
                  onChange={(e) => handleChange(index, "mrp", e.target.value)}
                />
                <Input
                  placeholder="Qty (e.g. 5pkt)"
                  className="w-full"
                  value={product.quantity}
                  onChange={(e) =>
                    handleChange(index, "quantity", e.target.value)
                  }
                />
                <div className="flex w-full items-center gap-2">
                  <Input
                    placeholder="Weight"
                    className="flex-1"
                    value={product.weight}
                    onChange={(e) =>
                      handleChange(index, "weight", e.target.value)
                    }
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveProduct(index)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
        </div>

        {/* Submit */}
        <Button className="w-full mt-4" onClick={handleSubmit}>
          Save Order
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewOrder;
