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
  Pencil,
  Plus,
  Trash,
  // Pencil,
  // Trash,
  Truck,
} from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { getFulfilledQuantities, getFulfillmentProgress } from "@/lib/utils";
import BillCard from "./BillCard";
import { Button } from "../ui/button";

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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Size</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
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
            >
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.size}</TableCell>
              <TableCell className="text-center">
                <span className="text-green-900 font-semibold">
                  {product.quantity}
                </span>{" "}
                <span>
                  {remainingQuantity > 0 && (
                    <span className="text-sm font-semibold text-red-600 dark:text-red-400 ml-2">
                      / {remainingQuantity}
                    </span>
                  )}
                </span>
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
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <div>
          <AccordionTrigger className=" bg-gray-100 p-3 ">
            Products
          </AccordionTrigger>
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
        className="bg-yellow-500 text-white dark:bg-blue-600"
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
        <AccordionTrigger className=" bg-gray-100 p-3 ">
          Fulfillment History
        </AccordionTrigger>
        <AccordionContent className="text-sm mt-2">
          <ul className="space-y-2">
            {order.fulfillments.map((f, index) => (
              <BillCard key={index} f={f} />
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <Card className="gap-3 py-4 rounded-sm lg:grid lg:grid-cols-10 lg:px-4">
      <div className="lg:col-span-3">
        <CardHeader className="lg:px-0">
          <CardTitle>{order.clientName}</CardTitle>
          <CardDescription className="flex lg:flex-col gap-2">
            <div className="flex gap-2">
              <Truck />
              {order.deliveryDetails}
            </div>

            <div className="hidden lg:block">
              <FulfillmentProgress order={order} />
            </div>
          </CardDescription>
          <CardAction className="flex flex-col gap-1 lg:gap-2 items-end">
            <GetBadge order={order} />
          </CardAction>
        </CardHeader>
      </div>

      <CardContent className="flex gap-3 flex-col lg:px-0 lg:col-span-3">
        <div className="lg:hidden">
          <FulfillmentProgress order={order} />
        </div>
        <OrderAccordion order={order} />
      </CardContent>

      <CardFooter className="flex flex-col lg:pl-0 lg:pr-0 gap-4 lg:col-span-3">
        <FulfillmentAccordion order={order} />
        <div className="flex w-full justify-between lg:hidden">
          <Button variant="outline" className="gap-2">
            <Plus />
            Attach Bill
          </Button>
          <Button variant="outline" className="gap-2">
            <Pencil />
            Edit
          </Button>
          <Button variant="destructive" className="gap-2">
            <Trash />
            Delete
          </Button>
        </div>
      </CardFooter>
      <div className="hidden lg:block lg:col-span-1">
        <div className="flex flex-col w-full gap-2">
          <Button variant="outline">
            <Plus />
            Attach Bill
          </Button>
          <Button variant="outline">
            <Pencil />
            Edit
          </Button>
          <Button variant="destructive">
            <Trash />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;
