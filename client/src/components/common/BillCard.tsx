import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Pencil, Trash } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import type { Order, Product } from "@/types/order";
import { useDeleteFulfillment } from "@/hooks/fulfillmentHooks";
import { useState } from "react";
import FulfillmentFormDialog from "./FulfillmentFormDialog";
import { Package, Hash } from "lucide-react";

interface FulfilledProduct {
  product: {
    name: string;
    size: string;
    orderBy: string;
    rate?: string;
  };
  quantity: string;
}

function FulfilledProductsList({
  fulfillment,
}: {
  fulfillment: { fulfilledProducts: FulfilledProduct[] };
}) {
  if (!fulfillment.fulfilledProducts?.length) return null;

  return (
    <div className="grid gap-3 bg-gray-100 p-2  rounded-l">
      <div className=" flex w-full font-semibold rounded-l shadow-sm p-2 bg-white">
        <Package className="h-4 w-4 text-blue-500 mr-2" />
        Product List
      </div>
      <div className="flex flex-wrap gap-2 text-sm text-gray-700">
        {fulfillment.fulfilledProducts?.map(
          (p: FulfilledProduct, i: number) => (
            <span
              key={i}
              className="px-2 py-1 w-full scroll-auto max-w-full rounded-l bg-white border border-gray-300"
            >
              {p.product.name} - {p.product.size} : {p.quantity}
              {p.product.orderBy}
              {p.product.rate && ` | Rate: ${p.product.rate}`}
            </span>
          )
        )}
      </div>
    </div>
  );
}

const BillCard = ({
  fulfillment,
  order,
}: {
  fulfillment?: any;
  order?: Order;
}) => {
  const deleteMutation = useDeleteFulfillment();
  const [openEditFulfillment, setOpenEditFulfillment] = useState(false);
  if (!fulfillment) return null;

  return (
    <>
      {order && (
        <FulfillmentFormDialog
          open={openEditFulfillment}
          setOpen={setOpenEditFulfillment}
          order={order}
          fulfillment={fulfillment}
        />
      )}
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex">
                <Hash className="h-3 w-3 text-gray-500 mr-1" />
                {fulfillment.billNumber}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <Calendar size={18} />
                {new Date(fulfillment.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </CardDescription>
            </div>
            <div className="text-sm font-semibold text-right text-green-600 flex flex-col gap-1 items-end">
              ₹{fulfillment.amount?.toLocaleString() || "0"}
              <Badge
                variant={
                  fulfillment.status === "PAID" ? "secondary" : "destructive"
                }
                className={cn(
                  fulfillment.status === "PAID" &&
                    "bg-green-700 text-white dark:bg-blue-600"
                )}
              >
                {fulfillment.status === "PAID" ? "Paid" : "Pending"}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="pb-2">Description: {fulfillment.description}</div>

          <FulfilledProductsList fulfillment={fulfillment} />
        </CardContent>

        <CardFooter className="flex justify-between">
          <p className="text-xs text-gray-400">
            Total items: {fulfillment.fulfilledProducts?.length || 0}
          </p>
          <div className="flex gap-2">
            {order && (
              <Button
                variant="outline"
                onClick={() => {
                  setOpenEditFulfillment(true);
                }}
              >
                <Pencil size={18} />
                Edit
              </Button>
            )}

            <Button
              variant="destructive"
              className="bg-white text-black hover:text-white"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this fulfillment?"
                  )
                ) {
                  deleteMutation.mutate(fulfillment.id);
                }
              }}
            >
              <Trash size={18} />
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default BillCard;
