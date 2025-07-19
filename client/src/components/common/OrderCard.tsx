import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { Order } from "@/types/order";
// import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Button } from "../ui/button";
import {
  BadgeCheck,
  Clock,
  // Pencil,
  // Trash,
  Truck,
} from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { getFulfilledQuantities, getFulfillmentProgress } from "@/lib/utils";
import { useState } from "react";

const FulfillmentProgress = ({ order }: { order: Order }) => {
  const progress = getFulfillmentProgress(order);

  return (
    <div className="mt-2">
      <p className="text-sm text-muted-foreground mb-1">
        Fulfillment: {progress}%
      </p>
      <Progress value={progress} className="h-2 bg-gray-200" />
    </div>
  );
};

const OrderTable = ({ order }: { order: Order }) => {
  const fulfilledMap = getFulfilledQuantities(order);
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});

  const handleRowClick = (productKey: string) => {
    setShowDetails((prev) => ({
      ...prev,
      [productKey]: !prev[productKey],
    }));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Order By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order.products.map((product, index) => {
          const productKey = `${product.name}-${product.size}`;
          const orderedQuantity = parseInt(product.quantity, 10);
          const fulfilledQuantity = fulfilledMap.get(productKey) || 0;
          const isFullyFulfilled = orderedQuantity === fulfilledQuantity;
          const remainingQuantity = orderedQuantity - fulfilledQuantity;

          return (
            <TableRow
              key={index}
              className={`${
                isFullyFulfilled ? "bg-green-100 dark:bg-green-900" : ""
              } cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800`}
              onClick={() => handleRowClick(productKey)}
            >
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.size}</TableCell>
              <TableCell>
                {showDetails[productKey] ? (
                  <>
                    <span className="font-semibold">
                      Sent: {fulfilledQuantity}
                    </span>
                    {remainingQuantity > 0 && (
                      <span className="text-sm text-red-600 dark:text-red-400 ml-2">
                        / {remainingQuantity}
                      </span>
                    )}
                  </>
                ) : (
                  product.quantity
                )}
              </TableCell>
              <TableCell className="text-right">{product.order_by}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const OrderAccordion = ({ order }: { order: Order }) => {
  return (
    <Accordion
      type="single"
      defaultValue="item-1"
      collapsible
      className="w-full"
    >
      <AccordionItem value="item-1">
        <div className="flex justify-between">
          <AccordionTrigger>Products</AccordionTrigger>
        </div>

        <AccordionContent className="flex flex-col gap-4 text-balance">
          <OrderTable order={order} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
const GetBadge = ({ order }: { order: Order }) => {
  if (order.status === "Completed") {
    return (
      <Badge
        variant="secondary"
        className="bg-green-700 text-white dark:bg-blue-600"
      >
        <BadgeCheck />
        Completed
      </Badge>
    );
  }
  if (order.status === "In Progress") {
    return (
      <Badge
        variant="secondary"
        className="bg-green-700 text-white dark:bg-blue-600"
      >
        <Clock />
        In Progress
      </Badge>
    );
  }
  return <Badge variant="destructive">Not Started</Badge>;
};
const FulfillmentAccordion = ({ order }: { order: Order }) => {
  if (!order.fulfillments?.length) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="fulfillment-1">
        <AccordionTrigger>Fulfillment History</AccordionTrigger>
        <AccordionContent className="text-sm">
          <ul className="space-y-2">
            {order.fulfillments.map((f, index) => (
              <li key={index} className="border p-2 rounded-md">
                <div className="font-medium">Bill ID: {f.id}</div>
                <div>Date: {f.date}</div>
                <ul className="ml-4 list-disc">
                  {f.fulfilledProducts.map((p, i) => (
                    <li key={i}>
                      {p.name} - {p.size} : {p.quantity}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <Card className="my-2 gap-2 py-4">
      <CardHeader>
        <CardTitle>{order.clientName}</CardTitle>
        <CardDescription className="flex gap-2">
          <Truck />
          {order.deliveryDetails}
        </CardDescription>
        <FulfillmentProgress order={order} />
        <CardAction>
          <GetBadge order={order} />
        </CardAction>
      </CardHeader>

      <CardContent className="flex gap-2 flex-col">
        <OrderAccordion order={order} />
      </CardContent>

      <CardFooter className="flex flex-col">
        <FulfillmentAccordion order={order} />
        {/* <Button variant="outline" className="gap-2">
          <Pencil />
          Edit
        </Button>
        <Button variant="destructive" className="gap-2">
          <Trash />
          Delete
        </Button> */}
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
